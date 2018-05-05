import {APIS} from '../../constants'
 
export function register(name, email, username, password) {
    let url = APIS.colorme + '/user';
    return axios.post(url,{
        name : name,
        email : email,
        username : username,
        password : password,
    });
}
