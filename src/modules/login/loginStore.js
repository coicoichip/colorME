
import { observable, action, computed } from "mobx";
import { loginApi } from "./loginApi";
import { Alert, AsyncStorage } from "react-native"
import { NavigationActions } from "react-navigation";
import { STRINGS } from "../../constants";
import { resetScreen } from '../../helper';

export default loginStore = new class LoginStore {
    @observable login = { email: "", password: "" };
    @observable loginStatus = false;
    @observable token = null;
    @observable isLoading = false;
    @observable error = false;
    @observable result = false;
    @observable isGetLocalData = false;
    @observable status = 0;
    @observable user = {};

    @action
    loginUser(navigation) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.login.email == '' || this.login.password == '') {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_INFOR);
            return;
        } if (reg.test(this.login.email) == false) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.WRONG_EMAIL);
            return;
        }
        this.isLoading = true;
        loginApi(this.login).then(res => {

            resetScreen(navigation, 'Drawer');

            this.isLoading = false;
            this.token = res.data.token;
            this.user = res.data.user;
            this.status = res.status;
            this.loginStatus = true;
            console.log(res)
        })
            .catch(err => {
                this.isLoading = false;
                Alert.alert(STRINGS.LOGIN_ERROR, STRINGS.MESSAGE_LOGIN_ERROR)
            })
    }
    @action
    async autoLogin(navigation) {
        try {
            let value = await AsyncStorage.getItem('@ColorMe:save');
            if (this.login && this.status == 0 && value) {
                this.loginUser(navigation)
            }
        }
        catch (err) {

        }
    }
    @action
    async getDataLogin(navigation) {
        this.login = {};
        try {
            const email = await AsyncStorage.getItem('@ColorMe:email');
            const password = await AsyncStorage.getItem('@ColorMe:password');
            this.login = {
                email: email,
                password: password,
            }
            console.log(this.login);
            console.log(this.status);
            this.autoLogin(navigation)
        }
        catch (err) {
        }
    }
    @action
    async setDataLogin() {
        try {
            await AsyncStorage.setItem('@ColorMe:email', this.login.email);
            await AsyncStorage.setItem('@ColorMe:password', this.login.password);
            await AsyncStorage.setItem('@ColorMe:save', this.login.email)
        }
        catch (error) {
        }
        ;
    }
    @action
    async logout(navigation) {
        try {
            await AsyncStorage.removeItem('@ColorMe:save');
            resetScreen(navigation, 'Login');
        }
        catch (error) {
        }
    }
}