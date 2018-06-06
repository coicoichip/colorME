import { observable, action } from 'mobx';
import { STRINGS } from '../../constants';
import { resetScreen } from '../../helper';
import { refreshTokenApi } from './splashApi';
import {AsyncStorage} from "react-native"
export default splashStore =  new class SplashStore {
    @observable isLoading = false;
    @observable token = '';

    @action
    refreshToken(navigation, oldToken) {
        this.isLoading = true;
        refreshTokenApi(oldToken)
            .then(res => {
                this.isLoading = false;
                this.token = res.data.token;
                AsyncStorage.setItem("@UserToken", res.data.token)
                resetScreen(navigation, 'Drawer');
            }).catch(err => { 
                resetScreen(navigation, 'Login');
            });
    }
}