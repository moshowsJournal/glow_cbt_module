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
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class UploadVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      name: '',
      content: 'Click here to Upload your Materials for Students',
      subject: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
    this.setState({subject: navigation.getParam('subject', '')});
  }
  async pick() {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.video],
      });
      for (const res of results) {
        console.warn(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
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
    console.warn(this.state.type);
    this.setState({name: this.state.user.data.data.user.fullname});

    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBarI name2={this.state.name} name={this.state.subject} />
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
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Button name={'Upload'} />
          </TouchableOpacity>
        </View>
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
});
