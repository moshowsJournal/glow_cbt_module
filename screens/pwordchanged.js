import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import {endPoint} from '../components/baseapi';

export default class Pwordchanged extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: '10%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../img/name2.png')}
            style={{
              width: RW(50),
              height: RH(30),
              marginLeft: RW(5),
              marginTop: RH(4),
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.box1}>
          <Text style={styles.h1}> Password Changed </Text>

          <Image
            source={require('../img/Illustration.png')}
            style={{
              width: RW(35),
              height: RH(20),
              alignSelf: 'center',
              marginTop: '2%',
            }}
            resizeMode="contain"
          />

          <View style={{marginTop: RH(5)}}>
            <Text style={{fontSize: RF(10), alignSelf: 'center'}}>
              {' '}
              You have successfully changed your{' '}
            </Text>
            <Text style={styles.h3}> Password. </Text>
          </View>

          <View style={{marginTop: RH(10)}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <Button tx="Find Your Estate " />
            </TouchableOpacity>
          </View>
        </View>
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
    height: RH(90),
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },
  h1: {
    fontSize: RF(15),
    alignSelf: 'center',
    marginTop: RH(4),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: RF(10),
    alignSelf: 'center',
  },
  name: {
    fontSize: RF(25),
    fontFamily: 'name',
    color: '#00921B',
    alignSelf: 'center',
    marginTop: '2%',
  },
});
