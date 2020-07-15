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

export default class ProfileP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
  }

  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();

    console.warn(this.state.type);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '90%'}}>
          <TopBarI name={'Hello Emmanuel'} />
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
                // source={{
                //   uri: `https://estategenie.ageofbrains.com/${this.state.photouri}`,
                // }}
                source={require('../img/remi.jpeg')}
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
              Emmanuel
            </Text>

            <View
              style={{
                borderBottomWidth: 4,
                marginTop: RH(3),
                borderBottomColor: '#F2F2F2',
              }}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Editprofile', {
                  user: this.state.user,
                  lastname: this.state.user2.surname,
                  firstname: this.state.user2.firstname,
                  phone: this.state.user2.phone,
                })
              }>
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
                this.props.navigation.navigate('Live', {
                  user: this.state.user,
                })
              }>
              <View style={styles.line2}>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    Take live lecture
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
                this.props.navigation.navigate('Updatepassword', {
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

            <View style={styles.line2}>
              <View style={{width: '80%'}}>
                <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                  {' '}
                  Help & Support{' '}
                </Text>
              </View>
              <Image
                source={require('../img/f.png')}
                style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                resizeMode="contain"
              />
            </View>

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
              this.props.navigation.navigate('HomeP', {user: this.state.user})
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
              this.props.navigation.navigate('ChatP', {
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
              this.props.navigation.navigate('LibraryP', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/bb.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Performance </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileP', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/class.png')}
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
});
