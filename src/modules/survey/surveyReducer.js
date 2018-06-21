import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function surveyReducer(state = initialState.survey, action) {
    switch (action.type) {
        case types.BEGIN_GET_SURVEY:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.GET_SURVEY_SUCCESS:
            return {
                ...state,
                ...{
                    surveys: action.surveys,
                    isLoading: false,
                }
            };
        case types.BEGIN_GET_MORE_SURVEY:
            return {
                ...state,
                ...{
                    isLoadingMoreSurvey: true,
                }
            };
        case types.GET_MORE_SURVEY_SUCCESS:
            return {
                ...state,
                ...{
                    surveys: [...state.surveys,...action.surveys],
                    isLoadingMoreSurvey: false,
                }
            };
        case types.BEGIN_REFRESH_SURVEY :
            return {
                ...state,
                ...{
                    isRefreshingSurvey : true
                }
            };
        case types.REFRESH_SURVEY_ERROR :
            return {
                ...state,
                ...{
                    isRefreshingSurvey : false
                }
            };
        case types.REFRESH_SURVEY_SUCCESS: {
            let array1 = state.surveys;
            let array2 = action.surveys;
            let array3 = [];
            for (let i = 0; i < 21; i++) {
                if (array2[i].id !== array1[i].id) {
                    array3.push(array2[i]);
                }
            }
            return {
                ...state,
                ...{
                    isRefreshingSurvey: false,
                    surveys: [...array3, ...state.surveys]
                }
            }
        }
        case types.BEGIN_GET_SURVEY_QUESTION:
            return {
                ...state,
                ...{
                    isLoadingQuestion: true,
                }
            };
        case types.GET_SURVEY_QUESTION_SUCCESS:
            return {
                ...state,
                ...{
                    questions: action.questions,
                    lesson: action.lesson,
                    isLoadingQuestion: false,
                }
            };
        case types.BEGIN_ANSWER_SURVEY_QUESTION:
            return {
                ...state,
                ...{
                    isLoadingAnswer: true,
                    statusAnswer: action.statusAnswer
                }
            };
        case types.ANSWER_SURVEY_QUESTION_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingAnswer: false,
                    statusAnswer: action.statusAnswer
                }
            };
        case types.BEGIN_CLOSE_SURVEY_LESSON:
            return {
                ...state,
                ...{
                    isLoadingCloseSurvey: true,
                }
            };
        case types.CLOSE_SURVEY_LESSON_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingCloseSurvey: false,
                }
            };
        case types.BEGIN_HISTORY_SURVEY:
            return {
                ...state,
                ...{
                    isLoadingHistorySurvey: true,
                }
            };
        case types.HISTORY_SURVEY_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingHistorySurvey: false,
                    historySurvey: action.historySurvey,
                }
            };
        case types.BEGIN_GET_MORE_HISTORY_SURVEY:
            return {
                ...state,
                ...{
                    isLoadingMoreHistorySurvey: true,
                }
            };
        case types.GET_MORE_HISTORY_SURVEY_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingMoreHistorySurvey: false,
                    historySurvey: [...state.historySurvey, ...action.historySurvey],
                }
            };
        case types.BEGIN_REFRESH_HISTORY_SURVEY :
            return {
                ...state,
                ...{
                    isRefreshingHistorySurvey : true
                }
            };
        case types.REFRESH_HISTORY_SURVEY_ERROR :
            return {
                ...state,
                ...{
                    isRefreshingHistorySurvey : false
                }
            };
        case types.REFRESH_HISTORY_SURVEY_SUCCESS: {
            let array1 = state.historySurvey;
            let array2 = action.historySurvey;
            let array3 = [];
            for (let i = 0; i < 20; i++) {
                if (array2[i].id !== array1[i].id) {
                    array3.push(array2[i]);
                }
            }
            return {
                ...state,
                ...{
                    isRefreshingHistorySurvey: false,
                    historySurvey: [...array3, ...state.historySurvey]
                }
            }
        }
        default:
            return state
    }
}