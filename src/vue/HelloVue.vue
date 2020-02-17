<template>
    <div class="hello-vue">
        <h1>Hello Vue</h1>
        <p>{{ message }}</p>
        <input v-model="message" />
    </div>
</template>

<script type="text/jsx">
export default {
    //这里需要将模块引出，可在其他地方使用
    name: 'HelloVue',
    data() {
        return {
            message: 'Vue, ok!',
        };
    },
};
</script>

<style>
.hello-vue {
  color: red;
  font-size: 28px;
}
</style>
