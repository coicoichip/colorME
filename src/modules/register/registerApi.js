import * as env from '../../constants/env';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export async function register(register) {
    let url = ''
    await AsyncStorage.getItem('url').then((value) => {
        url = env.API_NON_TOKEN + value + '/user'
    })
    return axios.post(url,{
        name : register.name,
        email : register.email,
        username: register.username,
        password: register.password,
    });
}