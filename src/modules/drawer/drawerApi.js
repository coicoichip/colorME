import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { APIS } from "../../constants/env"
export async function getProfileApi() {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.API_URL_UNMANAGE + 'colorme.vn/manageapi/v3/profile?token=' + value;
    })
    return axios.get(url);
};