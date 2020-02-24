<template>
    <div class="btn-area">
        <button class="btn" v-on:click="count++">
            You clicked me <span class="count">{{ count }}</span> times.
        </button>
    </div>
</template>

<script type="text/jsx">
export default {
    name: 'ButtonCounter',
    data() {
        return {
            message: 'Runoob!',
            count: 0,
        };
    },
};
</script>

<style lang="scss">
.btn {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    border: none;
    font-size: 18px;
    background-color: aquamarine;
    outline: none;
    transition: background-color 0.6s ease-out;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: darken(aquamarine, 20%);
        transition: background-color 0.6s ease-in;
    }

    &:active {
        background-color: darken(aquamarine, 10%);
        transition: background-color 0.6s ease-in;
    }

    .count {
        color: red;
    }
}
</style>
