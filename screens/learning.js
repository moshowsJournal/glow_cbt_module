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
import LongBox from '../components/longbox';
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class Learning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      text: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({topic: navigation.getParam('topic', '')});
    this.setState({text: navigation.getParam('text', '')});
  }

  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();

    console.warn(this.state.type);
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBarI name={this.state.topic} name2={this.state.text} />
        <View style={{marginTop: RH(-7)}}>
          <View
            style={{
              flexDirection: 'row',
              width: RW(90),
              marginLeft: RW(5),
            }}>
            <Image
              source={require('../img/pic.png')}
              style={{width: '100%', height: RH(40)}}
              resizeMode="contain"
            />
            <Image
              source={require('../img/play.png')}
              style={{
                width: RW(8),
                height: RH(8),
                marginLeft: RW(-46),
                marginTop: RH(15),
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              marginLeft: RW(5),
              backgroundColor: '#FFFFFF',
              width: RW(90),
              padding: 8,
              borderRadius: 10,
              marginTop: RH(-4),
            }}>
            <Text>This lesson teaches you how to use surds.</Text>
          </View>

          <View
            style={{
              marginLeft: RW(5),
              backgroundColor: '#FFFFFF',
              width: RW(90),
              padding: 8,
              borderRadius: 10,
              marginTop: RH(2),
            }}>
            <Text>Materials to Lesson</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../img/book.png')}
                style={{
                  width: RW(5),
                  height: RH(5),
                }}
                resizeMode="contain"
              />
              <Text style={{marginLeft: RW(3), marginTop: RH(1)}}>
                Presentatition 2 to lesson 1. What is surds
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Button name={'Select Another Lesson'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Assignment')}>
            <Button name={'Home Work'} />
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
