import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeIndex from '../component/home/HomeIndex';
import PostIndex from '../component/post/PostIndex';

Vue.use(VueRouter);

export default new VueRouter({
   mode: 'history',
    routes: [
        { path: '/home', name: 'home' ,component: HomeIndex },
        { path: '/post/:id([0-9]+)', name: 'post', component: PostIndex },
        { path: '*', redirect: { name: 'home' } }
    ]
});