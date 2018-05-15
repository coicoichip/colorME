import * as env from "../../constants/env";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { APIS } from "../../constants/env";
export function getScheduleApi(token) {
  let url = APIS.API_URL_UNMANAGE + "colorme.vn/api/v3/user/schedule?token=" + token;
  //console.log(url);
  return axios.get(url);
}
