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
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class HomeP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
    };
  }
  update() {
    const {navigation} = this.props;
    this.setState({type: navigation.getParam('type', '')});
  }

  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();

    console.warn(this.state.type);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '90%'}}>
          <TopBarI name={'Hello Emmanuel'} name2={this.state.type} />
          <Text style={{marginTop: RH(2)}}>Home Page for Parent</Text>
          <View
            style={{
              flexWrap: 'wrap',
              width: RW(100),

              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'Mathematics',
                })
              }>
              <Box name={'Mathematics'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'English',
                })
              }>
              <Box name={'English'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'Commerce',
                })
              }>
              <Box name={'Commerce'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'Biology',
                })
              }>
              <Box name={'Biology'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'Economics',
                })
              }>
              <Box name={'Economics'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'Yoruba',
                })
              }>
              <Box name={'Yoruba'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'Government',
                })
              }>
              <Box name={'Government'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Classes', {
                  type: 'Geography',
                })
              }>
              <Box name={'Geography'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box3}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('HomeP', {user: this.state.user})
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/homeo.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Home </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ChatP', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/c.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Chat </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('LibraryP', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/bb.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Performance </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileP', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/class.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Profile </Text>
            </View>
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
  box3: {
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 2,
  },
});
