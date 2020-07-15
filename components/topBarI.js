import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class TopBarI extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../img/logo.png')}
            style={{width: RW(10), height: RH(10), marginLeft: RW(5)}}
            resizeMode="contain"
          />
          <View style={{flexDirection: 'row'}}></View>
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.h2}>{this.props.name2}</Text>
          <Text style={styles.h1}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
//{this.props.name}
const styles = StyleSheet.create({
  box: {
    height: RH(20),
    width: '100%',
    backgroundColor: '#EC6401',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: RH(1),
  },
  h1: {
    fontSize: RF(15),
    // marginLeft: RW(40),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: RH(1),
    marginBottom: RH(55),
  },
  h2: {
    fontSize: RF(12),
    // marginLeft: RW(40),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: RH(-2),
  },
});
