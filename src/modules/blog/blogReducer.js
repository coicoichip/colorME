import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function blogReducer(state = initialState.blog, action) {
    switch (action.type) {
        case types.BEGIN_GET_DETAIL_BLOG:
            return {
                ...state,
                ...{
                    isLoadingDetail: true,
                }
            };
        case types.GET_DETAIL_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    detailBlog: action.detailBlog,
                    isLoadingDetail: false,
                }
            };

            case types.BEGIN_GET_LIST_BLOG:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
            case types.BEGIN_SEARCH_LIST_BLOG:
            return {
                ...state,
                ...{
                    isSearch: true,
                }
            };
            case types.BEGIN_REFRESH_LIST_BLOG:
            return {
                ...state,
                ...{
                    isLoadingRefresh: true,
                }
            };
        case types.GET_LIST_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    current_page : action.current_page,
                    total_pages : action.total_pages,
                    blogs: action.current_page === 1 ? action.blogs : [...state.blogs, ...action.blogs],
                    isLoading: false,
                    isLoadingRefresh : false,
                    isSearch : false,
                }
            };
          
            case types.GET_LIST_BLOG_ERROR:
            return {
                ...state,
                ...{
                    errorBlog : true,
                    isLoading : false,
                    isLoadingRefresh : false
                }
            }
        default:
            return state
    }
}
