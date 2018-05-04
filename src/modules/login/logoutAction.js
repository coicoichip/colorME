import * as types from '../../constants/actionTypes'
import {AsyncStorage} from 'react-native'


export function logout() {
    return async function (dispatch) {
        try {
            await AsyncStorage.removeItem('@ColorMe:save')
            dispatch({
                type: types.LOGOUT,
                status: 1,
                loginStatus: false,
            })
        }
        catch (error) {
        };
    }
}



