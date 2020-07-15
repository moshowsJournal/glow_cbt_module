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
import Box from '../components/box';
import AsyncStorage from '@react-native-community/async-storage';
import Pdf from 'react-native-pdf';
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class ReadPDF extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      res: '',
      name: '',
      user: [],
      name: '',
      link: '',
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
    console.warn(this.state.type);
    console.warn(this.state.res);
    this.setState({name: this.state.user.data.data.user.fullname});
    this.setState({src: this.state.res.linksToLearningResources});
    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
    console.warn('pdflink', this.state.link);
  }
  render() {
    const source = {
      uri: `${this.state.link}`,
      cache: true,
    };
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.name} />
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.warn(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.warn(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.warn(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
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
