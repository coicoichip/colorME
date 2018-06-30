import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { APIS } from "../../constants/env"
export async function notificationApi(page) {
    let url = " ";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url =  APIS.COLOR_ME_API1 + "/notifications" + "?token=" + value + "&page=" + page;
    })
    console.log(url);
    return axios.get(url);
};