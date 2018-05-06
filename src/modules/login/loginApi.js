import * as env from '../../constants/env';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {APIS} from "../../constants/env"
export function loginApi(login) {
   let url = APIS.COLOR_ME + "/login"
    return axios.post(url, {
        email: login.email,
        password: login.password,
    }) 
};

