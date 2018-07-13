import { observable, action } from 'mobx';
import { Alert } from 'react-native';
import { STRINGS } from '../../constants';
import { resetScreen } from '../../helper';
import { registerApi } from './registerApi';
import {AsyncStorage} from "react-native";
import Analytics from 'appcenter-analytics';
import loginStore from "../login/loginStore";

export default new class RegisterStore {
    @observable isLoading = false;
    @observable user = {};

    @action
    register(register, navigation) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (register.name == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_NAME);
            return;
        }
        if (register.email == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_EMAIL);
            return;
        } else if (!reg.test(register.email)) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.WRONG_EMAIL);
            return;
        } else {
            register.username = register.email.slice(0, register.email.indexOf("@"));
        }
        if (register.password == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_PASSWORD);
            return;
        }
        this.isLoading = true;
        registerApi(register)
            .then(res => {
                if(navigation){
                    resetScreen(navigation, 'Drawer');
                }
                OneSignal.sendTags({user_id: res.data.user ? res.data.user.id : 0});
                this.isLoading = false;
                this.user = res.data.user;
                AsyncStorage.setItem('@UserToken', res.data.token);
                AsyncStorage.setItem('@ID', res.data.user.id.toString())
                AsyncStorage.setItem('@email', res.data.user.email);
                Alert.alert(STRINGS.WELCOME.TITLE, STRINGS.WELCOME.DESCRIPTION);

                Analytics.trackEvent(STRINGS.ACTION_REGISTER_SUCCESS + res.user.name, {})
                
            })
            .catch((err) => {
                this.isLoading = false;
                if (err.response.data.error.email) {
                    Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMAIL_ALREADY_EXIST);
                    return;
                }
                if (err.response.data.error.username) {
                    Alert.alert(STRINGS.HAVE_ERROR, STRINGS.USERNAME_ALREADY_EXIST);
                    return;
                }
            })
    }
    @action 
    async saveData(register){
       try{
           await AsyncStorage.setItem('email', register.email)
           await AsyncStorage.setItem('password', register.password)
           loginStore.login = {email : register.email, password : register.password}
       }
       catch (err){

       }
    }

}