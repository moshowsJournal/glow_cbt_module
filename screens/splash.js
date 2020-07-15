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
import {SliderBox} from 'react-native-image-slider-box';
//import {endPoint} from '../components/baseapi';

export default class Splash2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../img/bc.jpg'),
        require('../img/l1.jpeg'),
        require('../img/l2.jpeg'),
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <SliderBox
          images={this.state.images}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          style={{height: '100%', width: '100%'}}
        />
        <View
          style={{
            // backgroundColor: 'black',
            marginTop: RH(-96),

            alignItems: 'center',
          }}>
          <Text style={styles.text2}>Welcome to</Text>
          <Image
            source={require('../img/logo.png')}
            style={{width: RW(20), height: RH(20)}}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('FirstPage')}
          style={{
            marginTop: RH(55),
            marginLeft: RW(35),
            flexDirection: 'row',
          }}>
          <Text style={styles.text1}>Get started</Text>
          <Image
            source={require('../img/forward.png')}
            style={{
              width: RW(5),
              height: RH(5),
              marginLeft: RW(3),
              marginTop: RH(-0.7),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: RH(3),
  },
});
