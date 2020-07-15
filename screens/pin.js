import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import TopBarI from '../components/topBarI';
import {ScrollView} from 'react-native-gesture-handler';
import {endPoint} from '../components/baseapi';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import CodeInput from 'react-native-confirmation-code-input';

export default class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      phone: '',
      errors: '',
      isLoading: false,
      firstname: '',
      api_token: '',
      user: [],
      confirmNewPassword: '',
      newPassword: '',
      pin: '',
    };
  }

  time = () => {
    this.setState({isLoading: false});
  };
  async _onFulfill(code) {
    console.warn(code);
    await this.setState({pin: code});
    console.warn(this.state.pin);
  }
  // updatePhoto=(new_url)=>{
  //   user = this.state.user;
  //   user.photo_uri = new_url;
  //   this.setState({user:user});
  // }
  submit = () => {
    const {phone, isLoading, pin, newPassword, confirmNewPassword} = this.state;

    if (pin == '' || newPassword == '' || confirmNewPassword == '') {
      alert('All fields are required');
    } else {
      this.setState({isLoading: true});
      axios
        .patch(`${endPoint}/api/v1/student/reset_password`, {
          resetCode: pin,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        })
        .then((res) => {
          this.setState({isLoading: false});
          console.warn('app', res);
          if (res.data.status == 'success') {
            // this.storeData(res);

            this.props.navigation.navigate('PasswordChanged');
          }
        })
        .catch((error) => {
          console.warn(error.response);
          if (error.response.data.message == 'Incorrect username or password') {
            this.setState({error: error.response.data.message});
          }
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
        <StatusBar translucent backgroundColor="transparent" />

        <TopBarI name={'Reset Password'} />

        <View style={styles.box1}>
          <ScrollView>
            <Text style={styles.h1}> Welcome </Text>

            <Text style={styles.h3}> Enter the Pin sent </Text>
            <Text style={styles.h3}> to your Phone Number provided </Text>
            <View style={{marginTop: RH(1), height: RH(15)}}>
              <CodeInput
                ref="codeInputRef2"
                className="border-circle"
                keyboardType="default"
                //compareWithCode='AsDW2'
                activeColor="#EC6401"
                inactiveColor="black"
                autoFocus={false}
                codeLength={6}
                inputPosition="center"
                size={RF(33)}
                onFulfill={(code) => this._onFulfill(code)}
                containerStyle={{marginTop: 30}}
                codeInputStyle={{borderWidth: 1.5}}
              />
            </View>
            <Text
              style={{
                color: '#737A91',
                marginTop: RH(-1),
                marginLeft: RW(5),
                marginBottom: RH(1),
              }}>
              New Password
            </Text>

            <TextInput
              style={styles.textinput}
              onChangeText={(newPassword) => this.setState({newPassword})}
              placeholder=" New Password"
              keyboardType="default"
            />
            <Text
              style={{
                color: '#737A91',
                marginTop: RH(3),
                marginLeft: RW(5),
                marginBottom: RH(1),
              }}>
              Confirm New Password
            </Text>

            <TextInput
              style={styles.textinput}
              onChangeText={(confirmNewPassword) =>
                this.setState({confirmNewPassword})
              }
              placeholder="Confirm  New Password"
              keyboardType="default"
            />

            <View style={{marginTop: RH(6)}}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Button name="Reset Password" />
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  box1: {
    height: '90%',
    width: '100%',
    backgroundColor: '#D5D5D5',
  },

  h1: {
    fontSize: RF(15),
    alignSelf: 'center',
    marginTop: '2%',
    fontWeight: 'bold',
    marginBottom: RH(3),
  },
  h3: {
    fontSize: RF(10),
    alignSelf: 'center',
    color: '#737A91',
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: RF(25),
    fontFamily: 'name',
    color: '#00921B',
    marginTop: '2%',
  },
  textinput: {
    borderWidth: 1,
    marginLeft: RW(5),
    width: RW(90),
    height: RH(6),
    borderRadius: 5,
    borderColor: '#EC6401',
    padding: 8,
  },
});
