import * as blogApi from './blogApi';
import * as types from '../../constants/actionTypes';

export function getListBlog(page, txt, action ) {
    return (dispatch) => {
        dispatch({
            type: action == "refresh" ? types.BEGIN_REFRESH_LIST_BLOG : (action == "search" ? types.BEGIN_SEARCH_LIST_BLOG : types.BEGIN_GET_LIST_BLOG)
        });
        blogApi.getBlogsApi(page,txt,action)
            .then(function (res) {
                dispatch({
                    type: types.GET_LIST_BLOG_SUCCESS,
                    blogs: res.data.blogs,
                    total_pages : res.data.paginator.total_pages,
                    current_page : res.data.paginator.current_page
                });
            })
            .catch(function (error) {
                dispatch({
                    type : types.GET_LIST_BLOG_ERROR
                })
                throw (error);
            });
    }
}



export function getDetailBlog(id){
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_DETAIL_BLOG
        });
       blogApi.detailBlogApi(id)
            .then(function (res) {
                dispatch({
                    type: types.GET_DETAIL_BLOG_SUCCESS,
                    detailBlog: res.data.data.product
                });
            })
            .catch(function (error) {
               throw (error);
            });
    }
}

