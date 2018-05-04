import * as types from '../../constants/actionTypes';
import { AsyncStorage, Alert } from 'react-native'
import * as loginApi from './loginApi';

export function openMainApp() {
    return {
        type: types.LOGIN,
    }
}

export function loginUser(login) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOGIN,
        });
        loginApi.login(login)
            .then(function (response) {
                dispatch(openMainApp())
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    token: response.data.token,
                    status: response.status,
                    user: response.data.user,
                    loginStatus: true,
                });
               
            })
            .catch(function (error) {
                dispatch({
                    type: types.LOGIN_ERROR,
                });
                console.log(error)
                Alert.alert(
                    'Đăng nhập thất bại.',
                    'Mời bạn kiểm tra lại thông tin tài khoản hoặc đường truyền kết nối mạng.',
                    [
                        { text: 'Đồng ý' }
                    ],
                );
            })
    }
}


export function loginUserAuto(login) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOGIN,
            isLoading: true,
        });
        loginApi.login(login)
            .then(function (response) {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    isLoading: false,
                    token: response.data.token,
                    status: response.status,
                    user: response.data.user,
                    loginStatus: true,
                });
                dispatch(openMainApp())
            })
            .catch(function (error) {
                dispatch({
                    type: types.LOGIN_ERROR,
                    isLoading: false,
                    error: true,
                });
            })
    }
}


export function updateDataLogin(login) { // ham na update vao bo nho cac gia tri nhap vao de login
    return {
        type: types.UPDATE_DATA_LOGIN,
        login: { ...login },
        error: false,
    }
}

export function skipLogin() {
    return {
        type: types.SKIP_LOGIN,
        loginStatus: false
    }

}

export function getDataLogin(status = 0) {
    return async function (dispatch) {
        try {
            const email = await AsyncStorage.getItem('@ColorMe:email');
            const password = await AsyncStorage.getItem('@ColorMe:password');
            dispatch(autoLogin(
                {
                    email: email,
                    password: password
                }, status
            ));
            dispatch(gotDataLogin(email, password));
        }
        catch (error) {
        }
        ;
    }
}

export function gotDataLogin(email, password) {
    return {
        type: types.GOT_DATA_LOGIN,
        login: {
            email: email,
            password: password,
        },
        isGetLocalData: true,
    }
}

export function setDataLogin(login) {
    return async function () {
        try {
            await AsyncStorage.setItem('@ColorMe:email', login.email);
            await AsyncStorage.setItem('@ColorMe:password', login.password);
            await AsyncStorage.setItem('@ColorMe:save', login.email)
        }
        catch (error) {
        }
        ;
    }
}

export function autoLogin(login, status) {
    return (dispatch) => {
        AsyncStorage.getItem('@ColorMe:save').then(async function () {
            let value = await AsyncStorage.getItem('@ColorMe:save');
            if (login && status == 0 && value) {
                dispatch(loginUserAuto(login))
            }
        })
    }
}

export function getRole(token) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_GET_DATA_ROLES,
        });
        loginApi.getDataRoleApi(token)
            .then(function (res) {
                dispatch({
                    type: types.GET_DATA_ROLES_SUCCESS,
                    roles: res.data.data.roles,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: types.GET_DATA_ROLES_ERROR,
                });
            })
    }
}
