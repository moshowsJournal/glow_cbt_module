import * as React from 'react';
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
import Button from '../components/button';
import TopBarI from '../components/topBarI';
import Box3 from '../components/box3';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';

export default class AllLectures extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      name: '',
      api_token: '',
      isLoading: '',
      AllLectures: [],
      AllOthers: [],
      subject: {},
      all: '',
      sub: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({sub: navigation.getParam('sub', '')});
    this.setState({subject: navigation.getParam('subject', '')});
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
    const {navigation} = this.props;
    await this.update();
    await this.getData();
    console.warn(this.state.type);
    this.setState({name: this.state.user.data.data.user.fullname});

    this.setState({api_token: this.state.user.data.token});
    console.warn('userrrrrrrvbfhfrrr', this.state.user.data.data.user.fullname);
    console.warn('classId', this.state.subject.classId);
    console.warn('school', this.state.user.data.data.user.school);
    console.warn('Token', this.state.api_token);
    console.warn('subject', this.state.subject.classId);
    await this.getAllLectures();
  }
  componentWillUnmount() {
    console.warn('leave');
    this.setState({all: ''});
  }
  getAllLectures = () => {
    this.setState({isLoading: true});

    axios
      .get(
        `${endPoint}/api/v1/schools/${this.state.user.data.data.user.school}/classes/${this.state.subject.classId}/lectures?subject=${this.state.sub}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.api_token}`,
            Accept: 'application/json',
          },
        },
      )
      .then((res) => {
        this.setState({isLoading: false});
        console.warn('response', res.data.data);
        this.setState({AllLectures: res.data.data});
        console.warn('state All lectures', this.state.AllLectures);
      })
      .catch((error) => {
        console.warn(error.response);
        this.setState({isLoading: false});
        Snackbar.show({
          title: 'Error Loading Data. Please Check internet Connectivity.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.name} />
        <View
          style={{
            marginLeft: RW(5),
            width: RW(100),
          }}>
          <ScrollView>
            {this.state.AllLectures.map((item, key) => (
              <TouchableOpacity
                Key={key}
                onPress={() =>
                  this.props.navigation.navigate('ClassesT', {
                    res: item,
                    sub: this.state.sub,
                    subject: this.state.subject,
                  })
                }>
                <Box3 name={item.title} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {this.state.isLoading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#EC6401" />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#D5D5D5',
  },
  textinput: {
    width: RW(90),
    height: RH(6),
    borderRadius: 50,
    borderColor: '#00921B',
    paddingLeft: 28,
    marginTop: RH(5),
    backgroundColor: '#F8F8F8',
  },
  case: {
    flexDirection: 'row',
    marginBottom: RH(-1),
    width: RW(90),
    marginLeft: RW(5),
  },
  casel: {
    flexDirection: 'row',
    marginBottom: RH(1),
    width: RW(90),
    marginLeft: RW(5),
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
