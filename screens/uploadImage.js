import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import TopBarI from '../components/topBarI';
import Box from '../components/box';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';

export default class UploadImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      name: '',
      content: 'Click here to Upload your Materials for Students',
      subject: {},
      file: {},
      api_token: '',
      isLoading: false,
      res: {},
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({res: navigation.getParam('res', '')});
    this.setState({sub: navigation.getParam('sub', '')});
    this.setState({subject: navigation.getParam('subject', '')});
  }
  async pick() {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.warn(
          res.uri,
          //res.type, // mime type
          //res.name,
          //res.size,
        );
        this.setState({file: res});
        this.setState({content: 'File Ready for Upload'});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  // check() {
  //   if (res != '') {
  //     return <Text style={{marginTop: RH(-5)}}>PDF Selected</Text>;
  //   }
  // }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      console.warn('moving');
      if (value !== null) {
        console.warn('user', JSON.parse(value));
        this.setState({user: JSON.parse(value)});
      }
    } catch (e) {
      // error reading value
    }
  };
  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();
    await this.getData();
    console.warn('skull', this.state.user.data.data.user._id);
    this.setState({name: this.state.user.data.data.user.fullname});
    this.setState({api_token: this.state.user.data.token});
    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
    console.warn('subject', this.state.subject);
    console.warn('sub', this.state.sub);
  }

  submit = () => {
    console.warn('file', this.state.file);
    const {file} = this.state;
    console.warn('token', this.state.api_token);
    console.warn('skull Id', this.state.user.data.data.user._id);
    console.warn('class Id', this.state.subject.classId);
    console.warn('subId', this.state.subject._id);
    if (this.state.file == '') {
      alert('all feilds are required for student');
    } else {
      this.setState({isLoading: true});
      const formData = new FormData();
      formData.append('materials', {
        uri: file.fileCopyUri,
        name: file.name,
        type: file.type,
      });
      console.warn('form', formData);
      axios
        .patch(
          `${endPoint}/api/v1/schools/${this.state.user.data.data.user.school}/classes/${this.state.subject.classId}/lectures/${this.state.subject._id}`,
          formData,

          {
            headers: {
              Authorization: `Bearer ${this.state.api_token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          this.setState({isLoading: false});
          console.warn('app', res);
        })
        .catch((error) => {
          console.warn(error);

          this.setState({isLoading: false});
          Snackbar.show({
            title: 'Error Loading Data. Please Check internet Connectivity.',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TopBarI name2={this.state.name} name={this.state.subject.subject} />
        <View style={{marginTop: RH(7)}}>
          <TouchableOpacity
            style={{
              marginLeft: RW(5),
              backgroundColor: '#FFFFFF',
              width: RW(90),
              padding: 8,
              borderRadius: 10,
              marginTop: RH(2),
              height: RH(25),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.pick()}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../img/download.png')}
                style={{
                  width: RW(20),
                  height: RH(20),
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{marginTop: RH(-5)}}>{this.state.content}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.submit()}>
            <Button name={'Upload'} />
          </TouchableOpacity>
        </View>
        {this.state.isLoading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#D5D5D5',
  },
  textinput: {
    width: RW(90),
    height: RH(6),
    borderRadius: 50,
    borderColor: '#00921B',
    paddingLeft: 28,
    marginTop: RH(5),
    backgroundColor: '#F8F8F8',
  },
  case: {
    flexDirection: 'row',
    marginBottom: RH(-1),
    width: RW(90),
    marginLeft: RW(5),
  },
  casel: {
    flexDirection: 'row',
    marginBottom: RH(1),
    width: RW(90),
    marginLeft: RW(5),
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
