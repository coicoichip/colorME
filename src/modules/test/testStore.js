import { observable, action, computed } from "mobx";
import { getTestApi, getTestDetailApi } from "./testApi";
import { Alert, AsyncStorage } from "react-native";
import { STRINGS } from "../../constants";

export default testStore = new class TestStore {
    @observable exams = [];
    @observable isLoadingExam = false;
    @observable errorExam = false;

    @action
    getExam() {
        this.isLoadingExam = true;
        this.errorExam = false;
        getTestApi().then(res => {
            this.exams = res.data.exams;
            this.isLoadingExam = false;
            this.errorExam = false;
        })
            .catch(err => {
                this.isLoadingExam = false;
                this.errorExam = true;
            })
    }
}