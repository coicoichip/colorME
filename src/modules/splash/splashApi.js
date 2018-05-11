import { APIS } from '../../constants'
import axios from 'axios';

export function refreshTokenApi(oldToken) {
    let url = APIS.COLOR_ME + '/refresh-token?token=' + oldToken;
    return axios.get(url);
}
