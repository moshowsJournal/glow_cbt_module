import * as React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class LongBox extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Image
          style={{
            // flex: 1,
            height: RH(100),
            width: '30%',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('../img/pichol.png')}
          resizeMode="contain"
        />
        <View>
          <Image
            source={require('../img/play.png')}
            style={{width: RW(8), height: RH(8), marginLeft: RW(-17)}}
            resizeMode="contain"
          />
        </View>

        <View style={{width: '85%'}}>
          <Text style={styles.h1}>{this.props.topic}</Text>
          <Text style={styles.h2}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: RH(10),
    width: RW(90),
    marginLeft: RW(5),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(3),
    borderRadius: 10,
    elevation: 5,
  },
  h1: {
    fontSize: RF(12),
    marginLeft: RW(4),

    fontWeight: 'bold',
    color: '#828282',
  },
  h2: {
    fontSize: RF(10),
    marginLeft: RW(4),
    marginTop: RH(0.5),
  },
});
