import * as types from '../../constants/actionTypes';
import { getTabsApi } from './drawerApi';
import { Alert } from "react-native";


export function getTabs(token) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_LOAD_TABS
        })
        getTabsApi(token).then(function (res) {
            dispatch({
                type: types.LOAD_TABS_SUCCESS,
                tabs : res.data.data.tabs
            })
        })
            .catch(error => {
                dispatch({
                    type: types.LOAD_DATA_FINANCE_SUMMARY_ERROR
                })
            })
    }
}