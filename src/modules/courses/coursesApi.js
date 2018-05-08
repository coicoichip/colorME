import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {APIS} from "../../constants/env"
export function getCoursesApi(page, text, token) {
   let url = APIS.API_URL_UNMANAGE + 'colorme.vn/manageapi/v3/v2/course/get-all?page=' + page + '&search=' + text + '&token=' + token;
   return axios.get(url);
};
export function getCourseInformationApi(linkId) {
    let url = APIS.API_URL_UNMANAGE+ "api.colorme.vn/v2/course/get-detailed/"+ linkId;
    return axios.get(url);
}

export function learnRegisterApi(class_id, token) {
    let url = APIS.API_URL_UNMANAGE+ "api.colorme.vn//class/" + class_id + "/enroll?token=" + token;
    return axios.post(url);
}
