/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {CreateAssessment} from './screens/Assessment';
import {CreateQuestions} from './screens/CreateQuestions';
import {QuestionsList} from './screens/QuestionsList';
import {StudentExamination} from './screens/StudentExaminations';
import { StartExam } from './screens/StartExam';
import {ExamScreen} from './screens/ExamScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      {/* <Stack.Screen name="Examination" 
      component={StudentExamination} 
         navigationOptions = {{visible : false}}
      />
        <Stack.Screen
          name="StartExam"
          component={StartExam}
          
        /> */}
        <Stack.Screen name="CreateAssessment" component={CreateAssessment} />
        <Stack.Screen name="ExamScreen" component={ExamScreen} />
        <Stack.Screen name="QuestionsList" component={QuestionsList} />
        <Stack.Screen name="CreateQuestions" component={CreateQuestions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createStackNavigator();
export default App;
