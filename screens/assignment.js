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
import LongBox from '../components/longbox';
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';
import DocumentPicker from 'react-native-document-picker';

export default class Assignment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      text: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({topic: navigation.getParam('topic', '')});
    this.setState({text: navigation.getParam('text', '')});
  }

  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();

    console.warn(this.state.type);
  }

  pick = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.warn(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={'Upload Assignment'} />
        <View style={{marginTop: RH(7)}}>
          <View
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
            }}>
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
            <Text style={{marginTop: RH(-5)}}>
              Click here to Upload your Assignments
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.pick()}>
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
