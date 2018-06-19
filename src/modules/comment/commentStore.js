import { observable, action, computed } from "mobx";
import { getCommentOnePost, postCommentOnePostApi, deleteCommentApi } from "./commentApi";
import { Alert, AsyncStorage } from "react-native";
convertComment = (comments) => {
    let parrent = comments.filter(item => item.parent_id == 0);
    let children = comments.filter(item => item.parent_id !== 0);
    return parrent.map((item) => {
        return {
            id: item.id,
            comments_related: [item].concat(children.filter(post => post.parent_id == item.id))
        }
    })
}
export default commentStore = new class commentStore {
   
    @observable comments = [];
    @observable commentPost = {}
    @observable isLoadingPost = false;
    @observable isLoading = false;
    @observable value = {
        parent_id: 0,
        comment_content: '',
    }


    @action
    getComment(products_id) {
        this.isLoading = true;
        getCommentOnePost(products_id).then(res => {
            this.isLoading = false;
            this.comments = res.data.comments;
            console.log(res, "aaaa");
        })
            .catch(err => {
                this.isLoading = false;
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
            this.value.parent_id = 0;
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


