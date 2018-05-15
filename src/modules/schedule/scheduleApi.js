import * as env from "../../constants/env";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { APIS } from "../../constants/env";
<<<<<<< HEAD
export async function getScheduleApi() {
  let url = "";
  await AsyncStorage.getItem("@UserToken").then(value => {
    url =
      APIS.API_URL_UNMANAGE + "colorme.vn/api/v3/user/schedule?token=" + value;
  });
=======
export async function getScheduleApi(token) {
  let urt = "";
  await AsyncStorage.getItem('@UserToken').then((value) => {
    url = APIS.API_URL_UNMANAGE + "colorme.vn/api/v3/user/schedule?token=" + value;
  })
  //console.log(url);
>>>>>>> 142e5e2e688fa3ad684442d19461157d73bcaab0
  return axios.get(url);
}
