import Vue from 'vue';
import _ from 'lodash';
import App from './src/component/App';
import router from './src/router';
import store from './src/store';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style/main/style.scss';
import './style/mdb.scss';

new Vue({
   components: { App },
    template: '<App></App>',
    router,
    store,
    created: function () {
        this.$store.dispatch('post/fetchAllPosts');
    }
}).$mount('#app');