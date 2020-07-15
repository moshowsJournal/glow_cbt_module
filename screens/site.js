import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {RH, RW} from '../resize';
import Button from '../components/button';

export default class Site extends Component {
  render() {
    const url = 'http://Glow-elearn.com';
    return (
      <View style={{flex: 1}}>
        <View style={{height: RH(100)}}>
          <WebView
            source={{
              uri: url,
            }}
            startInLoadingState
            scalesPageToFit={true}
            javaScriptEnabled={true}
            mediaPlaybackRequiresUserAction
            style={{height: RH(100)}}
          />
          <View style={{marginTop: RH(3)}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Button name="Profile" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon2: {
    width: RW(9),
    height: RH(9),
  },
});
