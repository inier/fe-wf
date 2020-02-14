<template>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
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

<style></style>
