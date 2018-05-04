// import * as baseApi from './baseApi';
// import * as types from '../../constants/actionTypes';
//
//
// export function getListBase(page, token) {
//     return (dispatch) => {
//         dispatch({
//             type: types.BEGIN_GET_LIST_BASE
//         });
//         baseApi.getBasesApi(page,token)
//             .then(function (res) {
//                 dispatch({
//                     type: types.GET_LIST_BASE_SUCCESS,
//                     bases: res.data.bases,
//                     total_pages : res.data.paginator.total_pages
//                 });
//                 //console.log(res);
//             })
//             .catch(function (error) {
//                 dispatch({
//                     type: types.GET_LIST_BASE_ERROR,
//
//                 });
//             });
//     }
// }
//
// export function getAllProvinces(token) {
//     return (dispatch) => {
//         dispatch({
//             type: types.BEGIN_GET_ALL_PROVINCES
//         });
//         baseApi.getAllProvincesApi(token)
//             .then(function (res) {
//                 dispatch({
//                     type: types.GET_ALL_PROVINCES_SUCCESS,
//                     provinces: res.data.data.provinces,
//                 });
//             })
//             .catch(function (error) {
//                 throw (error);
//             });
//     }
// }
//
