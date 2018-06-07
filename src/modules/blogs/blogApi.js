import axios from 'axios';
import {APIS} from "../../constants/env";

export function blogApi(kind, page, tag) {
   let url = APIS.COLOR_ME_API + "/blog?kind=" + kind + "&page=" + page + "&tag="+tag
    return axios.get(url)   
};

export function detailBlogApi(slug){
    let url = APIS.COLOR_ME_API + "/blog/" + slug
    return axios.get(url);   
}

export function checkAttendanceApi(token){
    let url = APIS.COLOR_ME + "/user-current-study-class?token=" + token;
    console.log(url)
    return axios.get(url);   
}

export function  attendanceApi(class_id, class_lesson_id, mac_wifi, token){
    let url = APIS.COLOR_ME + "/user-current-study-class?token=" + token;
    console.log(url)
    return axios.post(url, {
        class_id : class_id, class_lesson_id : class_lesson_id, mac_wifi:mac_wifi
    });   
}