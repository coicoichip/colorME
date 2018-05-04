import * as env from '../../constants/env';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


export async function getBasesApi(page, token) {
    let url = '';
    await AsyncStorage.getItem('url').then((value) => {
        url = env.API_URL + value + "/v2/base?page=" + page + "&token=" + token;
    });
    console.log(url);
    return axios.get(url);
}

export  function getAllProvincesApi(token) {
    // let url = ''
    // await AsyncStorage.getItem('url').then((value) => {
    //     url = env.API_URL + value + "/v2/base?page=" + page + "&token=" + token;
    // })
    let url = "http://api.colorme.vn/v2/base/provinces?token=" + token;
    console.log(url);
    return axios.get(url);

}
