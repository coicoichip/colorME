import { observable, action, computed } from "mobx";
import { blogApi, detailBlogApi, attendanceApi, checkAttendanceApi} from "./blogApi";
import {AsyncStorage} from "react-native";
import { NavigationActions } from "react-navigation";
import { STRINGS } from "../../constants";
import deviceStore from "../check-device/deviceStore";
export default blogStore = new class BlogStore {
    @observable blogs = [];
    @observable current_page = 0;
    @observable total_pages = 1;
    @observable isLoading = false;
    @observable isLoadingAttendent = false;
    @observable isSearch = false;
    @observable error = false;
    @observable isLoadingDetail = false;
    @observable errorDetail = false;
    @observable detailBlog = {};
    @observable top_tags = [];
    @observable attendanceData = {};
    @observable attendanceStatus = '';
    @observable modalVisible = false;
    @observable modalVisible1 = false;
    @observable check = 2;
    @observable index = 0;

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
            // console.log(this.blogs);
        })
        .catch(err => {
            this.error = true;
            this.isLoading = false;
            this.isSearch = false;
        })
    }
    @action
    getDetailBlog(id){
        this.isLoadingDetail = true;
        this.errorDetail = false;
        detailBlogApi(id).then(res => {
            this.detailBlog = res.data;
            this.isLoadingDetail = false;
        })
        .catch(err => {
            this.errorDetail = true;
            this.isLoadingDetail = false;
        })
    }

    @action
    checkAttendance(){
        checkAttendanceApi().then(res => {
            this.attendanceData = res.data.data;
            // console.log(res.data.data)
            this.modalVisible = res.data.data.id ? true : false
        })
        .catch(err => {
            // console.log(err)
        })
    }
    
    @action 
    attendance(class_id, class_lesson_id, mac_wifi){
        this.isLoadingAttendent = true;
        // console.log(class_id, class_lesson_id)
        attendanceApi(class_id, class_lesson_id, mac_wifi)
        .then(res => {
            // console.log(res);
            this.check = 1;
            this.modalVisible1 = true;
            this.modalVisible = false;
            this.attendanceStatus = res.data;
            this.isLoadingAttendent = false;
            // alert(STRINGS.ATTENDANCE_SUCCESS)
        })
        .catch(err => {
            // console.log(err)
            this.isLoadingAttendent = false;
            this.check = 0;
            this.modalVisible = false;
            this.modalVisible1 = true
            
        })
    }
}