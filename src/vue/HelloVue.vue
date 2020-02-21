<template>
    <div class="hello-vue">
        <h1>{{ message }}</h1>
        <input v-model="message" />
    </div>
</template>

<script type="text/jsx">
export default {
    //这里需要将模块引出，可在其他地方使用
    name: 'HelloVue',
    data() {
        return {
            message: 'Hello Vue!',
        };
    },
};
</script>

<style lang="scss">
.hello-vue {
    color: red;
    font-size: 16px;

    h1 {
        margin-top: 0;
    }

    input {
        height: 35px;
    }
}
</style>
