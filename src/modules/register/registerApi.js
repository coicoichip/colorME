import { APIS } from '../../constants'
import axios from 'axios';

export function register(register) {
    let url = APIS.SERVER_TEST + '/user';
    return axios.post(url, {
        name: register.name,
        email: register.email,
        username: register.username,
        password: register.password,
    });
}
