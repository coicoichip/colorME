import { observable, action } from 'mobx';
import { STRINGS } from '../../constants';
import { resetScreen } from '../../helper';
import { refreshTokenApi } from './splashApi';
import {AsyncStorage} from "react-native"
export default splashStore =  new class SplashStore {
    @observable isLoading = false;
    @observable token = '';
    @observable status = 0;
    @action
    refreshToken(navigation, oldToken) {
        this.isLoading = true;
        refreshTokenApi(oldToken)
            .then(res => {
                this.isLoading = false;
                this.token = res.data.token;
                this.status = 200;
                AsyncStorage.setItem("@UserToken", res.data.token)
                resetScreen(navigation, 'Drawer');
            }).catch(err => { 
                resetScreen(navigation, 'Login');
            });
    }
}