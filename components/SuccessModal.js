import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';

export const ExamCompleted = ({name,navigation}) => {
    return (
      <View style={styles.box1}>
        <Text style={styles.h1}>{name}!</Text>

        <Image
          source={require('../img/logo2.png')}
          style={{
            width: RW(35),
            height: RH(20),
            alignSelf: 'center',
            marginTop: '2%',
          }}
          resizeMode="contain"
        />

        <View
          style={{
            marginTop: '5%',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
          onPress={()=> {
              //submit exam and go to result
              console.log('Go to Result');
          }}
          >
              <Button name="Check Your Score" />
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#D5D5D5',
  },
  box1: {
    height: RH(90),
    width: RW(100),
    backgroundColor: '#D5D5D5',
    marginTop: RH(10),
  },
  h1: {
    fontSize: RF(15),
    alignSelf: 'center',
    marginTop: RH(4),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: RF(10),
    alignSelf: 'center',
  },
  name: {
    fontSize: RF(25),
    fontFamily: 'name',
    color: '#00921B',
    alignSelf: 'center',
    marginTop: '2%',
  },
});
