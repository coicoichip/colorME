import * as env from '../../constants/env';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export async function getBlogsApi(page, text) {
    let url = ''
    await AsyncStorage.getItem('url').then((value) => {
        url = env.API_URL + value + '/blogs?page=' + page + '&search=' + text;
    })
    console.log(url);
    return axios.get(url);
}

export async function detailBlogApi(id) {
    let url = ''
    await AsyncStorage.getItem('url').then((value) => {
        url = env.API_URL + value + '/api/blog/' + id;
    })
    console.log(url);
    return axios.get(url);
}