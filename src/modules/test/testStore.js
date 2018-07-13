import { observable, action, computed } from "mobx";
import { getTestApi, getTestDetailApi } from "./testApi";
import { Alert, AsyncStorage } from "react-native";
import { STRINGS } from "../../constants";

export default testStore = new class TestStore {
    @observable exams = [];
    @observable isLoadingExam = false;
    @observable errorExam = false;

    @observable examDetail = {};
    @observable isLoadingExamDetail = false;
    @observable errorExamDetail = false;

    // @observable data = [];
    // @observable dataPost = {question_id = 0, answer_id = "0"};

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
    @action
    getDetailExam(id) {
        this.isLoadingExamDetail = true;
        this.errorExamDetail = false;
        getTestDetailApi(id).then(res => {
            this.examDetail = res.data.exam;
            this.isLoadingExamDetail = false;
            this.errorExamDetail = false;
        })
            .catch(err => {
                this.isLoadingExamDetail = false;
                this.errorExamDetail = true;
            })
    }
}