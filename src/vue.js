import Vue from 'vue';
import App from './vue/App.vue';

import './style/index.css';
import './assets/styles/style.styl';
import './assets/styles/global.styl';

// 引入路由
// router变量 一定要小写，不要写成Router, 否则报 can't match的报错
import router from './vue/router.js';

new Vue({
    el: '#root',
    router,
    render: (h) => h(App),
});
