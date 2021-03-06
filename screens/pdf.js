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
import Box from '../components/box';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class Pdf extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      name: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
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

    console.warn('userrrrrrrrrr', this.state.user.data.data.user.fullname);
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.name} />
        <View
          style={{
            flexWrap: 'wrap',
            width: RW(100),

            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Lessons', {
                type: 'JSS1',
                sub: this.state.type,
              })
            }>
            <Box name={'PDF'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Lessons', {
                type: 'JSS2',
                sub: this.state.type,
              })
            }>
            <Box name={'VIDEOS'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Lessons', {
                type: 'JSS3',
                sub: this.state.type,
              })
            }>
            <Box name={'AUDIOS'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Lessons', {
                type: 'SS1',
                sub: this.state.type,
              })
            }>
            <Box name={'IMAGES'} />
          </TouchableOpacity>
        </View>
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
});
