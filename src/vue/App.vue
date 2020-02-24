<template>
    <div id="root" class="center">
        <Header></Header>
        <div class="menu center">
            <router-link to="/">首页</router-link>
            <router-link to="/component">组件</router-link>
            <router-link to="/todo">Todo</router-link>
        </div>
        <router-view class="view center"></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.jsx';

export default {
    components: {
        Header,
        Footer,
    },
};
</script>

<style lang="scss" scoped>
#root {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    min-width: 640px;
    flex-direction: column;

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

    .menu {
        height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 18px;
        background-color: rgba(255, 255, 255, 0.8);

        a {
            margin: 0 10px;
        }

        .active {
            color: #f33;
        }
    }

    .view {
        flex-direction: column;
        box-sizing: border-box;
        padding: 20px;
        min-height: 50vh;
        background-color: rgba(255, 255, 255, 0.3);
    }

    .menu,
    .view {
        width: 80%;
    }
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>