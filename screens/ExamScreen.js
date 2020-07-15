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
    Picker
  } from 'react-native';
  import {RH, RW, RF} from '../resize';
  import Button from '../components/button';
   import TopBarI from '../components/topBarI';
  // import Box3 from '../components/box3';
  import {ExamCompleted} from '../components/SuccessModal';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import {GetAsyncStorageHandler, setTimer} from '../components/HandlerFunctions';
  import {PostRequestWithTokenHandler,GetResquestWithTokenHandler,
    setExamTimer,PutOrGetAssessmentInAsyncStorage,GradeAnswerHandler} from '../components/HandlerFunctions';
  import {endPoint} from '../components/baseapi';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  // import axios from 'axios';
  // import Snackbar from 'react-native-snackbar';
  // import {endPoint} from '../components/baseapi';



export const ExamScreen = ({route,navigation}) => {
  //use thing to prevent hooks from getting first question everytime;
  let [is_first_time,setIsFirstTime] = useState(true);
 // let [assessment_id,setAssesment] = useState(route.params.assessment_id);
  let [questions,setQuestions] = useState([]);
  let [timer,setTimer] = useState('00:00:00');
  let [question,setQuestion] = useState('');
  let [options,setOptions] = useState([]);
  let [answer,setAnswer] = useState('');
  let [points,setPoints] = useState('');
  let [question_index,setQueIndex] = useState(0);
  let [selected_option,setSelectedOption] = useState('');
  let [is_completed,setCompleted] = useState(false);
  let [school_id,setSchool] = useState('');
  let [student_id,setStudent] = useState('');
    useEffect(()=>{
        //save the login response into async storage
        let stopwatch = setInterval(()=>{
            setExamTimer().then(timer=>{
                if(timer === '00:00:00'){
                    clearInterval(stopwatch);
                }
                if(timer === '00:00:00'){
                    PostRequestWithTokenHandler(`${endPoint}/api/v1/schools/${school_id}/student/${student_id}/assessment/results`,
                    'From Async')
                    .then(res => {
                        setCompleted(true);
                    }).catch(err => {
                        console.log()
                    });
                }
                return setTimer(timer);
            }).catch(err=>{
                console.log(error);
            });
        },3000);
        
        GetAsyncStorageHandler().then(res => {
            setStudent(res.user._id)
        }).catch(err=>{
            console.log(err);
        });


        if(is_first_time){
            PutOrGetAssessmentInAsyncStorage('','get').then(res => {
                console.log(res);
                let response = JSON.parse(res);
                setQuestions(response.questions);
                setSchool(response.school);
                setIsFirstTime(false);
                GetResquestWithTokenHandler(`${endPoint}/api/v1/schools/${response.school}/questions/${response.questions[0]}`)
                .then(res => {
                    if(res.status === 'success'){
                        console.log(res);
                        setQuestion(res.data.question);
                        setOptions(res.data.options);
                        setAnswer(res.data.answer);
                        setPoints(res.data.points);
                    }
                }).catch(error => {
                    console.log(error);
                });
            }).catch(err => {
                console.log(err);
            });
        }
    },[

    ]);
    return(
      
      <View>
      <TopBarI name={route.params.title} />
      {
          is_completed === true && (
              <ExamCompleted navigation={navigation} name="Test Completed" />
          )
      }
              {is_completed !== true && (
                  <View
                  style={{
                    marginLeft: RW(5),
                    backgroundColor: '#FFFFFF',
                    width: RW(90),
                    padding: 8,
                    borderRadius: 10,
                    marginTop: RH(2),
                    height: RH(100)
                  }}>
                      <View style={{marginTop:20,marginLeft:10,width:'100%'}}>
                          <Text style={{fontSize:17,fontWeight:'bold'}}>Time Remaining : {timer}</Text>
                      </View>
                    <View style={{paddingLeft:10,paddingTop:10}}>
                        <Text style={{fontWeight:'bold', fontSize:15,marginTop:25,marginBottom:10}}>
                            {question}
                        </Text>
                        
                        {
                            Object.values(options).map((option,index)=>{
                                return(
                    <TouchableOpacity style={{marginTop:5,padding:4,borderBottomWidth:1,borderBottomColor:'grey'}}
                    
                    key={index}
                    onPress={()=>setSelectedOption(`${Object.keys(options)[index].toUpperCase()}`)}
                    >
                        <Text style={{fontSize:15,marginTop:7}} >

                           {`${Object.keys(options)[index].toUpperCase()}.  ${option}`}
                        </Text>
                        {selected_option === Object.keys(options)[index].toUpperCase() && (
                            <Text style={{fontWeight:'bold'}}>selected</Text>
                        )}
                        </TouchableOpacity>
                                )
                            })
                        }



                    <TouchableOpacity
                    onPress={()=>{
                        setQueIndex(question_index+1);
                        //lets save answer and persists score
                        let data = {
                            answer,
                            selected_option,
                            points
                        }
                        console.log(data);
                        GradeAnswerHandler(data).then(res => {
                            setSelectedOption('');
                            if(questions[question_index] !== null){
                                PostRequestWithTokenHandler(`${endPoint}/api/v1/schools/${school_id}/student/${student_id}/assessment/results`,
                    'From Async')
                    .then(res => {
                       return setCompleted(true);
                    }).catch(err => {
                        console.log(error);
                    });
                            }
                            GetResquestWithTokenHandler(`${endPoint}/api/v1/schools/${school_id}/questions/${questions[question_index]}`)
                            .then(res => {
                                console.log('get me next question');
                                console.log(res);
                                if(res.status === 'success'){
                                     setQuestion(res.data.question);
                        setOptions(res.data.options);
                        setAnswer(res.data.answer);
                        setPoints(res.data.points);
                                }
                            }).catch(error => {
                                console.log(error);
                            }); 

                        }).catch(error => {
                            console.log(error);
                        });                      
                    }}
                    >
                        <View style={styles.box}>
                            <Text style={styles.h1}>Submit Answer</Text>
                        </View>
                    </TouchableOpacity>

                    </View>
                
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