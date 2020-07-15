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
  ProgressBarAndroid,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import TopBarI from '../components/topBarI';
import Box3 from '../components/box3';
import AsyncStorage from '@react-native-community/async-storage';
import Pdf from 'react-native-pdf';
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class ImageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      res: '',
      name: '',
      user: [],
      name: '',
      src: [],
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({res: navigation.getParam('res', '')});
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
    console.warn(this.state.type);
    console.warn(this.state.res);
    this.setState({name: this.state.user.data.data.user.fullname});
    this.setState({src: this.state.res.materials});
    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
    console.warn('pdflink', this.state.src);
  }
  render() {
    const source = {
      cache: true,
    };
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.name} />
        <ScrollView style={{marginLeft: RW(5)}}>
          {this.state.src.map((item, key) => {
            if (item.mimetype == 'image/jpeg') {
              return (
                <TouchableOpacity
                  Key={key}
                  onPress={() =>
                    this.props.navigation.navigate('ReadImages', {
                      link: item.link,
                    })
                  }>
                  <Box3 name={item.name} />
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
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
  pdf: {
    flex: 1,
  },
});
