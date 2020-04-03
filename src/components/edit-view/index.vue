<template>
    <div class="edit">
        <div class="title">图片编辑</div>
        <img class="img" v-if="src" :src="src"/>
        <div class="upload">点击上传图片</div>
        <div class="tip">添加：<input type="text"/> </div>
        <div class="tip">推荐：123</div>
        <div class="tip">标签：123</div>
    </div>
</template>

<script>
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';

// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            src: null
        };
    },
    mounted() {
        console.log(this.$route.query.id);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
