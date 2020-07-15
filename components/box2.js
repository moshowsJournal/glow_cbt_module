import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class Box extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <View>
          <View style={styles.boxr}>
            <Image
              source={require('../img/bb.png')}
              style={{
                width: RW(5),
                height: RH(5),
                marginLeft: RW(2),
                marginTop: RH(1),
              }}
              resizeMode="contain"
            />
            <View style={{width: '85%'}}>
              <Text style={styles.h1}>{this.props.name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: RH(8),
    width: RW(40),
    backgroundColor: '#EC6401',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(3),
    padding: 15,
    justifyContent: 'center',
  },
  h1: {
    fontSize: RF(10),
    marginLeft: RW(2),
    marginTop: RH(0.5),
  },
  boxr: {
    height: RH(8),
    width: RW(40),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(-3),
    padding: 15,
    justifyContent: 'center',
    marginLeft: RW(-3),
  },
});
