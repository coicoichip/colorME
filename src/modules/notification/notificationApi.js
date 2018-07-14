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
export async function getTopicApi(id) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.COLOR_ME + "/topic/" + id + '?token='+ value;
    })
    return axios.get(url);
}
export async function getProductsInTopic(id, page) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.COLOR_ME + "/topic/" + id + '/products?token='+ value + "&page="+page;
    })
    console.log(url)
    return axios.get(url);
}
