import { observable, action, computed } from "mobx";
import { coursesApi, getCourseInformationApi, learnRegisterApi } from "./coursesApi";
import { Alert, AsyncStorage } from "react-native";
export const coursesStore = new class CoursesStore {
    @observable subjects = [];
    @observable isLoadingSubject = false;
    @observable current_page = 0;
    @observable errorSubject = false;
    @observable total_pages = 1;

    @observable isLoadingCoursesInformation = false;
    @observable courseInformation = {};
    @observable errorCoursesInfomation = false;

    @action
    getListSubject(page, txt, token) {
        this.isLoadingSubject = true;
        coursesApi(page, txt, token).then(res => {
            this.isLoadingSubject = false;
            this.subjects = res.data.courses ? res.data.courses : [res.data.courses, this.subjects];
            this.total_pages = res.data.paginator.total_pages;
            this.current_page = res.data.paginator.current_page;
            this.errorSubject = false;
            console.log(res);
        })
            .catch(err => {
                console.log(err);
                this.isLoadingSubject = false;
                this.errorSubject = true;
            })
    }
    @action
    getCourseInformation(linkId) {
        this.isLoadingCoursesInformation = true;
        getCourseInformationApi(linkId).then(res => {
            this.isLoadingCoursesInformation = false;
            this.courseInformation = res.data.data.course;
            this.errorCoursesInfomation = false;
            console.log(res);
        })
        .catch(err => {
            this.isLoadingCoursesInformation = false;
            this.errorCoursesInfomation = true;
        })
    }
    // @action
    // learnRegister(class_id, token) {
    //     return (dispatch) => {
    //         dispatch(beginLearnRegister(class_id));
    //         courseApi.learnRegisterApi(class_id, token)
    //             .then(function (response) {
    //                 dispatch(learnRegisterSuccess(response, class_id));
    //                 // Alert.alert(
    //                 //     'Đăng ký thành công',
    //                 //     response.data.message,
    //                 //     [
    //                 //         {text: 'Xong'},
    //                 //     ],
    //                 // )
    //             })
    //             .catch(function (error) {
    //                 dispatch(learnRegisterError(error, class_id));
    //                 Alert.alert(
    //                     'Đăng ký thất bại',
    //                     [
    //                         { text: 'Xác nhận' },
    //                     ],
    //                 )
    //             });
    //     }
    // }
}
