import axios from "axios";
import {APIS} from "../../constants";
import {AsyncStorage} from "react-native";

export async function userProfileApi(){
  let url = "";
  await AsyncStorage.getItem('@username').then((value)=> {
      url = APIS.COLOR_ME + "/user/" + value + "/profile"
  })
  return axios.get(url)
}
export function updateProfileApi(){
    
}