import Vue from 'vue'
import Vuex from 'vuex'
import postStore from './post/PostStore'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        post: postStore
    }
});