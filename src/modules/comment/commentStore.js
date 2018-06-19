import { observable, action, computed } from "mobx";
import { getCommentOnePost, postCommentOnePostApi } from "./commentApi";
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


    @action
    getComment(products_id) {
        getCommentOnePost(products_id).then(res => {
            this.comments = convertComment(res.data.comments)
            console.log(convertComment(res.data.comments), res.data.comments);
        })
            .catch(err => {
            })
    }


}


