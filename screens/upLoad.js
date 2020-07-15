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

export default class Upload extends React.Component {
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
        <View style={{height: '100%'}}>
          <TopBarI name={'Hello Emmanuel'} />
          <Text>Staff</Text>
          <View style={{marginTop: RH(7)}}>
            <View
              style={{
                marginLeft: RW(5),
                backgroundColor: '#FFFFFF',
                width: RW(90),
                padding: 8,
                borderRadius: 10,
                marginTop: RH(2),
                height: RH(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../img/download.png')}
                  style={{
                    width: RW(20),
                    height: RH(20),
                  }}
                  resizeMode="contain"
                />
              </View>
              <Text style={{marginTop: RH(-5)}}>
                Click here to Upload your Materials for Students
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Button name={'Upload'} />
            </TouchableOpacity>
          </View>
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
