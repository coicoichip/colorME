import axios from "axios";
import {APIS} from "../../constants";
import {AsyncStorage} from "react-native";

export async function userProfileApi(){
  let url = "";
  await AsyncStorage.getItem('@UserToken').then((value)=> {
      url = APIS.COLOR_ME_API1 + "/user/profile?token=" + value
  })
  return axios.get(url)
}
export async function updateProfileApi(user){
    let url = "";
    await AsyncStorage.getItem('@UserToken').then((value)=> {
      url = APIS.COLOR_ME_API1 + "/user/profile?token=" + value
    })
    return axios.post(url, {
      name : user.name,
      phone : user.phone,
      university : user.university,
      work : user.work,
      avatar_url : user.avatar_url,
      dob : user.dob
    })
}