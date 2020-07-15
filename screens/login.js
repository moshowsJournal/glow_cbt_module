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
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      isLoading: false,
      password: '',
      error: '',
      username: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
  }
  storeData = async (res) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(res));
      console.warn('>>>>rrrrr', res);
    } catch (e) {
      // saving error
    }
  };
  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();

    console.warn('hhh', this.state.type);
  }
  submit = () => {
    const {username, password, isLoading} = this.state;

    if (username == '' || password == '') {
      alert('all feilds are required');
    } else {
      this.setState({isLoading: true});
      axios
        .post(`${endPoint}/api/v1/${this.state.type}/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          this.setState({isLoading: false});
          console.warn('app', res);
          if (res.data.status == 'success') {
            this.storeData(res);
            this.props.navigation.navigate('Home');
          }
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.warn(error);
          if (error.response.data.message == 'Incorrect username or password') {
            this.setState({error: error.response.data.message});
          } else {
            this.setState({isLoading: false});
            Snackbar.show({
              title: 'Error Loading Data. Please Check internet Connectivity.',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.type} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: RH(-7),
          }}>
          <Image
            source={require('../img/fingerprint.png')}
            style={{
              width: RW(25),
              height: RH(25),
            }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            color: 'red',
            marginTop: RH(2),
            marginBottom: RH(2),
            alignSelf: 'center',
          }}>
          {this.state.error}
        </Text>
        <View style={styles.case}>
          <TextInput
            style={styles.textinput}
            // ref={(input) => {
            //   this.Password = input;
            // }}
            onChangeText={(username) => this.setState({username})}
            placeholder=" Username"
          />
          <Image
            source={require('../img/class.png')}
            style={{
              width: RW(6),
              height: RH(6),
              marginTop: RH(5),
              marginLeft: RW(-88),
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.casel}>
          <TextInput
            style={styles.textinput}
            ref={(input) => {
              this.Password = input;
            }}
            onChangeText={(password) => this.setState({password})}
            placeholder=" Password"
            secureTextEntry={true}
          />
          <Image
            source={require('../img/lock.png')}
            style={{
              width: RW(5),
              height: RH(5),
              marginTop: RH(5),
              marginLeft: RW(-88),
            }}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          style={{marginBottom: RH(5)}}
          onPress={() => this.submit()}>
          <Button name={'Login'} />
        </TouchableOpacity>
        <View style={{marginTop: RH(-4)}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPword')}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: RH(7),
                color: '#EC6401',
              }}>
              Forgot Password?
            </Text>
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
    paddingLeft: 38,
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
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
