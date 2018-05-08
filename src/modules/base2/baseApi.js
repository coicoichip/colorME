import axios from 'axios';
import {APIS} from "../../constants/env"
export function getBasesApi() {
    let url = APIS.COLOR_ME + '/v2/base';
    return axios.get(url);
};