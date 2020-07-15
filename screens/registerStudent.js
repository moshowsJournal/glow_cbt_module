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
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class RegisterStudent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={'Student signup'} />
        <ScrollView>
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder="Full Name"
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
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder="Date of birth"
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
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" Class"
              secureTextEntry={true}
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
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" Name of school"
              secureTextEntry={true}
            />
            <Image
              source={require('../img/home.png')}
              style={{
                width: RW(6),
                height: RH(6),
                marginTop: RH(4.5),
                marginLeft: RW(-88),
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" School address"
              secureTextEntry={true}
            />
            <Image
              source={require('../img/home.png')}
              style={{
                width: RW(6),
                height: RH(6),
                marginTop: RH(4.5),
                marginLeft: RW(-88),
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" Email"
              secureTextEntry={true}
            />
            <Image
              source={require('../img/mail.png')}
              style={{
                width: RW(5),
                height: RH(5),
                marginTop: RH(5.5),
                marginLeft: RW(-88),
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" Username"
              secureTextEntry={true}
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
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" Phone Number"
              secureTextEntry={true}
            />
            <Image
              source={require('../img/phone.png')}
              style={{
                width: RW(5.5),
                height: RH(5.5),
                marginTop: RH(5),
                marginLeft: RW(-88),
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.case}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" Parent Phone Number"
              secureTextEntry={true}
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
          <View style={styles.case}>
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
          <View style={styles.casel}>
            <TextInput
              style={styles.textinput}
              ref={(input) => {
                this.Password = input;
              }}
              onChangeText={(password) => this.setState({password})}
              placeholder=" Confirm password"
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
          <TouchableOpacity style={{marginBottom: RH(5)}}>
            <Button name={'Sign Up'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: RH(3),
            }}>
            <Text style={{color: 'white'}}>Have an account?</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Login', {
                  type: 'Student login form',
                })
              }>
              <Text style={{color: '#EC6401'}}>Login</Text>
            </TouchableOpacity>
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
});
