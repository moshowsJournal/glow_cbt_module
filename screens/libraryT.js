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
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class LibraryT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      user: [],
      name: '',
      subjects: [],
    };
  }
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
    this.setState({
      subjects: this.state.user.data.data.user.classesAndSubjects,
    });
    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
    console.warn('name', this.state.name);
    console.warn('subject', this.state.user.data.data.user.classesAndSubjects);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '90%'}}>
          <TopBarI name={this.state.name} />

          <ScrollView>
            <View
              style={{
                flexWrap: 'wrap',
                width: RW(100),

                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {this.state.subjects.map((item, key) => (
                <TouchableOpacity
                  Key={key}
                  onPress={() =>
                    this.props.navigation.navigate('AllLectures', {
                      subject: item,
                      sub: item.subject,
                    })
                  }>
                  <Box name={item.subject} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.box3}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('HomeT', {user: this.state.user})
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/home.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Home </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ChatT', {
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
              this.props.navigation.navigate('LibraryT', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/lo.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Upload Materials</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileT', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/user.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}>Staff Profile </Text>
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
});
