import {APIS} from '../../constants';
import axios from 'axios';
import { Alert, AsyncStorage } from "react-native"


export function getTestApi() {
    let url = APIS.API_COLOR_ME + '/exam';
    return axios.get(url);
};
export function getTestDetailApi(id) {
    let url = APIS.API_COLOR_ME + '/exam/' + id +  '/detail';
    console.log(url);
    return axios.get(url);
};
export function postTestDetailApi(id, data,user) {
    let url = APIS.API_COLOR_ME + '/exam/' + id +  '/store';
            return axios.post(url, {
                data : JSON.stringify(data),
                email : user.email,
                name : user.name,
                phone : user.phone
})
}