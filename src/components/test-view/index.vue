<template>
    <div class="test-view">
        <canvas class="canvas" ref="canvas"></canvas>
        <div class="btn" @click="onAdd">添加图形</div>
        <div class="btn" @click="onCompute">运算</div>
        <canvas class="result" ref="result"></canvas>
    </div>
</template>

<script>
// import Hammer from 'hammerjs';
import draw from '../../core/draw';
import tooler from '../../core/tooler';
import shape from '../../core/shape';

let isMobile = tooler.checkMobile();
let lastPoint;

export default {
    props: {},
    data() {
        return {
            
        };
    },
    async mounted() {
        var canvas = this.$refs.canvas;
        await draw.init(canvas, '/man.jpg', this.$refs.draw);

        var offset = tooler.getElementPosition(canvas);
        console.log(offset);

        canvas.addEventListener(isMobile ? "touchstart" : "mousedown", (e) => {
            e.preventDefault();
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
            console.log(e);
            lastPoint = null;
            draw.end();
        })

        this.initResult();

    },
    methods:{
        initResult(){
            var canvas = this.$refs.canvas;
            shape.init(this.$refs.result, canvas.width, canvas.height);
        },
        onAdd(){
            var bound = draw.getBound();
            shape.add(bound);
        },
        onCompute(){
            shape.compute();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
