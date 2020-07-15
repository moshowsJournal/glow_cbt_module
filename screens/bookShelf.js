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
import Box2 from '../components/box2';
import TopBarI from '../components/topBarI';
import LongBox from '../components/longbox';
// import axios from 'axios';
// import Snackbar from 'react-native-snackbar';
// import {endPoint} from '../components/baseapi';

export default class BookShelf extends React.Component {
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
        <TopBarI name={'Book Shelf'} />
        <Text style={{marginLeft: RW(5), marginBottom: RH(2)}}>
          Books For You
        </Text>
        <ScrollView>
          <View
            style={{
              width: RW(90),
              marginLeft: RW(5),
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <View style={styles.box}>
              <Image
                source={require('../img/pic.png')}
                style={{
                  width: '100%',
                  height: '60%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
              <Text
                style={{
                  fontSize: RF(8),
                  marginTop: RH(2),
                  alignSelf: 'center',
                }}>
                The principles of chemistry
              </Text>
            </View>

            <View style={styles.box}>
              <Image
                source={require('../img/pic.png')}
                style={{
                  width: '100%',
                  height: '60%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
              <Text
                style={{
                  fontSize: RF(8),
                  marginTop: RH(2),
                  alignSelf: 'center',
                }}>
                The principles of chemistry
              </Text>
            </View>

            <View style={styles.box}>
              <Image
                source={require('../img/pic.png')}
                style={{
                  width: '100%',
                  height: '60%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
              <Text
                style={{
                  fontSize: RF(8),
                  marginTop: RH(2),
                  alignSelf: 'center',
                }}>
                The principles of chemistry
              </Text>
            </View>

            <View style={styles.box}>
              <Image
                source={require('../img/pic.png')}
                style={{
                  width: '100%',
                  height: '60%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
              <Text
                style={{
                  fontSize: RF(8),
                  marginTop: RH(2),
                  alignSelf: 'center',
                }}>
                The principles of chemistry
              </Text>
            </View>
            <Box2 name={'Economics'} />
            <Box2 name={'Yoruba'} />
          </View>
        </ScrollView>
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
  box: {
    height: RH(30),
    width: RW(42),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: RH(2),
  },
});
