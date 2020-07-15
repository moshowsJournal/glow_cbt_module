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
  Modal,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import TopBarI from '../components/topBarI';
import Box from '../components/box';
import AsyncStorage from '@react-native-community/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';
// import axios from 'axios'; import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class ReadImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      res: [],
      name: '',
      user: [],
      name: '',
      tot: true,
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({
      link: navigation.getParam('link', ''),
    });
  }
  leave() {
    this.setState({tot: false});
    this.props.navigation.navigate('ImageList');
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      console.warn('moving');
      if (value !== null) {
        console.warn('user', JSON.parse(value));
        this.setState({
          user: JSON.parse(value),
        });
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
    console.warn('link', this.state.link);
    // await this.check();
  }

  check() {}
  render() {
    const images = [
      {
        url: this.state.link,
      },
    ];
    return (
      <View style={styles.container}>
        <Modal visible={this.state.tot} transparent={true}>
          <ImageViewer imageUrls={images} />
          <TouchableOpacity
            style={{backgroundColor: 'white', height: RH(13)}}
            onPress={() => this.leave()}>
            <Button name="Cancel" />
          </TouchableOpacity>
        </Modal>
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
