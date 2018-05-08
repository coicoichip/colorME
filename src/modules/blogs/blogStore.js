import { observable, action, computed } from "mobx";
import { blogApi, detailBlogApi } from "./blogApi";

import { NavigationActions } from "react-navigation";

export default blogStore = new class BlogStore {
    @observable blogs = [];
    @observable current_page = 0;
    @observable total_pages = 1;
    @observable isLoading = false;
    @observable isSearch = false;
    @observable error = false;
    @observable isLoadingDetail = false;
    @observable errorDetail = false;
    @observable detailBlog = {};

    @action
    getBlog(page, action) {
        if (action == 'search') {
            this.isSearch = true;
            this.error = false;
            return;
        }
        this.isLoading = true; this.error = false
        blogApi(page).then(res => {
            this.total_pages = res.data.paginator.total_pages;
            this.current_page = res.data.paginator.current_page;
            this.blogs = res.data.paginator.current_page == 1 ? res.data.blogs : [...this.blogs, ...res.data.blogs];
            this.isLoading = false;
            this.isSearch = false;
        })
        .catch(err => {
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
            console.log(this.isLoadingDetail, this.detailBlog)
            
        })
        .catch(err => {
            this.errorDetail = true;
            this.isLoadingDetail = false;
        })
        }
    }