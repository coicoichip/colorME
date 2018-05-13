import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {APIS} from "../../constants/env"
export async function getCoursesApi(page, text) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.API_URL_UNMANAGE + 'colorme.vn/manageapi/v3/v2/course/get-all?page=' + page + '&search=' + text + '&token=' + value;
    })
   return axios.get(url);
};
export function getCourseInformationApi(linkId, base) {
    let url = APIS.API_URL_UNMANAGE+ "colorme.vn/api/v3/v2/course/" + linkId + "/class?base_id=";
    return axios.get(url);
}

export async function learnRegisterApi(class_id) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
    let url = APIS.API_URL_UNMANAGE+ "api.colorme.vn//class/" + class_id + "/enroll?token=" + value;
    })
    return axios.post(url);
}
