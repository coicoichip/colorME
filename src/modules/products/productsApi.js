import axios from "axios";
import {APIS} from "../../constants";
import {AsyncStorage} from "react-native";
export async function getProducts(filter) {
    let url = "";
    await AsyncStorage.getItem('@ID').then((value) => {
       url = "http://colorme.vn:8000/products?user_id=" + value + "&filter=" + filter;
    })
    console.log(url);
    return axios.get(url);
  }
  export async function getProductsNew() {
    let url = "";
    await AsyncStorage.getItem('@ID').then((value) => {
       url = "http://colorme.vn:8000/products?user_id=" + value;
    })
    console.log(url);
    return axios.get(url);
  }