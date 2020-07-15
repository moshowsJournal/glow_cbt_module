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
  import {PostRequestWithTokenHandler} from '../components/HandlerFunctions';
  import {endPoint} from '../components/baseapi';
  // import axios from 'axios';
  // import Snackbar from 'react-native-snackbar';
  // import {endPoint} from '../components/baseapi';



export const CreateAssessment = () => {
  const [assessment, setAssessment] = useState({
    'title' : '',
    'subject' : '',
    'class' : '',
    'category' : '',
    'term' : '',
    'year' : '',
    'percentage' : '',
    'duration' : ''
  });
  
  const [subjects,setSubjects] = useState([]);
  const [classes,setStudClasses] = useState([]);
  const [school_id,setSchoolId] = useState('');
  const [is_successful, setSuccessful] = useState(false); 
  const [is_processing,setProcessing] = useState(false);
    useEffect(()=>{
        //save the login response into async storage
        GetAsyncStorageHandler().then(res => {
          setSubjects(res.user.classesAndSubjects);
          setStudClasses(res.user.formTeacherOfTheseClasses);
          setSchoolId(res.user.school);
        }).catch(error => {
          console.log(error);
        });;
        
        
    },[

    ]);
    return(
      
      <KeyboardAwareScrollView>
      <TopBarI name={'Create Assessment'} />
        
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
                    height: RH(100)
                  }}>
        
                <View style={styles.case}>
                  <TextInput
                      style={styles.textinput}
                      placeholder="Title"
                      onChangeText={(value)=>setAssessment({...assessment,title:value})}
                  />
                </View>
                
                <View style={styles.case}>
                    <Picker
                        mode="dropdown"
                        style={styles.textinput}
                        selectedValue={assessment.subject}
                        onValueChange={(value)=>setAssessment({...assessment,subject:value})} 
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
                        selectedValue={assessment.class}
                        onValueChange={(value)=>setAssessment({...assessment,class:value})}
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
                      onChangeText={(value)=>setAssessment({...assessment,category:value})}
                  />
                </View>
                <View style={styles.case}>
                  <TextInput
                      style={styles.textinput}
                      placeholder="Term"
                      onChangeText={(value)=>setAssessment({...assessment,term:value})}
                  />
                </View>
                <View style={styles.case}>
                  <TextInput
                      style={styles.textinput}
                      placeholder="Year"
                      onChangeText={(value)=>setAssessment({...assessment,year:value})}
                  />
                </View>
                <View style={styles.case}>
                  <TextInput
                      style={styles.textinput}
                      placeholder="Percentage"
                      onChangeText={(value)=>setAssessment({...assessment,percentage:value})}
                  />
                </View>
                
                <View style={styles.case}>
                  <TextInput
                      style={styles.textinput}
                      placeholder="Duration in Minutes"
                      onChangeText={(value)=>setAssessment({...assessment,duration:value})}
                  />
                </View>
                <TouchableOpacity style={{marginTop:20}}
                        onPress={()=>{
                            console.log(assessment);
                            for(let value of Object.values(assessment)){
                                if(value.trim() === ''){
                                    alert('Fields can not be empty');
                                    return false;
                                }
                            }
                           // setProcessing(true);
                            PostRequestWithTokenHandler(`${endPoint}/api/v1/schools/${school_id}/assessments`,assessment).then((res)=>{
                                setProcessing(false);
                                console.log(res);
                                if(response.status === 201){
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