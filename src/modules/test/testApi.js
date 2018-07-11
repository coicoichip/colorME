import {APIS} from '../../constants';
import axios from 'axios';
import { Alert, AsyncStorage } from "react-native"


export function getTestApi() {
    let url = APIS.API_COLOR_ME + '/exam';
    return axios.get(url);
};
export function getTestDetailApi(id) {
    let url = APIS.API_COLOR_ME + '/exam/' + id +  '/detail';
    return axios.get(url);
};
export function postTestDetailApi(id) {
    let url = APIS.API_COLOR_ME + '/exam/' + id +  '/store';
    return axios.post(url);
};