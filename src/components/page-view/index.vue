<template>
    <div class="page-view">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
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
            list: [1, 2, 3, 4, 5, 6, 7]
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
