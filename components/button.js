import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class Button extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.h1}>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: RW(90),
    height: RH(6),
    borderRadius: 50,
    backgroundColor: '#EC6401',
    marginLeft: RW(5),
    marginTop: RH(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: RF(12),
    color: 'white',

    fontWeight: 'bold',
  },
});
