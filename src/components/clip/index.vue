<template>
    <div class="clip">
        <div class="title">图片裁剪</div>

        <canvas class="canvas" ref="canvas"></canvas>
        
        <canvas class="draw" ref="draw"></canvas>
        <div class="tip">type: {{type}}</div>
        <div class="tip">scale: {{scale}}</div>
        <div class="tip">rotation: {{rotation}}</div>
        <div class="tip">x: {{x}}</div>
        <div class="tip">y: {{y}}</div>
        <div class="btn" @click="onClip">裁剪</div>
        <img class="pic" v-if="pic" :src="pic"/>
    </div>
</template>

<script>
// import Hammer from 'hammerjs';
import draw from '../../core/draw';
import tooler from '../../core/tooler';

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
    mounted() {
        var canvas = this.$refs.canvas;
        draw.init(canvas, '/man.jpg', this.$refs.draw);

        // var vm = this;
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

        // var mc = new Hammer.Manager(canvas);

        // mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        // mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
        // mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);
        // mc.add(new Hammer.Tap());

        // mc.on("panstart panmove", onPan);
        // mc.on("rotatestart rotatemove", onRotate);
        // mc.on("pinchstart pinchmove", onPinch);
        // mc.on("tap", onTap);

        // mc.on("hammer.input", function(ev) {
        //     if(ev.isFirst){
        //         console.log('开始');
        //         console.log(ev);
        //         vm.type = '开始';
        //         let p = ev.changedPointers[0];
        //         draw.start(p.clientX, p.clientY);
        //     }
        //     if(ev.isFinal) {
        //         console.log('结束');
        //         draw.end();
        //         vm.type = '结束';
        //     }
        // });
    
        // function onPan(ev) {
        //     console.log('onPan');
        //     console.log(ev);
        //     vm.type = 'onPan';
        //     vm.x = ev.deltaX;
        //     vm.y = ev.deltaY;
        //     draw.move(ev.deltaX, ev.deltaY);
        // }

        // function onPinch(ev) {
        //     console.log('onPinch');
        //     console.log(ev);
        //     console.log(ev.scale);
        //     vm.scale = ev.scale;
        //     draw.scale(ev.scale);
        //     // vm.type = 'onPinch';
        // }

        // function onRotate(ev) {
        //     console.log('onRotate');
        //     console.log(ev);
        //     // console.log(ev.rotation);
        //     vm.rotation = ev.rotation;
        //     vm.type = 'onRotate';
        // }

        // function onTap(ev) {
        //     console.log('onTap');
        //     console.log(ev);
        //     vm.type = 'onTap';
        // }

    },
    methods:{
        onClip(){
            this.pic = draw.clip();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
