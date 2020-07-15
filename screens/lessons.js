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
import AsyncStorage from '@react-native-community/async-storage';

export default class Lessons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      sub: '',
      name: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
    this.setState({sub: navigation.getParam('sub', '')});
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
    this.setState({name: this.state.user.data.data.user.fullname});

    console.warn('userrrrrrrvbfhfrrr', this.state.user.data.data.user.fullname);
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.name} name2={this.state.sub} />
        <View style={{marginTop: RH(-2)}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('RemoteSound', {
                topic: 'Module 1',
                text: 'Surds audio',
                link: 'hhdd',
              })
            }>
            <LongBox topic={'Module 1'} text={'Surds Audio'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Live', {
                topic: 'Module 2',
                text: 'Algebra',
              })
            }>
            <LongBox topic={'Module 2'} text={'Algebra'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Learning', {
                topic: 'Module 3',
                text: 'Trigonometry',
              })
            }>
            <LongBox topic={'Module 3'} text={'Trigonometry'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Learning', {
                topic: 'Module 4',
                text: 'Ratio',
              })
            }>
            <LongBox topic={'Module 4'} text={'Ratio'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Learning', {
                topic: 'Module 5',
                text: 'Surds application',
              })
            }>
            <LongBox topic={'Module 5'} text={'Surds application'} />
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
