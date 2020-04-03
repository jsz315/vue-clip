<template>
    <div class="detail-view">
        <!-- <div class="pic" :style="{backgroundImage: 'url(/man.jpg)'}"></div> -->
        <img class="pic" :src="src"/>
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
            src: '/man.jpg'
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
