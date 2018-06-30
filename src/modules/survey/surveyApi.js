import {APIS} from '../../constants';
import axios from 'axios';
import { Alert, AsyncStorage } from "react-native"


export async function surveyApi(page) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.MANAGER_API + '/v2/survey?page=' + page + '&token=' + value;
    })
    
    console.log(url)
    return axios.get(url);
}

export async function surveyQuestionApi(surveyID) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.MANAGER_API + '/v2/survey/' + surveyID +'/user-lesson?token=' + value;
    })
    console.log(url)
    return axios.post(url);
}

export async function surveyAnswerQuestionApi(id_question, id_lesson , answer) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.MANAGER_API + '/v2/survey/question/' + id_question + '/user-lesson/' + id_lesson + '/answer?token=' + value;
    })
    console.log(url)
    return axios.post(url, {
        answer_content: answer
    });
}

export async function closeSurveyLessonApi(id_lesson) {
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.MANAGER_API + '/v2/survey/user-lesson-survey/' + id_lesson + '?token='  + value;
    })
    console.log(url)
    return axios.put(url);
}

export async function getHistorySurvey(page) {
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.MANAGER_API + '/v2/survey/history?page=' + page + '&token=' + value;
    })
    console.log(url)
    return axios.get(url);
}