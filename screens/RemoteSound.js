import React, {Component} from 'react';
import Button from '../components/button';
import Sound from 'react-native-sound';
import TopBarI from '../components/topBarI';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import SoundPlayer from 'react-native-sound-player';

class RemoteSound extends Component {
  playTrack = () => {
    const track = new Sound(
      'https://www.soundjay.com/button/button-1.mp3',
      null,
      (e) => {
        if (e) {
          console.log('error loading track:', e);
        } else {
          track.play();
        }
      },
    );
  };

  playSong() {
    try {
      SoundPlayer.playSoundFile('engagementParty', 'm4a');
    } catch (e) {
      alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  }

  async getInfo() {
    // You need the keyword `async`
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      console.log('getInfo', info); // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log('There is no song playing', e);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TopBarI name={'Hello Emmanuel'} />
        <TouchableOpacity onPress={this.playTrack} style={{marginTop: RH(30)}}>
          <Button name="play" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default RemoteSound;
