import Vue from 'vue';
import Router from 'vue-router';
import HelloVue from './HelloVue.vue';
import ButtonCounter from './ButtonCounter.vue';
import Todo from './todo/index.vue';

Vue.use(Router);

export default new Router({
    // hash或history， vue路由history模式刷新页面出现404问题
    mode: 'hash',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloVue,
        },
        {
            path: '/component',
            name: 'fine3',
            component: ButtonCounter,
        },
        {
            path: '/todo',
            name: 'todo',
            component: Todo,
        },
    ],
});
