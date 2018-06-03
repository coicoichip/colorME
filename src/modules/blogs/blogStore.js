import { observable, action, computed } from "mobx";
import { blogApi, detailBlogApi, attendanceApi, checkAttendanceApi} from "./blogApi";

import { NavigationActions } from "react-navigation";
import { STRINGS } from "../../constants";

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
    @observable top_tags = [];
    @observable attendanceData = {};
    @observable attendanceStatus = '';

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
            this.blogs = res.data.paginator.current_page == 1 ? res.data.blogs : [...this.blogs, ...res.data.blogs];
            this.top_tags = res.data.top_tags
            this.isLoading = false;
            this.isSearch = false;
            console.log(this.blogs);
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
        })
        .catch(err => {
            this.errorDetail = true;
            this.isLoadingDetail = false;
        })
    }

    @action
    checkAttendance(token){
        checkAttendanceApi(token).then(res => {
            console.log(res.data.data);
            this.attendanceData = res.data.data;
        })
        .catch(err => {
        })
    }
    
    @action 
    attendance(class_id, class_lesson_id, mac_wifi, token){
        attendanceApi(class_id, class_lesson_id, mac_wifi, token)
        .then(res => {
            console.log(" attendance success");
            console.log(res.data);
            this.attendanceStatus = res.data;
            alert(STRINGS.ATTENDANCE_SUCCESS)
        })
        .catch(err => {
            console.log("fail");
        })
    }
}