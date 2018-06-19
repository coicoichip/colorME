import { observable, action, computed } from "mobx";
import { getCommentOnePost, postCommentOnePostApi } from "./commentApi";
import { Alert, AsyncStorage } from "react-native";
import { deleteCommentApi } from "../comment/commentApi";

export default commentStore = new class commentStore {
    @observable comments = [];
    @observable commentPost = {}
    @observable isLoadingPost = false;
    @observable value = {
        parent_id: 0,
        comment_content: '',
    }


    @action
    getComment(products_id) {
        getCommentOnePost(products_id).then(res => {
            this.comments = res.data.comments;
            console.log(res, "aaaa");
        })
            .catch(err => {
            })
    }
    @action
    postComment(product_id, value) {
        this.isLoadingPost = true;
        postCommentOnePostApi(product_id, value).then(res => {
            this.isLoadingPost = false;
            this.commentPost = res.data;
            this.comments.push(this.commentPost);
            this.value.comment_content = "";
            console.log(res);
        })
            .catch(err => { this.isLoadingPost = false; })
    }
    @action
    deleteComment(product_id) {
        deleteCommentApi(product_id).then(res => {
            this.comments = this.comments.filter(item => item.id !== product_id);
        })
            .catch(err => {})
    }
}

