import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {APIS} from "../../constants/env"
export function coursesApi(page, text, token) {
   let url = APIS.API_URL_UNMANAGE + 'colorme.vn/manageapi/v3/v2/course/get-all?page=' + page + '&search=' + text + '&token=' + token;
   return axios.get(url);
};