
import { observable, action, computed } from "mobx";
import { loginApi } from "./loginApi";
import { Alert, AsyncStorage } from "react-native"
import { NavigationActions } from "react-navigation";
export default loginStore = new class LoginStore {
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
            let resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Drawer' })
                ]
            })
            navigation.dispatch(resetAction)
            this.isLoading = false;
            this.token = res.data.token,
            this.user = res.data.user,
            this.status = res.status,
            this.loginStatus = true
        })
            .catch(err => {
                console.log(err);
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
                
                this.login['email'] = email;
                this.login['password'] = password
                if(email !== null &&  password !== null){
                    this.autoLogin(navigation);
                    console.log(this.login)
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
    @action
    async logout(navigation){
        try {
            await AsyncStorage.removeItem('@ColorMe:save');
            let resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ]
            })
            
            navigation.dispatch(resetAction)
            
        }
        catch (error) {
        }
    }
    
}