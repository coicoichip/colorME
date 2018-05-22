import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { APIS } from "../../constants/env"
export async function notificationApi(page) {
    let url = " ";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.API_URL + 'colorme.vn/notification/list?page=' + page + "&token=" + value;
    })
    return axios.get(url);
};