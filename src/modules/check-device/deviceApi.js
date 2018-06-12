import axios from "axios";
import {APIS} from "../../constants";
import {AsyncStorage} from "react-native";

export async function deviceApi(device){
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = APIS.API_URL + "/checkincheckout/check-device?token="+ value
    })
    console.log(url)
    return axios.post(url, {
        device_id : device.device_id,
        device_name : device.device_name,
        device_os : device.device_os
    })
}