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
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      name: '',
      user: [],
      api_token: '',
      photoUrl: '',
      isloading: false,
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
  getall = () => {
    this.setState({isLoading: true});

    axios
      .get(`${endPoint}/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${this.state.api_token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        this.setState({isLoading: false});
        console.warn('res', res.data.data.photoUrl);
        this.setState({photoUrl: res.data.data.photoUrl});
      })
      .catch((error) => {
        console.warn(error);
        this.setState({isLoading: false});
        Snackbar.show({
          title: 'Error Loading Data. Please Check internet Connectivity.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };
  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();
    await this.getData();
    console.warn(this.state.type);
    this.setState({name: this.state.user.data.data.user.fullname});
    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
    console.warn('name', this.state.name);
    console.warn(this.state.type);
    this.setState({api_token: this.state.user.data.token});
    //console.warn('user....', this.state.user.data.token);
    console.warn('Token', this.state.api_token);
    await this.getall();
    this.focusListener = navigation.addListener('didFocus', () =>
      this.getall(),
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '90%'}}>
          <TopBarI name={this.state.name} />
          <ScrollView>
            <View
              style={{
                width: RW(35),
                height: RH(20),
                marginLeft: RW(5),
                borderRadius: 10,
                backgroundColor: 'white',
                marginTop: RH(3),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                
                source={{
                  uri: `${this.state.photoUrl}`,
                }}
                style={{width: '96%', height: '99%', borderRadius: 10}}
              />
            </View>
            <Text
              style={{
                fontSize: RF(12),
                fontWeight: 'bold',
                marginLeft: RW(5),
                marginTop: RH(4),
                // marginBottom: RH(),
              }}>
              <Text>{this.state.name}</Text>
            </Text>

            <View
              style={{
                borderBottomWidth: 4,
                marginTop: RH(3),
                borderBottomColor: '#F2F2F2',
              }}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <View style={styles.line2}>
                <View style={{width: '80%', justifyContent: 'center'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    {' '}
                    Edit{' '}
                  </Text>
                </View>
                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('UpdatePassword', {
                  user: this.state.user,
                })
              }>
              <View style={styles.line2}>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    {' '}
                    Update Password{' '}
                  </Text>
                </View>

                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyResult')}>
              <View style={styles.line2}>
                <View style={{width: '80%', justifyContent: 'center'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    My Result
                  </Text>
                </View>
                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('LiveJoin', {
                  user: this.state.user,
                })
              }>
              <View style={styles.line2}>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    Join live lecture
                  </Text>
                </View>

                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Site', {
                  user: this.state.user,
                })
              }>
              <View style={styles.line2}>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    Visit Our Site
                  </Text>
                </View>
                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <View style={styles.line2}>
              <View style={{width: '80%'}}>
                <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                  {' '}
                  Terms & Conditions{' '}
                </Text>
              </View>
              <Image
                source={require('../img/f.png')}
                style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                resizeMode="contain"
              />
            </View>

            <View style={styles.line2}>
              <TouchableOpacity
                style={{width: '80%'}}
                onPress={() => this.props.navigation.navigate('FirstPage')}>
                <View style={{width: '80%'}}>
                  <Text
                    style={{
                      fontSize: RF(10),
                      marginLeft: RW(5),
                      color: '#FF1200',
                    }}>
                    {' '}
                    Sign Out{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={styles.box3}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Home', {user: this.state.user})
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
                source={require('../img/l.png')}
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
                source={require('../img/usero.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Profile </Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.isLoading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#EC6401" />
          </View>
        ) : null}
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
  line: {
    borderBottomWidth: 1,

    width: '100%',
    marginLeft: '5%',
  },
  line2: {
    borderBottomWidth: 4,
    height: RH(8),
    width: RW(100),

    borderBottomColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
