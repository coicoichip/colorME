import { observable, action, computed } from "mobx";
import { coursesApi } from "./coursesApi";
import { Alert, AsyncStorage } from "react-native";
export const coursesStore = new class CoursesStore {
    @observable subjects = [];
    @observable isLoading = false;
    @observable current_page = 0;
    @observable errorSubject = false;
    @observable total_pages = 1;

    @action
    getListSubject(page, txt, token) {
        this.isLoading = true;
        coursesApi(page, txt, token).then(res => {
            this.isLoading = false;
            this.subjects = res.data.courses ? res.data.courses : [res.data.courses, this.subjects];
            this.total_pages = res.data.paginator.total_pages;
            this.current_page = res.data.paginator.current_page;
            this.errorSubject = false;
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            this.isLoading = false;
            this.errorSubject = true;
        })
    }
}