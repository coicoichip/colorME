import axios from 'axios';
import {AsyncStorage} from "react-native";
export async function getTabsApi(token){
    let url = ''
    await AsyncStorage.getItem('url').then((value) => {
        url = "http://" + value + "/manageapi/v3/tabs?token=" + token 
    })
    return axios.get(url);
}
