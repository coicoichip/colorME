
import surveyReducer from '../modules/survey/surveyReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    survey  : surveyReducer,

});
export default rootReducer;