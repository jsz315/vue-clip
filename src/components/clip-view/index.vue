<template>
    <div class="clip-view">
        <PageView>
            <template v-slot:header>
                <!-- <span class="iconfont icon-liebiao" @click="onBack"></span> -->
                <div class="iconfont icon-liebiao" @click="onBack"></div>
                <div class="title">图片裁剪</div>
            </template>
            <template v-slot:content>
                <div class="tip">图片尺寸: {{width}} x {{height}}</div>
                <div class="canvas-box" ref="box">
                    <canvas class="canvas" ref="canvas"></canvas>
                </div>
                <canvas class="draw" ref="draw"></canvas>
                <div class="tags-box">
                    标签：
                    <div class="tags">
                        <TagView name="卡通" class="tag" v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7]" v-bind:key="index"></TagView>
                        <div class="ico add" @click="onAdd"></div>
                    </div>
                </div>
                <div class="tags-box">
                    推荐：
                    <div class="tags">
                        <TagView name="卡通" class="tag" v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7]" v-bind:key="index"></TagView>
                        <div class="ico refresh"></div>
                    </div>
                </div>
                <div class="info-box">
                    描述：<textarea class="info" rows="3"></textarea>
                </div>

                <InputView ref="input"></InputView>

                <div class="btn" @click="onClip">裁剪</div>
                <img class="pic" v-if="pic" :src="pic"/>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '../page-view/index.vue'
import TagView from '../tag-view/index.vue'
import InputView from '../input-view/index.vue'
// import Hammer from 'hammerjs';
import draw from '../../core/draw';
import tooler from '../../core/tooler';
import yunTooler from '../../core/yunTooler';
import { mapState, mapMutations } from 'vuex'

let isMobile = tooler.checkMobile();
let lastPoint;
let moveEvent;
let endEvent;

export default {
    props: {},
    data() {
        return {
            pic: null,
            width: 0,
            height: 0
        };
    },
    components: {PageView, TagView, InputView},
    computed:{
        ...mapState(['pics', 'id'])
    },
    async mounted() {
        console.log(this.$route, 'this.$route');


        this.changeId(Number(this.$route.query.id));

        var canvas = this.$refs.canvas;
        var url = this.pics[this.id];
        var offset = tooler.getElementPosition(this.$refs.box);
        console.log(offset);
        var img = await draw.init(canvas, url, this.$refs.draw, offset);
        this.width = img.width;
        this.height = img.height;
        // var offset = tooler.getElementPosition(canvas);

        this.$refs.box.addEventListener(isMobile ? "touchstart" : "mousedown", (e) => {
            e.preventDefault();
            if(isMobile){
                e = e.changedTouches[0];
            }
            lastPoint = {x: e.clientX, y: e.clientY};

            draw.start(e.clientX, e.clientY);
            
            moveEvent = tooler.addListener(window, isMobile ? "touchmove" : "mousemove", (e) => {
                if(isMobile){
                    e = e.changedTouches[0];
                }
                if(lastPoint){
                    draw.move(e.clientX - lastPoint.x, e.clientY - lastPoint.y);
                    lastPoint = {x: e.clientX, y: e.clientY};
                }
                
            })

            endEvent = tooler.addListener(window, isMobile ? "touchend" : "mouseup", () => {
                console.log('mouse up ==');
                if(isMobile){
                    lastPoint = null;
                }

                lastPoint = null;
                draw.end();
                
                moveEvent.destroy();
                endEvent.destroy();
            });

        })

        // window.addEventListener(isMobile ? "touchmove" : "mousemove", (e) => {
        //     if(isMobile){
        //         e = e.changedTouches[0];
        //     }
        //     if(lastPoint){
        //         draw.move(e.clientX - lastPoint.x, e.clientY - lastPoint.y);
        //         lastPoint = {x: e.clientX, y: e.clientY};
        //     }
            
        // })

        // window.addEventListener(isMobile ? "touchend" : "mouseup", () => {
        //     console.log('mouse up ==');
        //     if(isMobile){
        //         lastPoint = null;
        //     }

        //     lastPoint = null;
        //     draw.end();
        // })
    },
    methods:{
        ...mapMutations(['changePics', 'changeId']),
        async onClip(){
            this.pic = draw.clip();
            var fname = 'aaa.jpg';
            var file = tooler.dataURLtoFile(this.pic, fname);
            var res = await yunTooler.startUpload(file, '/', '/' + fname);
            if(res){
                this.$message({message:'上传成功'});
            }
            else{
                this.$message({message:'上传失败'});
            }
        },
        onBack(){
            console.log('clip back');
            history.back();
        },
        onAdd(){
            this.$refs.input.show();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
