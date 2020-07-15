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



export const QuestionsList = () => {
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
            GetResquestWithTokenHandler(`${endPoint}/api/v1/schools/5ecb08dfd2595416f0dc9978/questions`).then((res)=>{
                console.log(res);
                setQuestions(res.data.slice(0,20));
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
      <TopBarI name={'Questions'} />
        
      {
        is_successful === true && <Success name="Success" button={true}/>
      }
        {
          is_successful === false && (
              <View
                  style={{
                    marginLeft: RW(5),
                    backgroundColor: '#FFFFFF',
                    width: RW(90),
                    padding: 8,
                    borderRadius: 10,
                    marginTop: RH(2),
                    height: RH(70)
                  }}>
        
                <View style={styles.case}>
                    <Text
                        style={{marginTop:20}}
                    >Select Assessment to add questions to:</Text>
                </View>
                
                <View style={styles.case}>
                    <Picker
                        mode="dropdown"
                        style={styles.textinput}
                        selectedValue={assessment}
                        onValueChange={(value)=>setAssessment(value)} 
                    >
                        <Picker.Item label="Select Assessment" value="" />
                        {
                            assessments.map((assess,index)=>{
                                return(
                                    <Picker.Item label={assess.title} 
                                    value={`${assess._id}__${assess.category}`}
                                    key={index}
                                />)
                            })
                        }
                    </Picker>
                </View>
                        
                <ScrollView
                style={{
                    height:RW(50)
                }}
                >

                <View style={styles.case}>
                    <Text style={{fontWeight:'bold',marginTop:30,fontSize:20}}>Questions</Text>
                </View>
                

                {
                    questions.map((question,index)=>{
                        return(
                            <TouchableOpacity
                                style={{
                                    borderBottom:1,
                                    borderBottomColor:'grey',
                                    borderBottomWidth:1
                                }}
                                key={index}
                                onPress={()=>{
                                    if(selected_questions.includes(question._id)){
                                        setSelectedQues([...selected_questions.filter((x)=> x !== question._id)])
                                        return true;
                                    }
                                    return setSelectedQues([...selected_questions, question._id]);
                                }}
                            >
                                <View style={{padding:15}}>
                                    <Text
                                        style={{alignContent:'center',marginTop:30,fontSize:13,}}
                                    >{question.question}</Text>
                                </View>
                                {
                                    selected_questions.includes(question._id) && (
                                        <View style={{marginTop:4,marginLeft:30,marginBottom:5}}>
                                           <Text style={{fontWeight:'bold'}}>Selected</Text>
                                        </View>
                                    )
                                }
                            </TouchableOpacity>
                        )
                    })
                }
                </ScrollView>
                
                <TouchableOpacity style={{marginTop:20}}
                        onPress={()=>{
                            if(selected_questions.length === 0 || assessment.trim() === ''){
                                alert('Assessment and questions are required');
                                return false;
                            }
                            let data = {
                                "questions" : selected_questions,
                                "category" : assessment.split('__')[1]
                            }
                           setProcessing(true);
                           PutResquestWithTokenHandler(`${endPoint}/api/v1/schools/${school_id}/assessments/${assessment.split('__')[0]}`,data).then((res)=>{
                                setProcessing(false);
                                console.log(res);
                                if(res.status === 200){
                                    setSuccessful(true);
                                }
                                return setProcessing(false);
                            }).catch((error)=>{
                                console.log(error);
                            });
                            
                        }}
                    >
                        <View style={styles.box}>
                        <Text style={styles.h1}>
                                {is_processing ? 'Please Wait ...' : `Save (${selected_questions.length})`}
                        </Text>
                        </View>
                </TouchableOpacity>
              </View>

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
    marginLeft: RW(5),
  },
  casel: {
    flexDirection: 'row',
    marginBottom: RH(1),
    width: RW(90),
    marginBottom:13,
    marginLeft: RW(5),
  },
});