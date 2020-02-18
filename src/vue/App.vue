<template>
    <div id="app">
        <Header></Header>
        <Todo></Todo>
        <Test></Test>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './todo/header.vue';
import Footer from './todo/footer.jsx';
import Todo from './todo/todo.vue';
import Test from './test.vue';

export default {
    components: {
        Header,
        Footer,
        Todo,
        Test,
    },
};
</script>

<style lang="scss" scoped>
#app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    #cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #999;
        opacity: 0.2;
        z-index: -1;
    }
}
</style>