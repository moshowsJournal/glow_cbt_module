import React, {useEffect,useState} from 'react';
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
    Button,
    Picker
  } from 'react-native';
  import {RH, RW, RF} from '../resize';
  //import Button from '../components/button';
   import TopBarI from '../components/topBarI';
  // import Box3 from '../components/box3';
  import Success from '../components/success';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import {GetAsyncStorageHandler} from '../components/HandlerFunctions';
  import {PostRequestWithTokenHandler,GetResquestWithTokenHandler,PutResquestWithTokenHandler} from '../components/HandlerFunctions';
  import {endPoint} from '../components/baseapi';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  // import axios from 'axios';
  // import Snackbar from 'react-native-snackbar';
  // import {endPoint} from '../components/baseapi';



export const StudentExamination = ({route,navigation}) => {
  const [assessments, setAssessments] = useState([]);
  let [assessment, setAssessment] = useState('');
  let [is_successful, setSuccessful] = useState(false); 
  let [is_processing,setProcessing] = useState(false);
  let [questions,setQuestions] = useState([]);
  let [selected_questions,setSelectedQues] = useState([]);
  let [school_id,setSchool] = useState('');
    useEffect(()=>{
        //save the login response into async storage
        GetAsyncStorageHandler().then(res => {
            setSchool(res.user.school);
            GetResquestWithTokenHandler(`${endPoint}/api/v1/schools/${res.user.school}/assessments`).then((res)=>{
                setAssessments(res.data);
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }).catch(error => {
            console.log(error);
        });
    },[

    ]);
    return(
      
      <View>
      <TopBarI name={'Examinations'} />
        
      {
        is_successful === true && <Success name="Success" button={true}/>
      }
        {
          is_successful === false && (
              <ScrollView
                  style={{
                    marginLeft: RW(5),
                    backgroundColor: '#FFFFFF',
                    width: RW(90),
                    padding: 8,
                    borderRadius: 10,
                    marginTop: RH(2),
                    height: RH(70)
                  }}>

                {
                    assessments.map((assess,index)=>{
                        return(
                            <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate('StartExam',{
                                    assess
                                });
                            }}
                                style={{
                                    borderBottom:1,
                                    borderBottomColor:'grey',
                                    borderBottomWidth:1
                                }}
                                key={index}
                            >
                                <View style={{padding:15}}>
                                    <Text
                                        style={{alignContent:'center',
                                        marginTop:30,fontSize:17,
                                        fontWeight:'bold'
                                    }}
                                >{assess.title}</Text>
                                <Text>{`Subject : ${assess.subject}`}</Text>
                                <Text>{`Duration : ${assess.duration !== undefined ? assess.duration : 30} mins`}</Text>
                                </View>
                                
                            </TouchableOpacity>

                        )
                    })
                }
              </ScrollView>

          )
        }
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D5D5',
  },

  box: {
    width: RW(75),
    height: RH(6),
    borderRadius: 50,
    backgroundColor: '#EC6401',
    marginLeft: RW(5),
    marginTop: RH(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: RF(12),
    color: 'white',
    fontWeight: 'bold',
  },


  formgroup :{
    padding:50
  },
  textinput: {
    width: RW(75),
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
    marginBottom:15,
    marginLeft: RW(5),
  },
  casel: {
    flexDirection: 'row',
    marginBottom: RH(1),
    width: RW(90),
    marginLeft: RW(5),
  },
});