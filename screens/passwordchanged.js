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
import Success from '../components/success';

export default class PasswordChanged extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Success
          name="Password Changed"
          details="Your Password has been changed"
          details2="successfully"
        />
        <View style={{marginTop: RH(-40)}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FirstPage')}>
            <Button name="Continue" />
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
