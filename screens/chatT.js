import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid,
  androidHeaderHeight,
  Clipboard,
} from 'react-native';
import {Header, NavigationActions} from 'react-navigation';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import {ChatScreen} from 'react-native-easy-chat-ui';
import ImagePicker from 'react-native-image-crop-picker';
import {RH, RW, RF} from '../resize';
import moment from 'moment';
//import io from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';

export default class ChatT extends React.Component {
  state = {
    library: false,
    Take: false,
    pick: false,
    myId: '88886666',
    chatAll: [],
    image: {},
    files: {},
    messages: [
      {
        id: `1`,
        type: 'text',
        content: 'hello world',
        targetId: '12345678',

        chatInfo: {
          avatar: require('../img/pas2.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542006036549',
        userName: 'Remi',
      },
      {
        id: `11`,
        type: 'text',
        content: 'Any one there',
        targetId: '12345678',
        chatInfo: {
          avatar: require('../img/pas2.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542006036549',
      },
      {
        id: `14`,
        type: 'text',
        content: 'helloooo',
        targetId: '12345678',
        chatInfo: {
          avatar: require('../img/pas2.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542006036549',
      },
      {
        id: `2`,
        type: 'text',
        content: 'hi/{se}',
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/pas1.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542106036549',
      },
      {
        id: `3`,
        type: 'image',
        content: {
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSokBPnORk1sXfgnWKH9O7TntlQhSvpu_vbrLdepOMHdD7_F6nD&usqp=CAU',
          width: RW(70),
          height: RH(50),
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/remi.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: false,
        sendStatus: 1,
        time: '1542106037000',
      },

      {
        id: `4`,
        type: 'text',
        content: 'great',
        targetId: '12345678',
        chatInfo: {
          avatar: require('../img/remi.jpeg'),
          id: '12345678',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542177036549',
      },
      {
        id: `5`,
        type: 'voice',
        content: {
          uri: 'https://open.spotify.com/album/0GxxbvuvH78qHtiAWz7P4R',
          length: 10,
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/bc.jpg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542260667161',
      },
      {
        id: `6`,
        type: 'voice',
        content: {
          uri: 'https://open.spotify.com/album/0GxxbvuvH78qHtiAWz7P4R',
          length: 30,
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/remi.jpeg'),
          id: '12345678',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542264667161',
      },
    ],
    // chatBg: require('../../source/bg.jpg'),
    inverted: true, // require
    voiceHandle: true,
    currentTime: 0,
    recording: true,
    paused: false,
    stoppedRecording: false,
    finished: true,
    audioPath: '',
    voicePlaying: false,
    voiceLoading: false,
  };

  async pick() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.warn(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.warn('cancel');
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  sendMessage = (type, content, isInverted) => {
    console.warn(type, content, isInverted, 'msg', Math.random());
    //let dd = moment(new Date()).format('DD/MM/YYYY');
    // let ans = {
    //   id: Math.random(),
    //   type: type,
    //   content: content,
    //   targetId: '12345678',
    //   chatInfo: {
    //     avatar: require('../img/pas2.jpeg'),
    //     id: '12345678',
    //     nickName: 'Test',
    //   },

    //   renderTime: true,
    //   sendStatus: 0,
    //   time: Date.parse(JSON.stringify(dd)),
    // };

    // this.state.messages.push(ans);
    //  console.warn('this is the message array', this.state.messages);
    const sendMessageNow = {
      content: content,
      targetId: 'adhfbajdvafjvdjhfvhvusdvfv',
      senderInfo: {
        avatar: require('../img/remi.jpeg'),
        id: this.state.myId,
        nickname: 'big head',
        username: 'Remi',
      },
    };
    this.socket.emit('chat message', sendMessageNow);
  };

  sendImage() {
    image: {
      uri: 'image.path';
      type: 'image.type';
      name: 'image.name';
    }
    targetId: 'adhfbajdvafjvdjhfvhvusdvfv';
    senderInfo: {
      avatar: require('../img/remi.jpeg');
      id: this.state.myId;
      nickname: 'big head';
      username: 'Remi';
    }
  }

  sendFile() {
    image: {
      uri: 'file.path';
      type: 'file.type';
      name: 'file.name';
    }
    targetId: 'adhfbajdvafjvdjhfvhvusdvfv';
    senderInfo: {
      avatar: require('../img/remi.jpeg');
      id: this.state.myId;
      nickname: 'big head';
      username: 'Remi';
    }
  }

  lib = async () => {
    await this.setState({library: true});
    await this.setState({Take: false});
    this.setState({pick: false});
    await this.try();
    console.warn('library is now true');
  };

  tak = async () => {
    await this.setState({Take: true});
    await this.setState({library: false});
    this.setState({pick: false});
    await this.try();
    console.warn('Take is now true');
  };

  try() {
    if (this.state.library === true && this.state.Take === false) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.1,
      })
        .then((image) => {
          this.setState({pick: false});
          this.setState({library: false});
          this.setState({Take: false});
          console.warn(image);
          this.setState({value2: 'Photo selected'});
          this.setState({photo: image});
        })
        .catch((e) => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn('cancel');
          console.warn(e);
        });
    } else if (this.state.Take === true && this.state.library === false) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.1,
      })

        .then((image) => {
          this.setState({pick: false});
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(image);
          this.setState({value2: 'Photo Taken'});
          this.setState({photo: image});
        })
        .catch((e) => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(e);
        });
    }
  }
  press(type, index, text) {
    {
      let items = [
        {
          title: 'del',
          onPress: () => {
            that.props.delMessage([index]);
          },
        },

        {
          title: 'Multiple ',
          onPress: () => {
            that.multipleSelect(index);
          },
        },
      ];

      if (type === 'text') {
        items = [
          {title: 'Copy', onPress: () => Clipboard.setString(text)},
          {
            title: 'Delete',
            onPress: () => {
              that.props.delMessage([index]);
            },
          },
          {
            title: 'Multi Select',
            onPress: () => {
              that.props.multipleSelect(index);
            },
          },
        ];
      }
      return items;
    }
  }
  // componentDidMount() {
  //   this.socket = io('https://itskills-chat-app.herokuapp.com', {
  //     transports: ['websocket'],
  //   });

  //   this.socket.on('chat message', (msg) => {
  //     console.warn(msg[0]);

  //     this.state.messages.push(msg[0]);
  //   });
  // }
  sendMessage = (type, content, isInverted) => {
    console.log(type, content, isInverted, 'msg');
  };

  render() {
    // console.warn(moment(new Date()).format('DD/MM/YYYY'));
    return (
      <ChatScreen
        ref={(e) => (this.chat = e)}
        audioHasPermission={true}
        userProfile={{id: this.state.myId, avatar: require('../img/pas1.jpeg')}}
        pressInText="press in"
        pressOutText="press out"
        placeholder="Type your message"
        voiceErrorText="voice error"
        voiceCancelText="voice cancel"
        voiceNoteText="voiceNoteText"
        showUserName={true}
        setPopItems={(type, index, text) => this.press(type, index, text)}
        chatBackgroundImage={require('../img/remi.jpeg')}
        messageList={this.state.messages}
        androidHeaderHeight={androidHeaderHeight}
        sendMessage={this.sendMessage}
        usePlus={false}
        //plusIcon={this.pick}
      />
    );
  }
}
