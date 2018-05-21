import axios from 'axios';
import {APIS} from "../../constants/env";

export function blogApi(kind, page, tag) {
   let url = APIS.COLOR_ME_API + "/blog?kind=" + kind + "&page=" + page + "&tag="+tag
    return axios.get(url)   
};

export function detailBlogApi(slug){
    let url = APIS.COLOR_ME_API + "/blog/" + slug
    return axios.get(url);   
}
