<template>
    <div class="list-view">
        <div class="header">
            <div class="title">图片列表</div>
            <span class="iconfont icon-tianjia"></span>
        </div>
        <div class="content">
            <div class="list">
                <div class="item" v-for="(item, index) in list" v-bind:key="index" @click="onShow(index)"></div>
            </div>
        </div>
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
            src: null,
            list: [1,2,3,4,5,6,7]
        };
    },
    mounted() {
        
    },
    methods: {
        onShow(n){
            this.$router.push({ path: '/detail', query: { id: n }});
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
