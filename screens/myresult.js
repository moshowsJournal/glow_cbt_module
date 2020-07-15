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

import ProgressCircle from 'react-native-progress-circle';
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class MyResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      res: '',
      name: '',
      user: [],
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
  }

  render() {
    const source = {
      uri: `${this.state.link}`,
      cache: true,
    };
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.name} />
        <Text style={styles.text}>
          Result to show your performance this term
        </Text>
        <ScrollView horizontal={true}>
          <View style={styles.res}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: RF(14),
                marginTop: RH(2),
              }}>
              Economics
            </Text>
            <View style={{alignSelf: 'center', marginTop: RH(5)}}>
              <ProgressCircle
                percent={30}
                radius={50}
                borderWidth={14}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff">
                <Text style={{fontSize: 18}}>{'30%'}</Text>
              </ProgressCircle>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: RW(5),
                marginTop: RH(3),
                justifyContent: 'space-between',
                marginRight: RW(5),
              }}>
              <View>
                <ProgressCircle
                  percent={40}
                  radius={30}
                  borderWidth={5}
                  color="red"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>{'40%'}</Text>
                </ProgressCircle>
                <Text style={{marginTop: RH(2)}}> C.A Test</Text>
              </View>
              <View>
                <ProgressCircle
                  percent={10}
                  radius={30}
                  borderWidth={5}
                  color="yellow"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>{'10%'}</Text>
                </ProgressCircle>
                <Text style={{marginTop: RH(2), marginLeft: RH(2)}}>Exam</Text>
              </View>
            </View>
          </View>

          <View style={styles.res}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: RF(14),
                marginTop: RH(2),
              }}>
              Mathematics
            </Text>
            <View style={{alignSelf: 'center', marginTop: RH(5)}}>
              <ProgressCircle
                percent={30}
                radius={50}
                borderWidth={14}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff">
                <Text style={{fontSize: 18}}>{'30%'}</Text>
              </ProgressCircle>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: RW(5),
                marginTop: RH(3),
                justifyContent: 'space-between',
                marginRight: RW(5),
              }}>
              <View>
                <ProgressCircle
                  percent={40}
                  radius={30}
                  borderWidth={5}
                  color="red"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>{'40%'}</Text>
                </ProgressCircle>
                <Text style={{marginTop: RH(2)}}> C.A Test</Text>
              </View>
              <View>
                <ProgressCircle
                  percent={10}
                  radius={30}
                  borderWidth={5}
                  color="yellow"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>{'10%'}</Text>
                </ProgressCircle>
                <Text style={{marginTop: RH(2), marginLeft: RH(2)}}>Exam</Text>
              </View>
            </View>
          </View>
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
  res: {
    height: RH(48),
    width: RW(68),
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    marginLeft: RW(5),
  },
  text: {
    fontSize: RF(12),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: RH(2),
    marginTop: RH(4),
  },
  res2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: RW(5),
    justifyContent: 'space-around',

    marginBottom: RH(3),
  },
});
