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
  import DateTimePickerModal from "react-native-modal-datetime-picker";
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
    'duration' : '',
    'start_time' : '',
    'start_date' : '',
    'end_time' : '',
    'end_date' : ''
  });
  
  let [subjects,setSubjects] = useState([]);
  let [classes,setStudClasses] = useState([]);
  let [school_id,setSchoolId] = useState('');
  let [is_successful, setSuccessful] = useState(false); 
  let [is_processing,setProcessing] = useState(false);
  let [mode, setMode] = useState(mode);
  let [is_visible, setVisible] = useState(false); 
  let [picker_selected,setPickerSelected] = useState('');
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
                    height: RH(140)
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
                  <TouchableOpacity
                  onPress={()=>{
                    setMode('date');
                    setVisible(true);
                    setPickerSelected('start_date');
                  }}
                  >
                  <Text style={styles.datetimepicker}>{assessment.start_date.trim() === '' ? 'Pick Start Date' :
                   assessment.start_date}</Text>
                  </TouchableOpacity>
                
                </View>
                <View style={styles.case}>
                  <TouchableOpacity
                  onPress={()=>{
                    setMode('time');
                    setVisible(true);
                    setPickerSelected('start_time');
                  }}
                  >
                  <Text style={styles.datetimepicker}>{assessment.start_time.trim() === '' ? 'Pick Start Time' :
                   assessment.start_time}</Text>
                  </TouchableOpacity>
                
                </View>

                <View style={styles.case}>
                  <TouchableOpacity
                  onPress={()=>{
                    setMode('date');
                    setVisible(true);
                    setPickerSelected('end_date');
                  }}
                  >
                  <Text style={styles.datetimepicker}>
                  {assessment.end_date.trim() === '' ? 'Pick End Date' :
                   assessment.end_date}
                  </Text>
                  </TouchableOpacity>
                
                </View>
                <View style={styles.case}>
                  <TouchableOpacity
                  onPress={()=>{
                    setMode('time');
                    setVisible(true);
                    setPickerSelected('end_time');
                  }}
                  >
                  <Text style={styles.datetimepicker}>{assessment.end_time.trim() === '' ? 'Pick End Time' :
                   assessment.end_time}</Text>
                  </TouchableOpacity>
                
                </View>
                <DateTimePickerModal
        isVisible={is_visible}
        mode={mode}
        onConfirm={(value)=>{
          if(mode === 'time' && picker_selected === 'start_time'){
            setAssessment({...assessment,start_time : value.toTimeString().split(' (')[0]});
          }if(mode === 'date' && picker_selected === 'start_date'){
            setAssessment({...assessment,start_date:value.toDateString()});
          }
          if(mode === 'time' && picker_selected === 'end_time'){
            setAssessment({...assessment,end_time:value.toTimeString().split(' (')[0]});
          }if(mode === 'date' && picker_selected === 'end_date'){
            setAssessment({...assessment,end_date:value.toDateString()});
          }
          setPickerSelected('');
          setVisible(false);
        }}
        onCancel={()=>{
          setVisible(false);
        }}
      />
                <View style={styles.case}>
                  <TextInput
                      style={styles.textinput}
                      placeholder="Duration in Minutes"
                      onChangeText={(value)=>setAssessment({...assessment,duration:value})}
                  />
                </View>
                <TouchableOpacity style={{marginTop:20}}
                disabled={is_processing}

                        onPress={()=>{
                            
                            for(let value of Object.values(assessment)){
                                if(value.trim() === ''){
                                    alert('Fields can not be empty');
                                    return false;
                                }
                            }
                            let data = {...assessment,startDate:`${assessment.start_date} ${assessment.start_time}`,
                            endDate:`${assessment.end_date} ${assessment.end_time}`,questions:[]}
                            console.log(data); 
                           // setProcessing(true);
                            PostRequestWithTokenHandler(`${endPoint}/api/v1/schools/${school_id}/assessments`,assessment).then((res)=>{
                                setProcessing(false);
                                console.log(res);
                                if(response.status === 'success'){
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
  datetimepicker: {
    width: RW(75),
    height: RH(6),
    borderRadius: 50,
    borderColor: '#00921B',
    paddingLeft: 28,
    paddingTop:10,
    marginTop: RH(5),
    backgroundColor: '#F8F8F8',
    color:'grey'
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