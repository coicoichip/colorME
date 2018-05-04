import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function loginReducer(state = initialState.login, action) {
    switch (action.type) {
        case types.BEGIN_LOGIN :
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: action.error,
                    token: action.token,
                }
            };
        case types.LOGIN_SUCCESS :
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    token: action.token,
                    status: action.status,
                    user: action.user,
                    loginStatus: true
                }
            };
        case types.LOGIN_ERROR :
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                    token: action.token,
                    status: action.status
                }
            };
        case types.GOT_DATA_LOGIN :
            return {
                ...state,
                ...{
                    isGetLocalData: action.isGetLocalData,
                    login: action.login
                }
            };
        case types.UPDATE_DATA_LOGIN :
            return {
                ...state,
                ...{
                    login: action.login,
                    error: action.error
                }
            };
        case types.LOGOUT : {
            return {
                ...state,
                ...{
                    status: action.status,
                }
            }
        }
        case types.SKIP_LOGIN : {
            return {
                ...state,
                ...{
                    loginStatus: false,
                }
            }
        }
        case types.LOGOUT : {
            return {
                ...state,
                ...{
                    status : action.status, 
                    loginStatus : action.loginStatus
                }
            }
        }
        case types.SKIP_LOGIN : {
            return {
                ...state,
                ...{
                    loginStatus: false,
                }
            }
        }
        
        default:
            return state;
    }
}
