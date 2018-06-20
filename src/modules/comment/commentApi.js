import axios from 'axios';
import {APIS} from "../../constants/env";
import {AsyncStorage} from "react-native";

export async function getInfoAboutPostApi(product_id) {
    let url = APIS.API_DATA + "/products/" + product_id + "/content";
    return axios.get(url);
}
export async function getCommentOnePost(product_id) {
    let url = APIS.API_DATA + "/products/" + product_id + "/comments";
    console.log(url);
    return axios.get(url);
}
export async function postCommentOnePostApi(product_id, value){
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((token) => {
        url = APIS.COLOR_ME + "/product/" + product_id + "/comment?token=" + token;
    })
    console.log(url)
    return axios.post(url,{
        parent_id: value.parent_id,
        comment_content: value.comment_content,
    });   
}
export async function deleteCommentApi(product_id) {
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((token) => {
        url = APIS.COLOR_ME + "/comment/"+ product_id + "/delete?token=" + token;
    })
    console.log(url)
    return axios.post(url);
}
export async function likeCommentApi(comment_id){
    let url = "";
    await AsyncStorage.getItem('@ID').then((value)=> {
       url = APIS.API_DATA + '/comment/' + comment_id + '/like?user_id=' + value;
    })
    console.log(url);
    return axios.post(url);
}