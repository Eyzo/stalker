import PostApi from '../../api/post/PostApi'

const FETCHING_POSTS = 'FETCHING_POST',
    FETCHING_POSTS_SUCCESS = 'FETCHING_POST_SUCCESS',
    FETCHING_POSTS_ERROR = 'FETCHING_POST_ERROR',
    FETCHING_SINGLE_POST = 'FETCHING_SINGLE_POST',
    FETCHING_SINGLE_POST_SUCCESS = 'FETCHING_SINGLE_POST_SUCCESS',
    FETCHING_SINGLE_POST_ERROR = 'FETCHING_SINGLE_POST_ERROR',
    UPDATING_SINGLE_POST = 'UPDATING_SINGLE_POST',
    UPDATING_SINGLE_POST_SUCCESS = 'UPDATING_SINGLE_POST_SUCCESS',
    UPDATING_SINGLE_POST_ERROR = 'UPDATING_SINGLE_POST_ERROR',
    DELETING_SINGLE_POST = 'DELETING_SINGLE_POST',
    DELETING_SINGLE_POST_SUCCESS = 'DELETING_SINGLE_POST_SUCCESS',
    DELETING_SINGLE_POST_ERROR = 'DELETING_SINGLE_POST_ERROR',
    SETTING_SEARCH = 'SETTING_SEARCH';

export default {
    namespaced: true,
    state: {
        isLoading: true,
        error: null,
        posts: [],
        post: null,
        search: '',
    },
    getters: {
        getLoading: function (state) {
            return state.isLoading;
        },
        getError: function (state) {
            return state.error;
        },
        getPosts: function (state) {
            return state.posts;
        },
        getPost: function (state) {
            return state.post;
        },
        getFilterPost: function (state) {
            if (state.search != '') {
                return state.posts[0].filter(function (post) {
                    return post.name.toLowerCase().includes(state.search);
                });
            } else {
                return state.posts[0];
            }
        }
    },
    mutations: {
        [FETCHING_POSTS](state) {
            state.isLoading = true;
            state.error = null;
            state.posts = [];
        },
        [FETCHING_POSTS_SUCCESS](state,posts) {
            state.isLoading = false;
            state.error = null;
            state.posts.unshift(posts);
        },
        [FETCHING_POSTS_ERROR](state,error) {
            state.isLoading = false;
            state.error = error;
            state.posts = [];
        },
        [FETCHING_SINGLE_POST](state) {
            state.loading = true;
            state.error = null;
            state.post = null;
        },
        [FETCHING_SINGLE_POST_SUCCESS](state,post) {
            state.loading = false;
            state.error = null;
            state.post = post;
        },
        [FETCHING_SINGLE_POST_ERROR](state,error) {
            state.loading = false;
            state.error = error;
            state.post = null
        },
        [UPDATING_SINGLE_POST](state) {
            state.loading = true;
            state.error = null;
            state.post = null;
        },
        [UPDATING_SINGLE_POST_SUCCESS](state,post) {
            state.loading = false;
            state.error = null;
            state.post = post;
        },
        [UPDATING_SINGLE_POST_ERROR](state,error) {
            state.loading = false;
            state.error = error;
            state.post = null;
        },
        [DELETING_SINGLE_POST](state) {
            state.isLoading = true;
            state.error = null;
        },
        [DELETING_SINGLE_POST_SUCCESS](state) {
            state.isLoading = false;
            state.error = null;
        },
        [DELETING_SINGLE_POST_ERROR](state,error) {
            state.isLoading = false;
            state.error = error;
        },
        [SETTING_SEARCH](state,search) {
            state.search = search;
        }
    },
    actions: {
        fetchAllPosts: async function (store) {
            store.commit(FETCHING_POSTS);
            try {
                let response = await PostApi.getAllPosts();
                store.commit(FETCHING_POSTS_SUCCESS,response.data);
                return response.data;
            } catch (error) {
                store.commit(FETCHING_POSTS_ERROR,error);
                return error;
            }
        },
        fetchPost: async function (store,id) {
            store.commit(FETCHING_SINGLE_POST);
            try {
                let response = await PostApi.findPost(id);
                store.commit(FETCHING_SINGLE_POST_SUCCESS,response.data);
                return response.data;
            } catch (error) {
                store.commit(FETCHING_SINGLE_POST_ERROR,error);
                return error;
            }
        },
        deletingPost: async function (store,id) {
            store.commit(DELETING_SINGLE_POST);
            try {
                let response = await PostApi.deletingPost(id);
                store.commit(DELETING_SINGLE_POST_SUCCESS);
                return response.data;
            } catch (error) {
                store.commit(DELETING_SINGLE_POST_ERROR,error);
                return error;
            }
        },
        SETTING_SEARCH(store,search) {
            store.commit(SETTING_SEARCH,search);
        }
    }
}