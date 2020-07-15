import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {RH, RW, RF} from '../resize';

//import {endPoint} from '../components/baseapi';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View
          style={{
            // backgroundColor: 'black',
            marginTop: RH(6),

            alignItems: 'center',
          }}>
          <Text style={styles.text2}>Welcome to</Text>
          <Image
            source={require('../img/logo.png')}
            style={{width: RW(20), height: RH(20)}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            marginTop: RH(55),
            alignSelf: 'center',
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
          <Text style={styles.text1}>Login or Register as </Text>
          {/* <Image
            source={require('../img/forward.png')}
            style={{
              width: RW(5),
              height: RH(5),
              marginLeft: RW(3),
              marginTop: RH(-0.7),
            }}
            resizeMode="contain"
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: RH(6),
            // backgroundColor: 'red',
            width: RW(100),
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: RH(4),
          }}>
          <TouchableOpacity
            style={styles.bb}
            onPress={() =>
              this.props.navigation.navigate('Login', {
                type: 'student',
              })
            }>
            <Text style={styles.text1}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bb}
            onPress={() =>
              this.props.navigation.navigate('Login2', {
                type: 'staff',
              })
            }>
            <Text style={styles.text1}>Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bb}
            onPress={() =>
              this.props.navigation.navigate('Login2', {
                type: 'parent',
              })
            }>
            <Text style={styles.text1}>Parent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bb}
            onPress={() =>
              this.props.navigation.navigate('Login2', {
                type: 'stapent',
              })
            }>
            <Text style={styles.text1}>Stapent</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EC6401',
  },
  h1: {
    fontSize: RF(15),
    alignSelf: 'center',

    fontWeight: 'bold',
    color: 'white',
  },
  h2: {
    fontSize: RF(10),
    alignSelf: 'center',

    fontWeight: 'bold',
    color: 'white',
  },
  text1: {color: 'white', fontSize: RF(12), fontWeight: 'bold'},
  text2: {
    color: 'white',
    fontSize: RF(15),
    fontWeight: 'bold',
    marginTop: RH(-3),
  },
  bb: {
    borderWidth: 1,
    borderRadius: 7,
    // elevation: 5,
    borderColor: '#FFFFFF',
    padding: 10,
    marginTop: RH(-1),
  },
});
