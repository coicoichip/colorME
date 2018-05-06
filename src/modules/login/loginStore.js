
import { observable, action, computed } from "mobx";
import { loginApi } from "./loginApi";
import { Alert, AsyncStorage } from "react-native"
import { NavigationActions } from "react-navigation";
export const loginStore = new class LoginStore {
    @observable login = {};
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
        this.isLoading = true;
        loginApi(this.login).then(res => {
            // const resetAction = NavigationActions.reset({
            //     index: 0,
            //     actions: [ 
            //         NavigationActions.navigate({ routeName: 'Drawer' })
            //     ]
            // })
            // navigation.navigate("Drawer");
            this.isLoading = false;
            this.token = res.data.token,
            this.user = res.data.user,
            this.status = res.status,
            this.loginStatus = true
        })
            .catch(err => {
                this.isLoading = false;
                Alert.alert('Đăng nhập thất bại.',
                    'Mời bạn kiểm tra lại thông tin tài khoản hoặc đường truyền kết nối mạng.',
                    [
                        { text: 'Đồng ý' }
                    ], )
            })
    }
    @action
    async autoLogin(navigation) {
        console.log(this.login)
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
            try {
                const email = await AsyncStorage.getItem('@ColorMe:email');
                const password = await AsyncStorage.getItem('@ColorMe:password');
                console.log(email, password)
                this.login['email'] = email;
                this.login['password'] = password
                if(email !== null &&  password !== null){
                    this.autoLogin(navigation);
                }        
            }
            catch (err) {
            }
    }
    @action
     async setDataLogin() {
         console.log(this.login)
            try {
                await AsyncStorage.setItem('@ColorMe:email', this.login.email);
                await AsyncStorage.setItem('@ColorMe:password', this.login.password);
                await AsyncStorage.setItem('@ColorMe:save', this.login.email)
            }
            catch (error) {
            }
            ;
        }
    
}