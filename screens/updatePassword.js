import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import TopBarI from '../components/topBarI';

import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width} = Dimensions.get('window');
export default class Updatepassword extends React.Component {
  constructor() {
    super();

    this.state = {
      hidePassword: true,
      hidePasswordt: true,
      hidePasswordtt: true,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      isLoading: false,
      errors: '',
      api_token: '',
      user: [],
    };
  }

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };
  setPasswordVisibilityt = () => {
    this.setState({hidePasswordt: !this.state.hidePasswordt});
  };
  setPasswordVisibilitytt = () => {
    this.setState({hidePasswordtt: !this.state.hidePasswordtt});
  };

  update() {
    const {navigation} = this.props;
    console.warn(this.props);
    this.setState({user: navigation.getParam('user', '')});
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
    this.setState({api_token: this.state.user.data.token});
    console.warn('user....', this.state.user.data.token);
    console.warn('Token', this.state.api_token);
  }
  submit = () => {
    const {
      confirmPassword,
      newPassword,
      isLoading,
      currentPassword,
    } = this.state;
    console.warn(this.state.api_token);
    if (confirmPassword == '' || newPassword == '' || currentPassword == '') {
      alert('all feilds are required for student');
    } else {
      this.setState({isLoading: true});
      axios
        .patch(
          `${endPoint}/api/v1/update_my_password`,
          {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${this.state.api_token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          this.setState({isLoading: false});
          console.warn('app', res);
          if (res.data.status == 'success') {
            //alert('password Updated Successfully');
            this.props.navigation.navigate('PasswordUpdated');
          }
        })
        .catch((error) => {
          console.warn(error.response);

          this.setState({isLoading: false});
          Snackbar.show({
            title: 'Error Loading Data. Please Check internet Connectivity.',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={'Update Password'} name2={this.state.text} />
        <View style={styles.box2}>
          <KeyboardAvoidingView behavior="position" style={{}}>
            <Text style={styles.h3}> Current Password </Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={this.state.hidePassword}
                style={styles.textBox}
                placeholder=" Enter Current Password  "
                onChangeText={(currentPassword) =>
                  this.setState({currentPassword})
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touachableButton}
                onPress={this.setPasswordVisibility}>
                <Image
                  source={
                    this.state.hidePassword
                      ? require('../img/eye.png')
                      : require('../img/seeneye.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.h3}> New Password </Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={this.state.hidePasswordt}
                style={styles.textBox}
                placeholder=" New Password "
                onChangeText={(newPassword) => this.setState({newPassword})}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touachableButton}
                onPress={this.setPasswordVisibilityt}>
                <Image
                  source={
                    this.state.hidePasswordt
                      ? require('../img/eye.png')
                      : require('../img/seeneye.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.h3}> Confirm New Password </Text>
            <View style={styles.textBoxContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={this.state.hidePasswordtt}
                style={styles.textBox}
                placeholder=" Confirm New Password "
                onChangeText={(confirmPassword) =>
                  this.setState({confirmPassword})
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touachableButton}
                onPress={this.setPasswordVisibilitytt}>
                <Image
                  source={
                    this.state.hidePasswordtt
                      ? require('../img/eye.png')
                      : require('../img/seeneye.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.submit();
              }}
              style={{marginTop: RH(3), marginBottom: RH(3)}}>
              <Button name="Update Password" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>

        {this.state.isLoading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  box1: {
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box2: {
    height: '90%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: RH(1),
    marginLeft: RW(5),
    marginRight: RW(5),
  },
  textBox: {
    fontSize: RF(10),
    alignSelf: 'stretch',
    height: RH(6),
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  touachableButton: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
    marginTop: '15%',
  },

  h11: {
    fontSize: RF(13),
    marginLeft: RW(5),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: RF(10),
    marginLeft: RW(5),
    marginTop: RH(4),
    fontWeight: 'bold',
    color: '#868A94',
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
