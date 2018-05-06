import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export async function loginApi(login) {
    await AsyncStorage.getItem('url').then((value) => {
        url = env.API_URL + value + '/login';
        console.log(url)
    })
    return axios.post(url, {
        email: login.email,
        password: login.password,
    }) 
};

