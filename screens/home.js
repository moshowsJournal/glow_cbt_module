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
  Alert,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import TopBarI from '../components/topBarI';
import Box from '../components/box';
import AsyncStorage from '@react-native-community/async-storage';

// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';
import TimeTableView, {genTimeBlock} from 'react-native-timetable';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.numOfDays = 5;
    this.pivotDate = genTimeBlock('mon');
    this.state = {
      type: '',
      user: [],
      name: '',
      subjects: [],
      events_data: [
        {
          title: 'Math',
          startTime: genTimeBlock('MON', 1),
          endTime: genTimeBlock('MON', 1, 50),
          location: '9am-10am',
          extra_descriptions: ['Kim'],
        },
        {
          title: 'Math',
          startTime: genTimeBlock('WED', 5),
          endTime: genTimeBlock('WED', 6, 50),
          location: '12am-1pm',
          extra_descriptions: ['Kim'],
        },
        {
          title: 'Physics',
          startTime: genTimeBlock('MON', 3),
          endTime: genTimeBlock('MON', 4, 50),
          location: '12am-1pm',
          extra_descriptions: ['Einstein'],
        },
        {
          title: 'Physics',
          startTime: genTimeBlock('WED', 9),
          endTime: genTimeBlock('WED', 11, 50),
          location: '12am-1pm',
          extra_descriptions: ['Einstein'],
        },
        {
          title: 'Mandarin',
          startTime: genTimeBlock('TUE', 2),
          endTime: genTimeBlock('TUE', 3, 50),
          location: '12am-1pm',
          extra_descriptions: ['Chen'],
        },
        {
          title: 'Japanese',
          startTime: genTimeBlock('FRI', 9),
          endTime: genTimeBlock('FRI', 10, 50),
          location: '12am-1pm',
          extra_descriptions: ['Nakamura'],
        },
        {
          title: 'Club Activity',
          startTime: genTimeBlock('THU', 9),
          endTime: genTimeBlock('THU', 10, 50),
          location: '12am-1pm',
          extra_descriptions: ['Nakamura'],
        },
        {
          title: 'Club Activity',
          startTime: genTimeBlock('FRI', 13, 30),
          endTime: genTimeBlock('FRI', 14, 50),
          location: '12am-1pm',
          extra_descriptions: ['Nakamura'],
        },
      ],
    };
  }
  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  onEventPress = (evt) => {
    Alert.alert('onEventPress', JSON.stringify(evt));
  };
  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
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
    this.setState({subjects: this.state.user.data.data.user.subjects});
    this.setState({api_token: this.state.user.data.token});
    console.warn('user....', this.state.user.data.token);
    console.warn('Token', this.state.api_token);
    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
    console.warn('name', this.state.name);
    console.warn('subject', this.state.user.data.data.user.subjects);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '90%'}}>
          <TopBarI name={this.state.name} />
          <Text style={styles.h1}>Lecture Time Table</Text>
          <View style={{flex: 1}}>
            <TimeTableView
              scrollViewRef={this.scrollViewRef}
              events={this.state.events_data}
              pivotTime={1}
              //pivotTime={20}
              pivotEndTime={12}
              pivotDate={this.pivotDate}
              numberOfDays={5}
              onEventPress={this.onEventPress}
              headerStyle={styles.headerStyle}
              formatDateHeader="dddd"
              locale="en"
            />
          </View>
        </View>
        <View style={styles.box3}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Home', {user: this.state.user})
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/homeo.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Home </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/c.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Chat </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Library', {user: this.state.user})
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/bb.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Library </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Profile', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/user.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Profile </Text>
            </View>
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
  box3: {
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 2,
  },
  headerStyle: {
    backgroundColor: '#81E1B8',
  },
  h1: {
    fontSize: RF(15),
    alignSelf: 'center',
    marginTop: RH(1),
    fontWeight: 'bold',
  },
});
