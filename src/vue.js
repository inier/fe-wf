import Vue from 'vue';
import './style/index.scss';

// 定义一个名为 button-counter 的新组件
Vue.component('ButtonCounter', {
    data: function() {
        return {
            message: 'Runoob!',
            count: 0,
        };
    },
    template:`
    <div class="test">
        <button v-on:click="count++">You clicked me {{ count }} times.</button>
        <p>{{ message }}</p>
        <input v-model="message" />
    </div>
    `,
});

new Vue({
    el: '#root',
    components: {
        ButtonCounter,
    },
});

