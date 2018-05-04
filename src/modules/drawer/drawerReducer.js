import initialState from "../../reducers/initialState";
import * as types from "../../constants/actionTypes";

export default function drawerReducer (state = initialState.finance, action){
    switch(action.type){
        case types.BEGIN_LOAD_TABS :
        return {...state, ...{isLoadingTabs : true, errorTabs : false}}

        case types.LOAD_TABS_SUCCESS :
        return {...state, ...{isLoadingTabs : false, tabs : action.tabs, errorTabs : false}}

        case types.LOAD_TABS_ERROR : 
        return {...state,...{isLoadingTabs : false, errorTabs : true}}
        default : 
        return state
    }
}