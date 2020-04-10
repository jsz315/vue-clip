<template>
    <div class="edit-view">
        <PageView>
            <template v-slot:header>
                <div class="title">图片编辑</div>
                <span class="iconfont icon-bianji" @click="onEdit"></span>
            </template>
            <template v-slot:content>
                <div class="title">图片编辑</div>
                <img class="img" v-if="src" :src="src"/>
                <div class="upload">点击上传图片</div>
                <div class="tip">添加：<input type="text"/> </div>
                <div class="tip">推荐：123</div>
                <div class="tip">标签：123</div>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '../page-view/index.vue'
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
    components: {PageView},
    mounted() {
        console.log(this.$route.query.id);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
