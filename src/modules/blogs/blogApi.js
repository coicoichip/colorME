import axios from 'axios';
import {APIS} from "../../constants/env";

export function blogApi(page) {
   let url = APIS.COLOR_ME_API + "/blog?page=" + page
    return axios.get(url)   
};

export function detailBlogApi(slug){
    let url = APIS.COLOR_ME_API + "/blog/" + slug
    return axios.get(url);   
}
