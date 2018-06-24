import { observable, action, computed } from "mobx";
import { getCommentOnePost, postCommentOnePostApi, deleteCommentApi, likeCommentApi, getInfoAboutPostApi, likePostApi, unlikePostApi } from "./commentApi";
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
    @observable checkFocus = {};
    @observable dataInfoPost = {};
    @observable value = {
        parent_id: 0,
        comment_content: '',
    }
    @observable liked = false; 
    @observable check = 0;
    @observable commentsChild = [];
    @action
    getComment(products_id, name) {
        console.log(name);
        this.isLoading = true;
        getCommentOnePost(products_id).then(async res => {
             this.comments = await res.data.comments.map((item) => {
                 let liked = (item.likers.length == 0 || item.likers.filter(liker => liker.name == name).length == 0) ? false : true;
                 console.log(liked);
                return {...item, ...{liked : liked}};
            });
            this.isLoading = false;
           
        })
            .catch(err => {
                this.isLoading = false;
            })
    }
    @action
    getInfoPost(product_id, name){
        getInfoAboutPostApi(product_id).then(res => {
            this.dataInfoPost = {likes_count : res.data.likes_count, comments_count : res.data.comments_count, views_count : res.data.views_count};
            this.liked = (res.data.likers.length == 0|| res.data.likers.filter(item => item.name == name).length ==0) ? false : true;
        })
        .catch(err => {})
    }
    @action
    postComment(product_id, value, user) {
        let item = {
              parent_id : value.parent_id,
              content : value.comment_content,
              commenter : user,
              isLoading : true,
        }
        this.comments.push(item);
        postCommentOnePostApi(product_id, value).then(async res => {
            this.isLoadingPost = false;
            this.commentPost = res.data;
            this.value.comment_content = "";
            this.comments[this.comments.length -1] = res.data;
            this.comments = this.comments.map((item) => {return item});
            
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
        }).catch(err => console.log(err))
    }
    @action
    likePost(product_id){
       if(this.liked){
            unlikePostApi(product_id).then((res)=> {
                console.log(res)
                this.liked = !this.liked;
                this.dataInfoPost.likes_count -=1;
            }).catch(err => console.log(err))
       }
       else{
           likePostApi(product_id).then((res)=> {
               this.liked = !this.liked;
               this.dataInfoPost.likes_count +=1;
           }).catch(err=> console.log(err))
       }
    }


}


