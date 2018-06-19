import { observable, action, computed } from "mobx";
import { getCommentOnePost, postCommentOnePostApi } from "./commentApi";
import { Alert, AsyncStorage } from "react-native";

export default commentStore = new class commentStore {
@observable comments = [];


@action
getComment(products_id) {
    getCommentOnePost(products_id).then(res => {
        this.comments = res.data.comments;
        console.log(res, "aaaa");
    })
        .catch(err => {
        })
}
}
