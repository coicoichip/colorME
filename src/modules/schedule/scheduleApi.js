import * as env from "../../constants/env";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { APIS } from "../../constants/env";
export async function getScheduleApi() {
  let url = "";
  await AsyncStorage.getItem("@UserToken").then(value => {
    url =
      APIS.API_URL_UNMANAGE + "colorme.vn/api/v3/user/schedule?token=" + value;
  });
  return axios.get(url);
}
