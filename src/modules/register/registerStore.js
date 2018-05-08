import { observable, action } from 'mobx';
import { Alert } from 'react-native';
import { STRINGS } from '../../constants';
import * as registerApi from './registerApi';

export default new class RegisterStore {
    @observable isLoading = false;
    @observable user = {};

    @action
    register(register) {
        this.isLoading = true;
        registerApi.register(register)
            .then(res => {
                this.isLoading = false;
                this.user = res.data.user;
                Alert.alert(STRINGS.WELCOME.TITLE, STRINGS.WELCOME.DESCRIPTION);
                console.log(res)
            })
            .catch((err) => {
                this.isLoading = false;
                if(err.response.data.error.email){
                    Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMAIL_ALREADY_EXIST);
                    return;
                }
                if(err.response.data.error.username){
                    Alert.alert(STRINGS.HAVE_ERROR, STRINGS.USERNAME_ALREADY_EXIST);
                    return;
                }
            })
    }
}