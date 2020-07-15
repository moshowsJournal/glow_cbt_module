import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  NativeEventEmitter,
  Image,
} from 'react-native';

import RNZoomUsBridge, {
  RNZoomUsBridgeEventEmitter,
} from '@mokriya/react-native-zoom-us-bridge';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import TopBarI from '../components/topBarI';
import Box from '../components/box';
import AsyncStorage from '@react-native-community/async-storage';
const ZOOM_APP_KEY = 'I2EXnOma8gud9K7VS0mH7TCf4X2RTHtlpRXb';
const ZOOM_APP_SECRET = 'dVJNm1kpD9dJVHhnttgBDHNb28ToEkzJnc6o';
const ZOOM_JWT_APP_KEY = 'JkIY946LSn6TTGtpvsi4LQ';
const ZOOM_JWT_APP_SECRET = '5HKalONmVRf6WaOr9QLF1eReJ8Pf9BVViwu9';

export default class LiveJoin extends Component {
  state = {
    meetingId: '76765765765',
    meetingPassword: '123456',
    meetingTitle: '',
    userName: '',
    userEmail: '',
    userId: '',
    accessToken: '',
    userZoomAccessToken: '',
    meetingCreated: false,
    view: 'select',
    type: '2',
    user: [],
  };
  componentWillUnmount() {
    console.warn('leave');
    this.setState({meetingCreated: false});
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      console.warn('moving');
      if (value !== null) {
        console.warn('user', JSON.parse(value));
        this.setState({user: JSON.parse(value)});
      }
    } catch (e) {
      // error reading value
    }
  };
  async componentDidMount() {
    await this.getData();
    this.setState({userName: this.state.user.data.data.user.fullname});
    console.warn('user', this.state.user.data.data.user.fullname);
    const meetingEventEmitter = new NativeEventEmitter(
      RNZoomUsBridgeEventEmitter,
    );

    if (!this.sdkInitialized) {
      // alert('mbfjf');
      this.sdkInitialized = meetingEventEmitter.addListener(
        'SDKInitialized',
        () => {
          // alert('SDKInitialized');

          // lets also get access token
          this.createAccessToken();
        },
      );
    }

    if (!this.meetingWaitingRoomIsActiveSubscription) {
      this.meetingWaitingRoomIsActiveSubscription = meetingEventEmitter.addListener(
        'waitingRoomActive',
        () => {
          Alert.alert(
            'Error Joining',
            'Meeting waiting room is active. Please disable before joining.',
            [{text: 'OK', onPress: () => null}],
            {cancelable: false},
          );
          console.warn('waitingRoomActive');
        },
      );
    }

    if (!this.meetingStatusChangedSubscription) {
      this.meetingStatusChangedSubscription = meetingEventEmitter.addListener(
        'meetingStatusChanged',
        (event) => console.warn('meetingStatusChanged', event.eventProperty),
      );
    }

    if (!this.hiddenSubscription) {
      this.hiddenSubscription = meetingEventEmitter.addListener(
        'meetingSetToHidden',
        () => console.warn('Meeting Hidden'),
      );
    }

    if (!this.endedSubscription) {
      this.endedSubscription = meetingEventEmitter.addListener(
        'meetingEnded',
        (result) => {
          console.warn('Meeting Ended: ', result);
          if ('error' in result) {
            Alert.alert(
              'Error Joining',
              'One of your inputs is invalid.',
              [{text: 'OK', onPress: () => null}],
              {cancelable: false},
            );
          }
        },
      );
    }

    if (!this.meetingErroredSubscription) {
      this.meetingErroredSubscription = meetingEventEmitter.addListener(
        'meetingError',
        (result) => {
          console.warn('Meeting Errored: ', result);
          if ('error' in result) {
            Alert.alert(
              'Error Joining',
              'One of your inputs is invalid.',
              [{text: 'OK', onPress: () => null}],
              {cancelable: false},
            );
          }
        },
      );
    }

    if (!this.startedSubscription) {
      this.startedSubscription = meetingEventEmitter.addListener(
        'meetingStarted',
        (result) => {
          console.warn('Meeting Started: ', result);
          if ('error' in result) {
            Alert.alert(
              'Error Joining',
              'One of your inputs is invalid.',
              [{text: 'OK', onPress: () => null}],
              {cancelable: false},
            );
          }
        },
      );
    }

    if (!this.joinedSubscription) {
      this.joinedSubscription = meetingEventEmitter.addListener(
        'meetingJoined',
        (result) => {
          console.warn('Meeting Joined: ', result);
          if ('error' in result) {
            Alert.alert(
              'Error Joining',
              'One of your inputs is invalid.',
              [{text: 'OK', onPress: () => null}],
              {cancelable: false},
            );
          }
        },
      );
    }

    this.initializeZoomSDK();
  }

  initializeZoomSDK = () => {
    if (!ZOOM_APP_KEY || !ZOOM_APP_SECRET) return false;

    // init sdk
    RNZoomUsBridge.initialize(ZOOM_APP_KEY, ZOOM_APP_SECRET)
      .then((res) => {
        //alert(res);
      })
      .catch((err) => {
        console.warn(err);
        Alert.alert('error!', err.message);
      });
  };

  joinMeeting = async () => {
    const {meetingId, userName, meetingPassword} = this.state;

    if (!meetingId || !userName || !meetingPassword) {
      alert('You have no live class yet');
    } else {
      RNZoomUsBridge.joinMeeting(String(meetingId), userName, meetingPassword)
        .then((res) => {
          alert(res);
        })
        .catch((err) => {
          console.warn(err);
          Alert.alert('error!', err.message);
        });
    }
  };

  createAccessToken = async () => {
    // to talk to ZOOM API you will need access token
    if (!ZOOM_JWT_APP_KEY || !ZOOM_JWT_APP_SECRET) return false;
    const accessToken = await RNZoomUsBridge.createJWT(
      ZOOM_JWT_APP_KEY,
      ZOOM_JWT_APP_SECRET,
    )
      .then((res) => {
        alert(JSON.stringify(res));
        console.warn('this is the res', res);
        this.setState({accessToken: res});
      })
      .catch((err) => alert(JSON.stringify(err)));

    //console.warn(`createAccessToken ${accessToken}`);

    //if (accessToken) this.setState({accessToken});
    console.warn('this is the state', this.state.accessToken);
  };

  getUserID = async (userEmail, accessToken) => {
    const fetchURL = `https://api.zoom.us/v2/users/${userEmail}`;
    const userResult = await fetch(fetchURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });

    console.warn('userResult', userResult);

    if (userResult && userResult.code === 429) {
      // rate error try again later
      Alert.alert('API Rate error try again in a few seconds');
    }

    if (userResult && userResult.id && userResult.status === 'active') {
      // set user id
      const {id: userId} = userResult;

      this.setState({userId});

      return userId;
    }

    return false;
  };

  createUserZAK = async (userId, accessToken) => {
    const fetchURL = `https://api.zoom.us/v2/users/${userId}/token?type=zak`;
    const userZAKResult = await fetch(fetchURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });

    console.warn('userZAKResult', userZAKResult);

    if (userZAKResult && userZAKResult.code === 429) {
      // rate error try again later
      Alert.alert('API Rate error try again in a few seconds');
    }

    if (userZAKResult && userZAKResult.token) {
      // set user id
      const {token} = userZAKResult;

      this.setState({
        userZoomAccessToken: token,
      });

      return token;
    }

    return false;
  };

  createMeeting = async () => {
    const {accessToken, userEmail, meetingTitle} = this.state;
    if (!accessToken || !meetingTitle || !userEmail) return false;

    // user ID is pulled from jwt end point using the email address
    const userId = await this.getUserID(userEmail, accessToken);
    await this.createUserZAK(userId, accessToken);

    if (userId) {
      // use api to create meeting

      const fetchURL = `https://api.zoom.us/v2/users/${userId}/meetings`;
      const createMeetingResult = await fetch(fetchURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: meetingTitle,
          type: 1,
          duration: 30,
          password: '123456', // set your own password is possible
          settings: {
            waiting_room: false,
            registrants_confirmation_email: false,
            audio: 'voip',
          },
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          return json;
        })
        .catch((error) => {
          console.error(error);
        });

      console.warn('createMeetingResult', createMeetingResult);

      if (createMeetingResult && createMeetingResult.code === 429) {
        // rate error try again later
        Alert.alert('API Rate error try again in a few seconds');
      }

      if (createMeetingResult && createMeetingResult.id) {
        const {id, password} = createMeetingResult;
        this.setState({
          meetingId: id,
          meetingPassword: password,
          meetingCreated: true,
        });
      }
      console.warn('meeting_Id', this.state.meetingId);
      console.warn('meetingPassword', this.state.meetingPassword);
    }
  };

  startMeeting = async () => {
    console.warn(this.state.meetingId);
    const {
      meetingId,
      userId,
      userName,
      userZoomAccessToken,
      accessToken,
    } = this.state;

    if (!meetingId || !userId || !userZoomAccessToken) return false;
    alert(meetingId);
    console.warn('userId', userId);
    console.warn('userName', userName);
    console.warn('userZoomAccessToken', userZoomAccessToken);
    console.warn('accessToken', accessToken);
    try {
      await RNZoomUsBridge.startMeeting(
        'Remi',
        String(meetingId),
        userId,
        userZoomAccessToken,
        accessToken,
      );
      console.warn({joinMeetingResult});
    } catch (e) {
      console.warn('gvdghvd', e);
    }
  };

  viewJoin = () => this.setState({view: 'join'});

  viewHost = () => this.setState({view: 'host'});

  render() {
    const {
      meetingId,
      userName,
      meetingCreated,
      userEmail,
      accessToken,
      meetingTitle,
      meetingPassword,
      view,
    } = this.state;

    return (
      <View style={styles.container}>
        <TopBarI name={this.state.userName} />
        <Image
          source={require('../img/logo2.png')}
          style={{width: RW(40), height: RH(40), alignSelf: 'center'}}
          resizeMode="contain"
        />
        {!ZOOM_APP_KEY || !ZOOM_APP_SECRET ? (
          <Text style={styles.welcome}>
            ZOOM_APP_KEY and ZOOM_APP_SECRET must be set
          </Text>
        ) : null}
        {!ZOOM_JWT_APP_KEY || !ZOOM_JWT_APP_SECRET ? (
          <Text style={styles.welcome}>
            optional ZOOM_JWT_APP_KEY and ZOOM_JWT_APP_SECRET must be set to
            host meetings
          </Text>
        ) : null}
        {view === 'select' ? (
          <>
            <TextInput
              value={meetingId}
              placeholder="Meeting ID"
              onChangeText={(text) => this.setState({meetingId: text})}
              style={styles.input}
              editable={false}
            />
            <TouchableOpacity
              onPress={() => {
                this.joinMeeting();
              }}
              style={{marginTop: RH(3), marginBottom: RH(3)}}>
              <Button name="Join Live Class" />
            </TouchableOpacity>
          </>
        ) : null}
        {view === 'join' ? (
          <>
            <TextInput
              value={meetingId}
              placeholder="Meeting ID"
              onChangeText={(text) => this.setState({meetingId: text})}
              style={styles.input}
            />
            <TextInput
              value={meetingPassword}
              placeholder="Meeting Password"
              onChangeText={(text) => this.setState({meetingPassword: text})}
              style={styles.input}
            />
            <TextInput
              value={userName}
              placeholder="Your name"
              onChangeText={(text) => this.setState({userName: text})}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => {
                this.joinMeeting();
              }}
              style={{marginTop: RH(3), marginBottom: RH(3)}}>
              <Button name="Join Meeting" />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    width: RW(90),
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    margin: 3,
    alignSelf: 'center',
  },
  button: {
    width: 200,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  buttonText: {
    color: 'white',
  },
});
