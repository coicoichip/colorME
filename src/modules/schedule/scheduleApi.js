import * as env from "../../constants/env";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { APIS } from "../../constants/env";
export async function getScheduleApi(token) {
  let urt = "";
  await AsyncStorage.getItem('@UserToken').then((value) => {
    url = APIS.API_URL_UNMANAGE + "colorme.vn/api/v3/user/schedule?token=" + value;
  })
  //console.log(url);
  return axios.get(url);
}
