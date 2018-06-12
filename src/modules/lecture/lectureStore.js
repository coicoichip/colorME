import { observable, action, computed } from "mobx";
import { getAllLectureApi, getDetailLectureApi } from "./lectureApi";
import { Alert, AsyncStorage } from "react-native";
import Analytics from 'appcenter-analytics';
import { STRINGS } from "../../constants";

export const lectureStore = new class CoursesStore {
    @observable isLoading = false;
    @observable isLoadingDetailLecture = false;
    @observable data = [];
    @observable detailLectureLession = {}

    @action
    getAllLecture() {
        this.isLoading = true;
        getAllLectureApi().then(res => {
            console.log(res)
            this.isLoading = false;
            this.data = res.data;
            Analytics.trackEvent(STRINGS.ACTION_VIEW_LECTURE)
        })
            .catch(err => {
                this.isLoading = false;
            })
    }

    @action
    getDetailLecture(id) {
        this.isLoadingDetailLecture = true;
        getDetailLectureApi(id).then(res => {
            console.log(res.data)
            this.isLoadingDetailLecture = false;
            this.detailLectureLession = res.data;
            Analytics.trackEvent(STRINGS.ACTION_VIEW_DETAIL_LECTURE + ' -> ' + res.data.classes[0].course.name, {})
        })
            .catch(err => {
                this.isLoadingDetailLecture = false;
            })
    }

}