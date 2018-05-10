import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {APIS} from "../../constants/env"
export function notificationApi(page, token) {
   let url = APIS.API_URL + 'colorme.vn/notification/list?page=' + page + "&token=" + token;
   return axios.get(url);
};