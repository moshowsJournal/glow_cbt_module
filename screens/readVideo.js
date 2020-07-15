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
//import VideoPlayer from 'react-native-video-player';
import VideoPlayer from 'react-native-video-controls';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class ReadVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      link: '',
      name: '',
      user: [],

      video: {width: RW(100), height: RH(100)},
      //thumbnailUrl: undefined,
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({link: navigation.getParam('link', '')});
  }

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

    this.setState({name: this.state.user.data.data.user.fullname});

    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
    console.warn('res', this.state.link);
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{
            uri: `${this.state.link}`,
          }}
          startInLoadingState
          scalesPageToFit={true}
          javaScriptEnabled={true}
          allowUniversalAccessFromFileURLs={true}
          allowsFullscreenVideo={true}
          mixedContentMode={'always'}
          mediaPlaybackRequiresUserAction={true}
          style={{maxHeight: RH(90), maxWidth: RW(100)}}
        />
        <View style={{marginTop: RH(3), marginBottom: RH(3)}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Button name="Back" />
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundVideo: {
    flex: 1,
  },
});
