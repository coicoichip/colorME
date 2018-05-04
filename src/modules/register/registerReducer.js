import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export default function registerReducer (state = initialState.register, action){
    switch (action.type) {
        case types.BEGIN_REGISTER :
            return {
                ...state,
                ...{
                    isLoading : true,
                    error : action.error,
                    token: action.token,
                }
            };
        case types.REGISTER_SUCCESS :
            return {
                ...state,
                ...{
                    isLoading : false,
                    error : false,
                    status : action.status,
                    token: action.token,
                    email : action.email,
                    name : action.name
                }
            };
        case types.REGISTER_ERROR :
            return {
                ...state,
                ...{
                    isLoading : false,
                    error : action.error,
                    token: action.token,
                    status: action.status,
                }
            };
        default :
            return state

    }
}