import { APIS } from '../../constants'
import axios from 'axios';

export function register(register) {
    let url = APIS.COLOR_ME + '/user';
    return axios.post(url, {
        name: register.name,
        email: register.email,
        username: register.username,
        password: register.password,
    });
}
