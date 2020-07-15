import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {endPoint} from '../components/baseapi';
import axios from 'axios';
import moment from 'moment';

export const RulesHandler = async () => {

}

export const GetAsyncStorageHandler = async () =>{
    try{
        AsyncStorage.setItem('user',JSON.stringify(user_information))
        let response = await AsyncStorage.getItem('user');
        return JSON.parse(response).data;
    }catch(error){
        console.log(error);
    }
}

export const setExamTimer = async () => {
    try{

        let start_time = await AsyncStorage.getItem('start_time');
             let countDownDate = JSON.parse(start_time);
             console.log(countDownDate);
            //  // Get today's date and time
            let now = new Date().getTime();
            // Find the distance between now and the count down date
            let distance = countDownDate - now;
    
            //Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if(distance < 0){
               
                return '00:00:00';
            }
            return `${hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:${minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:${seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})}`;
    }catch(err){
        console.log(err);
    }
}

export const PutOrGetAssessmentInAsyncStorage = async (data = null,action) => {
    try{
        console.log(action);
        if(action === 'put'){
            let res = await AsyncStorage.setItem('current_test',JSON.stringify(data));
            await AsyncStorage.removeItem('current_score'); //clear previous score if exists.
            await AsyncStorage.setItem('start_time',JSON.stringify(moment(new Date()).add(30, 'm').toDate().getTime()));
            return data;
        }
        let res = await AsyncStorage.getItem('current_test');
        console.log(JSON.parse(res));
        return res;
    }catch(error){
        console.log(error);
    }
}

export const PostRequestWithTokenHandler = async (url,data) =>{
    try{    
        const user_information = await AsyncStorage.getItem('user');
        console.log(url);
        if(data === 'From Async'){
            //then lets get our data from async
            let assessment = await AsyncStorage.getItem('current_test');
            assessment = JSON.parse(assessment);
            console.log(assessment);
            let score = await AsyncStorage.getItem('current_score');
            score = JSON.parse(score);
            console.log(score);
            
            data = {
                "subject": assessment.subject,
        "class": assessment.class,
        "category": assessment.category,
        "term": assessment.term,
        "year": assessment.year,
        "score": score,
        "student": JSON.parse(user_information).data.user._id,
        "isCA": assessment.isCA
            }
            console.log(data);

        }
        const res = await axios.post(url, data,{
            headers:{
                Authorization : `Bearer ${JSON.parse(user_information).token}`,
                'Content-Type' : 'application/json'
            }
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
}

export const GetResquestWithTokenHandler = async (url) => {
    try{

        const user_information = await AsyncStorage.getItem('user');
        console.log(`${JSON.parse(user_information).token}`);
        console.log(url);
        const res = await axios.get(url,{
            headers:{
                Authorization : `Bearer ${JSON.parse(user_information).token}`,
                'Content-Type' : 'application/json'
            }
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
}

export const GradeAnswerHandler = async (data) => {
    try{
        let score = await AsyncStorage.getItem(`current_score`); 
        if(score === null){
            score = 0;
        }else{
            score = JSON.parse(score);
        }   
        console.log(data);
        console.log(data.selected_option);
        console.log(data.answer);
        if(data.selected_option.toUpperCase() === data.answer.toUpperCase()){
           score =  score + data.points;
        }
        console.log(score);
        AsyncStorage.setItem(`current_score`,JSON.stringify(score));
        return data;
    }catch(error){
        console.log(error);
    }
}

export const PutResquestWithTokenHandler = async (url,data) => {
    try{

        const user_information = await AsyncStorage.getItem('user');
        console.log(`${JSON.parse(user_information).token}`);
        console.log(url);
        const res = await axios.patch(url,data,{
            headers:{
                Authorization : `Bearer ${JSON.parse(user_information).token}`,
                'Content-Type' : 'application/json'
            }
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
}

const user_information = {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDM4MjU2ZmY1YWQyMGU2MDI5NGI2YSIsImNhdGVnb3J5IjoiU3RhZmYiLCJpYXQiOjE1OTQ3NzQxNDUsImV4cCI6MTYwMjU1MDE0NX0.TZ2TdRsW5QRLTG4yyrbQW_IhDd2-ZnquPvw5lT2aunU",
    "data": {
        "user": {
            "role": "School-Administrator",
            "category": "Staff",
            "isVerified": true,
            "_id": "5f038256ff5ad20e60294b6a",
            "classesAndSubjects": [
                {
                    "_id": "5f0962d4ec6f4c13bc63aa20",
                    "classroom": "Senior Secondary School Two",
                    "subject": "Yoruba Language",
                    "classId": "5f03871a69b46e1e2cddc2f0"
                },
                {
                    "_id": "5f0962d4ec6f4c13bc63aa21",
                    "classroom": "Senior Secondary School Two",
                    "subject": "Biology",
                    "classId": "5f03871a69b46e1e2cddc2f0"
                },
                {
                    "_id": "5f0962d4ec6f4c13bc63aa22",
                    "classroom": "Senior Secondary School Three",
                    "subject": "Biology",
                    "classId": "5f09599a568675a6fc0953d2"
                }
            ],
            "formTeacherOfTheseClasses": [
                {
                    "_id": "5f0962d4ec6f4c13bc63aa23",
                    "classroom": "Senior Secondary School Two",
                    "classId": "5f03871a69b46e1e2cddc2f0"
                },
                {
                    "_id": "5f0962d4ec6f4c13bc63aa24",
                    "classroom": "Senior Secondary School Three",
                    "classId": "5f09599a568675a6fc0953d2"
                }
            ],
            "fullname": "Moses Godswill Eze",
            "email": "moseseze@aol.com",
            "username": "moseseze80",
            "phoneNumber": "+2347074018341",
            "gender": "male",
            "password": "$2a$12$Bz9a0ltzhzusuiEAAhIruOL19dLrvOeXaBCKvktRxQGsy5n/uMMuu",
            "school": "5ecb08dfd2595416f0dc9978",
            "__v": 0,
            "photo": "1K6ljGJsJF8QNGwf5N-d0imRPmo_uCdqr",
            "photoUrl": "https://drive.google.com/uc?id=1K6ljGJsJF8QNGwf5N-d0imRPmo_uCdqr"
        }
    }
}

// const student_information = {
//     "status": "success",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDM4MzU3ZmY1YWQyMGU2MDI5NGM5YyIsImNhdGVnb3J5IjoiU3R1ZGVudCIsImlhdCI6MTU5NDgwMzk0NywiZXhwIjoxNjAyNTc5OTQ3fQ.GCFcGh_22qYau8Jd0-48V84jWOY-SleyqTzt10Atby4",
//     "data": {
//         "user": {
//             "subjects": [
//                 "Mathematics",
//                 "Biology",
//                 "Yoruba Language",
//                 "Igbo Language",
//                 "Basic Technology",
//                 "Accounting",
//                 "Basic Science",
//                 "Geography",
//                 "Physics",
//                 "English"
//             ],
//             "role": "Student",
//             "category": "Student",
//             "parents": [],
//             "stapents": [],
//             "siblings": [],
//             "isVerified": true,
//             "_id": "5f038357ff5ad20e60294c9c",
//             "fullname": "Lawrence Yemi Okeke",
//             "email": "lawrenceayantola@gmail.com",
//             "username": "lawrenceayantola84",
//             "phoneNumber": "+2349074018341",
//             "dateOfBirth": "2003-09-22T23:00:00.000Z",
//             "class": "Senior Secondary School Two",
//             "classId": "5f03871a69b46e1e2cddc2f0",
//             "password": "$2a$12$HC2sgzWRWY3WV3GRA5aIueQQo9ntN4I7Ig0gCzux5e1CkPa83VPIi",
//             "gender": "female",
//             "school": "5ecb08dfd2595416f0dc9978",
//             "studyTimetable": "5ed3d0094f59050e5097861d",
//             "age": 16,
//             "__v": 0,
//             "bookshelf": "5f0383c8ff5ad20e60294cf8",
//             "photo": "10Be65NjIYGuDFRxWu4715nWyQwz2kInL",
//             "photoUrl": "https://drive.google.com/uc?id=10Be65NjIYGuDFRxWu4715nWyQwz2kInL",
//             "passwordChangedAt": "2020-07-08T12:14:33.635Z"
//         }
//     }
// }