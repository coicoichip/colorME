import * as surveyApi from './surveyApi';
import * as types from '../../constants/actionTypes';
// import * as homeApi from "../Home/homeApi";
import { Alert, AsyncStorage } from "react-native"

export function getDataSurvey(page) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_SURVEY,
        });
        surveyApi.surveyApi(1)
            .then(function (res) {
                dispatch({
                    type: types.GET_SURVEY_SUCCESS,
                    surveys: res.data.surveys
                });
                console.log(res.data)
            })
            .catch(function (error) {
               throw (error);
            });
    }
}

export function getMoreDataSurvey(page) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_MORE_SURVEY,
        });
        surveyApi.surveyApi(page)
            .then(function (res) {
                dispatch({
                    type: types.GET_MORE_SURVEY_SUCCESS,
                    surveys: res.data.surveys
                });
            })
            .catch(function (error) {
               throw (error);
            });
    }
}

export function refreshDataSurvey() {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_REFRESH_SURVEY
        });
        surveyApi.surveyApi(1)
            .then(function (res) {
                dispatch({
                    type: types.REFRESH_SURVEY_SUCCESS,
                    surveys: res.data.surveys,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: types.REFRESH_SURVEY_ERROR,
                })
            });
    }
}

export function getDataSurveyQuestion(id) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_SURVEY_QUESTION,
        });
        surveyApi.surveyQuestionApi(id)
            .then(function (res) {
                dispatch({
                    type: types.GET_SURVEY_QUESTION_SUCCESS,
                    questions: res.data.data.survey,
                    lesson: res.data.data.user_lesson_survey,
                });
                console.log(res.data.data.user_lesson_survey)
            })
            .catch(function (error) {
               throw (error);
            });
    }
}

export function sentAnswerSurveyQuestion(id_question, id_lesson, answer) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_ANSWER_SURVEY_QUESTION,
        });
        surveyApi.surveyAnswerQuestionApi(id_question, id_lesson, answer)
            .then(function (res) {
                dispatch({
                    type: types.ANSWER_SURVEY_QUESTION_SUCCESS,
                    statusAnswer: res.status
                });
                console.log(res.status)
            })
            .catch(function (error) {
                throw (error);
            });
    }
}

export function closeSurveyLesson(id_lesson ) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_CLOSE_SURVEY_LESSON,
        });
        surveyApi.closeSurveyLessonApi(id_lesson )
            .then(function (res) {
                dispatch({
                    type: types.CLOSE_SURVEY_LESSON_SUCCESS,
                });
            })
            .catch(function (error) {
                throw (error);
           });

    }
}

export function getHistorySurvey(page) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_HISTORY_SURVEY,
        });
        surveyApi.getHistorySurvey(page)
            .then(function (res) {
                dispatch({
                    type: types.HISTORY_SURVEY_SUCCESS,
                    historySurvey: res.data.user_lesson_surveys
                });
            })
            .catch(function (error) {
                throw (error);
            });
    }
}

export function getMoreHistorySurvey(page) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_MORE_HISTORY_SURVEY,
        });
        surveyApi.getHistorySurvey(page)
            .then(function (res) {
                dispatch({
                    type: types.GET_MORE_HISTORY_SURVEY_SUCCESS,
                    historySurvey: res.data.user_lesson_surveys
                });
            })
            .catch(function (error) {
                throw (error);
            });
    }
}

export function refreshHistorySurvey() {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_REFRESH_HISTORY_SURVEY
        });
        // homeApi.listBlogApi(1)
        //     .then(function (res) {
        //         dispatch({
        //             type: types.REFRESH_HISTORY_SURVEY_SUCCESS,
        //             historySurvey: res.data.user_lesson_surveys,
        //         });
        //     })
        //     .catch(function (error) {
        //         dispatch({
        //             type: types.REFRESH_HISTORY_SURVEY_ERROR,
        //         })
        //     });
    }
}

