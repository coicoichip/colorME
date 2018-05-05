import { observable, action } from "mobx";
import * as registerApi from './registerApi';

export const store = new class RegisterStore {
    @observable isLoading = false;
    @observable user = {};

    @action
    register(register) {
        this.isLoading = true;
        registerApi.register(register)
            .then(res => {
                this.isLoading = false;
                this.user = res.data.user;
                console.log(res.data.user);
            })
            .catch((err) => {
                this.isLoading = false;
                console.log(err)
            })
    }
}