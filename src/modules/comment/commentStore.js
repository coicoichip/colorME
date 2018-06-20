import { observable, action, computed } from "mobx";
import { getCommentOnePost, postCommentOnePostApi, deleteCommentApi, likeCommentApi } from "./commentApi";
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
    getComment(products_id, name) {
        console.log(name)
        this.isLoading = true;
        getCommentOnePost(products_id).then(res => {
            this.isLoading = false;
            this.comments = res.data.comments.map((item) => {
                let liked = (item.likers.length == 0 || item.likers.filter(liker => liker.name == name).length == 0) ? false : true;
                return {...item, ...{liked : liked}}
            });
           
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
            this.comments.push({...this.commentPost, ...{liked : false}});
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
    @action
    likeComment(item){
        likeCommentApi(item.id).then((res)=> {
            
            let index = this.comments.findIndex(comment => comment.id == item.id);
            item.liked ? item.likes-=1 : item.likes+=1;
            item.liked = !item.liked;
            this.comments[index] = item;
            this.comments = this.comments.map(item => {return item})
            console.log(this.comments[index], index)
        }).catch(err => console.log(err))
    }

}


