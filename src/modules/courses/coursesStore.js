import { observable, action, computed } from "mobx";
import { getCoursesApi, getCourseInformationApi, learnRegisterApi } from "./coursesApi";
import { Alert, AsyncStorage } from "react-native";
export const coursesStore = new class CoursesStore {
    @observable subjects = [];
    @observable data = [];
    @observable isLoadingSubject = false;
    @observable current_page = 0;
    @observable errorSubject = false;
    @observable total_pages = 1;

    @observable isLoadingCoursesInformation = false;
    @observable courseInformation = {};
    @observable classes = [];
    @observable courseName = "";
    @observable errorCoursesInfomation = false;
    @observable modalRegister = false;
    @observable modalRegister1 = false;

    @observable courses = {
        name: "",
        studyTime: "",
        dateStart: "",
        icon: "",
        isEnroll: [],
    }

    @observable message = "";
    @observable isLoadingLearnRegister = false;
    @observable errorLearnRegister = false;

    @action
    getListSubject(page, txt) {
        this.isLoadingSubject = true;
        getCoursesApi(page, txt).then(res => {
            
            this.isLoadingSubject = false;
            this.subjects = res.data.courses ? res.data.courses : [res.data.courses, this.subjects];
            this.data = this.subjects.filter(e =>
                e.categories[0].id === 1
            )
            this.total_pages = res.data.paginator.total_pages;
            this.current_page = res.data.paginator.current_page;
            this.errorSubject = false;
            
        })
            .catch(err => {
                this.isLoadingSubject = false;
                this.errorSubject = true;
            })
    }
    @action
    getCourseInformation(linkId, base) {
        this.isLoadingCoursesInformation = true;
        getCourseInformationApi(linkId, base).then(res => {
            this.isLoadingCoursesInformation = false;
            this.classes = res.data.data.classes.map((item, id) => { return { ...item, isEnroll: 0, index: id } });
            this.courseName = res.data.data.classes[0].course.name;
            this.errorCoursesInfomation = false;
        })
            .catch(err => {
                this.isLoadingCoursesInformation = false;
                this.errorCoursesInfomation = true;
            })
    }
    @action
    learnRegister(class_id) {
        this.isLoadingLearnRegister = true;
        // classes = this.classes;

        learnRegisterApi(class_id, token).then(res => {
            // classes[findIndex(item=> item.id == class_id)].isEnroll = 1
            // this.classes = classes
            this.modalRegister1 = true;
            this.modalRegister = false;
            this.isLoadingLearnRegister = false;
            this.message = res.data.message;
            this.errorLearnRegister = false;
        })
            .catch(err => {
                this.isLoadingLearnRegister = false;
                this.errorLearnRegister = true;
            })
        // return (dispatch) => {
        //     dispatch(beginLearnRegister(class_id));
        //     courseApi.learnRegisterApi(class_id, token)
        //         .then(function (response) {
        //             dispatch(learnRegisterSuccess(response, class_id));
        //             // Alert.alert(
        //             //     'Đăng ký thành công',
        //             //     response.data.message,
        //             //     [
        //             //         {text: 'Xong'},
        //             //     ],
        //             // )
        //         })
        //         .catch(function (error) {
        //             dispatch(learnRegisterError(error, class_id));
        //             Alert.alert(
        //                 'Đăng ký thất bại',
        //                 [
        //                     { text: 'Xác nhận' },
        //                 ],
        //             )
        //         });
        // }
    }
}
