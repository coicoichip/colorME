import { observable, action, computed } from "mobx";
import { blogApi, detailBlogApi } from "./blogApi";

import { NavigationActions } from "react-navigation";

export default resourceStore = new class ResourceStore {
    @observable resources = [];
    @observable current_page = 0;
    @observable total_pages = 1;
    @observable isLoading = false;
    @observable isSearch = false;
    @observable error = false;
    @observable isLoadingDetail = false;
    @observable errorDetail = false;
    @observable detailBlog = {};
    @observable top_tags = [];

    @action
    getBlog(kind, page,tag,action) {
        if (action == 'search') {
            this.isSearch = true;
            this.error = false;
        }else{
            this.isLoading = true; this.error = false
        }
        blogApi(kind,page, tag).then(res => {
            this.total_pages = res.data.paginator.total_pages;
            this.current_page = res.data.paginator.current_page;
            this.resources = res.data.paginator.current_page == 1 ? res.data.blogs : [...this.blogs, ...res.data.blogs];
            this.top_tags = res.data.top_tags
            this.isLoading = false;
            this.isSearch = false;
        })
        .catch(err => {
            console.log(err)
            this.error = true;
            this.isLoading = false;
            this.isSearch = false;
        })
    }
    @action
    getDetailBlog(slug){
        this.isLoadingDetail = true;
        this.errorDetail = false;
        detailBlogApi(slug).then(res => {
            this.detailBlog = res.data.data.blog;
            this.isLoadingDetail = false;
        })
        .catch(err => {
            this.errorDetail = true;
            this.isLoadingDetail = false;
        })
        }
    }