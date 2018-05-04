export default {
    login: {
        login: {},
        loginStatus: false,
        token: null,
        isLoading: false,
        error: false,
        result: false,
        isGetLocalData: false,
        status: 0,
        user: {},
        url: '',
    },

    blog: {
        isSearch: false,
        isLoadingDetail: false,
        isLoadingRefresh: false,
        isLoading: false,
        blogs: [],
        detailBlog: {},
        total_pages: 1,
        current_page: 0,
        errorBlog: false
    },

    base: {
        isLoading: false,
        isLoadingRefresh: false,
        isLoadingMore: false,
        total_pages: 0,
        bases: [],
        isLoadingProvinces: false,
        provinces: [],
    },

    register: {
        name: "",
        email: "",
        isLoading: false,
        error: false,
        status: 0,
        token: null,
    },
    drawer : {
        isLoadingTabs : false,
        errorTabs : false,
        tabs : []
    }
}
