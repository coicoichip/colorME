import * as env from '../../constants/env';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


export async function getBasesApi() {
    let url = '';
    await AsyncStorage.getItem('url').then((value) => {
        url = env.API_NON_TOKEN + value + "/v2/base";
    });
    console.log(url);
    return axios.get(url);
}