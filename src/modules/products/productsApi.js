import axios from "axios";
import {APIS} from "../../constants";
import {AsyncStorage} from "react-native";
export async function getProducts(filter, page) {
    let url = "";
    await AsyncStorage.getItem('@ID').then((value) => {
       url = "http://colorme.vn:8000/products?user_id=" + value + "&filter=" + filter + "&page=" + page;
       
    })
   
    return axios.get(url);
  }
  export async function getProductsNew(page) {
    let url = "";
    await AsyncStorage.getItem('@ID').then((value) => {
       url = "http://colorme.vn:8000/products?user_id=" + value + "&page=" + page;
       console.log(url);
    })
    
    return axios.get(url);
  }