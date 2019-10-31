import PostApi from '../../api/post/PostApi'

const FETCHING_POSTS = 'FETCHING_POST',
    FETCHING_POSTS_SUCCESS = 'FETCHING_POST_SUCCESS',
    FETCHING_POSTS_ERROR = 'FETCHING_POST_ERROR',
    SETTING_ID = 'SETTING_ID',
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
        posts: null,
        post: null,
        id: null,
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
            return state.posts.find(function (post) {
                return post.id == state.id;
            });
        },
        getFilterPost: function (state) {
            if (state.search != '') {
                return state.posts.filter(function (post) {
                    return post.name.toLowerCase().includes(state.search);
                });
            } else {
                return state.posts;
            }
        }
    },
    mutations: {
        [FETCHING_POSTS](state) {
            state.isLoading = true;
            state.error = null;
            state.posts = null;
        },
        [FETCHING_POSTS_SUCCESS](state,posts) {
            state.isLoading = false;
            state.error = null;
            state.posts = posts;
        },
        [FETCHING_POSTS_ERROR](state,error) {
            state.isLoading = false;
            state.error = error;
            state.posts = null;
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
        [DELETING_SINGLE_POST_SUCCESS](state,id) {
            state.isLoading = false;
            state.error = null;
            state.posts = state.posts.filter(function (post) {
               return post.id != id;
            });
        },
        [DELETING_SINGLE_POST_ERROR](state,error) {
            state.isLoading = false;
            state.error = error;
        },
        [SETTING_SEARCH](state,search) {
            state.search = search;
        },
        [SETTING_ID](state,id) {
            state.id= id;
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
        deletingPost: async function (store,id) {
            store.commit(DELETING_SINGLE_POST);
            try {
                let response = await PostApi.deletingPost(id);
                store.commit(DELETING_SINGLE_POST_SUCCESS,id);
                return response.data;
            } catch (error) {
                store.commit(DELETING_SINGLE_POST_ERROR,error);
                return error;
            }
        },
        SETTING_SEARCH(store,search) {
            store.commit(SETTING_SEARCH,search);
        },
        SETTING_ID(store,id) {
            store.commit(SETTING_ID,id);
        }
    }
}