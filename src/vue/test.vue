<template>
    <div class="test">
        <h2>{{ message }}</h2>
        <div>
            <router-link to="/">首页</router-link>
            <router-link to="/component">组件</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/jsx">
export default {
    name: 'App',
    data() {
        return {
            message: 'App Entry!',
        };
    },
};
</script>

<style>
.test {
    color: #fff;
}
</style>
