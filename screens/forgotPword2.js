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

export default class ForgotPword2 extends React.Component {
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
      schoolCode: '',
      type: '',
    };
  }

  time = () => {
    this.setState({isloading: false});
  };

  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
  }

  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();

    console.warn('hhh', this.state.type);
  }
  submit = () => {
    const {phone, isLoading, schoolCode} = this.state;

    if (phone == '' || schoolCode == '') {
      alert('All fields are required');
    } else {
      this.setState({isLoading: true});
      axios
        .post(`${endPoint}/api/v1/${this.state.type}/forgot_password`, {
          phoneNumber: phone,

          schoolCode: schoolCode, //Only for parents, staff and stapents
        })
        .then((res) => {
          this.setState({isLoading: false});
          console.warn('app', res);
          if (res.data.status == 'Success') {
            // this.storeData(res);
            this.props.navigation.navigate('Pin');
          }
        })
        .catch((error) => {
          console.warn(error.response.data.message);
          // if (error.response.data.message == 'Incorrect username or password') {
          //   this.setState({error: error.response.data.message});
          // }
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
            <Text style={styles.h1}>Forgot Your Password ?</Text>

            <Text style={styles.h3}>
              Enter the phone number you used when you{' '}
            </Text>
            <Text style={styles.h3}>
              joined and we'll send you instructions to reset{' '}
            </Text>
            <Text style={styles.h3}>Your password </Text>

            <Text
              style={{
                color: '#737A91',
                marginTop: RH(5),
                marginLeft: RW(5),
                marginBottom: RH(1),
              }}>
              Phone Number
            </Text>

            <TextInput
              style={styles.textinput}
              onChangeText={(phone) => this.setState({phone})}
              placeholder="Phone Number"
              keyboardType="numeric"
            />

            <Text
              style={{
                color: '#737A91',
                marginTop: RH(5),
                marginLeft: RW(5),
                marginBottom: RH(1),
              }}>
              School Code
            </Text>

            <TextInput
              style={styles.textinput}
              onChangeText={(schoolCode) => this.setState({schoolCode})}
              placeholder="School Code"
              keyboardType="numeric"
            />

            <View style={{marginTop: RH(6)}}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Button name="Reset Password" />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RH(3),
                }}>
                <Text style={{color: '#737A91'}}>
                  {' '}
                  Remember your password?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Login', {
                      type: this.state.type,
                    })
                  }>
                  <Text style={{color: '#EC6401'}}> log in </Text>
                </TouchableOpacity>
              </View>
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
    marginTop: '10%',
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
