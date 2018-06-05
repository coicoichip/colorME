import axios from 'axios';
import {APIS} from "../../constants/env";
import {AsyncStorage} from "react-native"
export function blogApi(kind, page, tag) {
   let url = APIS.COLOR_ME_API + "/blog?kind=" + kind + "&page=" + page + "&tag="+tag
    return axios.get(url)   
};

export function detailBlogApi(slug){
    let url = APIS.COLOR_ME_API + "/blog/" + slug
    return axios.get(url);   
}

export async function checkAttendanceApi(){
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.COLOR_ME + "/user-current-study-class?token=" + value;
    })
    console.log(url)
    return axios.get(url);   
}

export async function  attendanceApi(class_id, class_lesson_id, mac_wifi){
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.COLOR_ME + "/student-attendance?token=" + value;
    })
    console.log(url)
    return axios.post(url, {
        class_id : class_id, class_lesson_id : class_lesson_id, mac_wifi:mac_wifi
    });   
}