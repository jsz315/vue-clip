<template>
    <div class="clip-view">
        <PageView>
            <template v-slot:header>
                <span class="iconfont icon-liebiao" @click="onBack"></span>
                <div class="title">图片裁剪</div>
            </template>
            <template v-slot:content>
                <canvas class="canvas" ref="canvas"></canvas>
                <canvas class="draw" ref="draw"></canvas>
                <div class="tip">type: {{type}}</div>
                <div class="tip">scale: {{scale}}</div>
                <div class="tip">rotation: {{rotation}}</div>
                <div class="tip">x: {{x}}</div>
                <div class="tip">y: {{y}}</div>
                <div class="btn" @click="onClip">裁剪</div>
                <img class="pic" v-if="pic" :src="pic"/>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '../page-view/index.vue'
// import Hammer from 'hammerjs';
import draw from '../../core/draw';
import tooler from '../../core/tooler';
import { mapState, mapMutations } from 'vuex'

let isMobile = tooler.checkMobile();
let lastPoint;

export default {
    props: {},
    data() {
        return {
            rotation: 0,
            scale: 0,
            type: '',
            x: 0,
            y: 0,
            pic: null
        };
    },
    components: {PageView},
    computed:{
        ...mapState(['pics', 'id'])
    },
    mounted() {
        var canvas = this.$refs.canvas;
        var url = this.pics[this.id];
        draw.init(canvas, url, this.$refs.draw);
        var offset = tooler.getElementPosition(canvas);
        console.log(offset);

        canvas.addEventListener(isMobile ? "touchstart" : "mousedown", (e) => {
            if(isMobile){
                e = e.changedTouches[0];
            }
            lastPoint = {x: e.clientX, y: e.clientY};

            draw.start(e.clientX - offset.x, e.clientY - offset.y);
        })

        window.addEventListener(isMobile ? "touchmove" : "mousemove", (e) => {
            if(isMobile){
                e = e.changedTouches[0];
            }
            if(lastPoint){
                draw.move(e.clientX - lastPoint.x, e.clientY - lastPoint.y);
                lastPoint = {x: e.clientX, y: e.clientY};
            }
            
        })

        window.addEventListener(isMobile ? "touchend" : "mouseup", (e) => {
            if(isMobile){
                lastPoint = null;
            }

            lastPoint = null;
            draw.end();
            
            console.log(e);
        })
    },
    methods:{
        ...mapMutations(['changePics']),
        onClip(){
            this.pic = draw.clip();
        },
        onBack(){
            history.back();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
