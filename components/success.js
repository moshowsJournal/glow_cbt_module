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

export default class Success extends React.Component {
  render() {
    let nav2 = `${this.props.nav}`;
    return (
      <View style={styles.box1}>
        <Text style={styles.h1}>{this.props.name}!</Text>

        <Image
          source={require('../img/logo2.png')}
          style={{
            width: RW(35),
            height: RH(20),
            alignSelf: 'center',
            marginTop: '2%',
          }}
          resizeMode="contain"
        />

        <View
          style={{
            marginTop: '5%',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: RF(12), alignSelf: 'center'}}>
            {this.props.details}
          </Text>
          <Text style={{fontSize: RF(12), alignSelf: 'center'}}>
            {this.props.details2}
          </Text>
          <Text style={{fontSize: RF(12), alignSelf: 'center'}}>
            {this.props.details3}
          </Text>
          <Button name="Go to"/>
          <Text>Stay Here</Text>
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
    backgroundColor: '#D5D5D5',
    marginTop: RH(10),
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
