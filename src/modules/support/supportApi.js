import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { APIS } from "../../constants/env"
export function supportApi(value) {
    let url = APIS.API_URL_UNMANAGE + 'colorme.vn/api/v3' + '/report-by-email';
    return axios.post(url, {
        name: value.name,
        email: value.email,
        message: value.message,
        title: value.title,
    })
};
