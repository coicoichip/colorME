import axios from 'axios';
import { APIS } from "../../constants/env";
import { AsyncStorage } from "react-native";
import { STRINGS } from '../../constants';

export async function getAllLectureApi() {
    let url = "";
    await AsyncStorage.getItem('@UserToken')
        .then((value) => {
            url = APIS.COLOR_ME + "/paid-courses?token=" + value;
        })
        .catch(err => {
            alert(STRINGS.HAVE_ERROR)
        })
    return axios.get(url);
}

export async function getDetailLectureApi(id) {
    let url = "";
    await AsyncStorage.getItem('@UserToken')
        .then((value) => {
            url = APIS.COLOR_ME + "/lesson/" + id + "?token=" + value;
        })
        .catch(err => {
            alert(STRINGS.HAVE_ERROR)
        })
    return axios.get(url);
}
