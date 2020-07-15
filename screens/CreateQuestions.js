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
  import AsyncStorage from '@react-native-community/async-storage';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import Success from '../components/success';
  import {endPoint} from '../components/baseapi';
  import {GetAsyncStorageHandler, PostRequestWithTokenHandler} from '../components/HandlerFunctions';


export const CreateQuestions = () => {
  const [question, setQuestion] = useState({
    'question' : '',
    'subject' : '',
    'class' : '',
    'category' : '',
    'option_a' : '',
    'option_b' : '',
    'option_c' : '',
    'option_d' : '',
    'answer' : '',
    'points' : ''
  });
  const [subjects,setSubjects] = useState([]);
  const [classes,setStudClasses] = useState([]);
  const [school_id,setSchoolId] = useState('');
  const [is_processing,setProcessing] = useState(false);
  const [is_successful,setSuccessful] = useState(false);
    useEffect(()=>{
        //save the login response into async storage
        GetAsyncStorageHandler().then(res =>{
            setSubjects(res.user.classesAndSubjects);
            setStudClasses(res.user.formTeacherOfTheseClasses);
            setSchoolId(res.user.school);
        });
        
        
    },[

    ]);
    return(
      <KeyboardAwareScrollView>
      <TopBarI name={'Create Questions'} />

      {
        is_successful === true && <Success name="Success" button={true}/>
      }

      {
          is_successful === false && (

            <View
            style={{
              marginLeft: RW(5),
              backgroundColor: '#FFFFFF',
              width: RW(115),
              padding: 8,
              borderRadius: 10,
              marginTop: RH(2),
              height: RH(125)
            }}>
  
                <View style={styles.case}>
                    <TextInput
                        style={styles.textarea}
                        multiline = {true}
                        numberOfLines = {4}
                        placeholder="Enter Question"
                        onChangeText={(value)=>setQuestion({...question,question:value})}
                    />
                </View>
                
                <View style={styles.case}>
                    <Picker
                        mode="dropdown"
                        style={styles.textinput}
                        selectedValue={question.subject}
                        onValueChange={(value)=>setQuestion({...question,subject:value})} 
                    >
                        <Picker.Item label="Select Subject" value="" />
                        {
                            subjects.map((stud,index)=>{
                                return(
                                    <Picker.Item label={stud.subject} 
                                    value={stud.subject}
                                    key={index}
                                />)
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.case}>
                    <Picker
                        mode="dropdown"
                        style={styles.textinput}
                        selectedValue={question.class}
                        onValueChange={(value)=>setQuestion({...question,class:value})}
                    >
                        <Picker.Item label="Select Class" value="" />
                        {
                            classes.map((stud_class,index)=>{
                                return(
                                    <Picker.Item 
                                        label={stud_class.classroom} 
                                        value={stud_class.classroom} 
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.case}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Category"
                        onChangeText={(value)=>setQuestion({...question,category:value})}
                    />
                </View>
                <View style={styles.case}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Option A"
                        onChangeText={(value)=>setQuestion({...question,option_a:value})}
                    />
                </View>
                <View style={styles.case}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Option B"
                        onChangeText={(value)=>setQuestion({...question,option_b:value})}
                    />
                </View>
                <View style={styles.case}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Option C"
                        onChangeText={(value)=>setQuestion({...question,option_c:value})}
                    />
                </View>
                
                <View style={styles.case}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Option D"
                        onChangeText={(value)=>setQuestion({...question,option_d:value})}
                    />
                </View>
                
                <View style={styles.case}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Points"
                        onChangeText={(value)=>setQuestion({...question,points:value})}
                    />
                </View>
                <View style={styles.case}>
                    <Picker
                        mode="dropdown"
                        style={styles.textinput}
                        selectedValue={question.answer}
                        onValueChange={(value)=>setQuestion({...question,answer:value})}
                    >
                        <Picker.Item label="Select Answer" value="" />
                        <Picker.Item label="A" value="A" />
                        <Picker.Item label="B" value="B" />
                        <Picker.Item label="C" value="C" />
                        <Picker.Item label="D" value="D" />
                    </Picker>
                </View>
            
                    <TouchableOpacity style={{marginTop:20}}
                        onPress={()=>{
                            for(let value of Object.values(question)){
                                if(value.trim() === ''){
                                    alert('Fields can not be empty');
                                    return false;
                                }
                            }
                            setProcessing(true);
                            let data = {
                                "subject": question.subject,
                                "class": question.class,
                                "category": question.category,
                                "question": question.question,
                                "options": {
                                    "a": question.option_a,
                                    "b": question.option_b,
                                    "c": question.option_c,
                                    "d": question.option_d
                                },
                                "answer": question.answer,
                                "points": question.points
                            }
                            PostRequestWithTokenHandler(`${endPoint}/api/v1/schools/${school_id}/questions`,data).then((res)=>{
                                setProcessing(false);
                                //console.log(res);
                                if(res.status === 201){
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
                                {is_processing ? 'Please Wait ...' : 'Save'}
                        </Text>
                        </View>
                </TouchableOpacity>
          </View>

          )
      }
        
    </KeyboardAwareScrollView>
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
  textarea: {
    width: RW(75),
    height: RH(10),
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