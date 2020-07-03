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
                <!-- <div class="tags-box">
                    标签：
                    <div class="tags">
                        <TagView :name="item" class="tag" v-for="(item, index) in tags" v-bind:key="index"></TagView>
                        <div class="ico add" @click="onAdd"></div>
                    </div>
                </div> -->

                <NowTagView class="now-tag" ref="now" @add="onAdd"/>
                <LatelyTagView class="lately-tag" @choose="onChoose"/>

                <div class="info-box">
                    描述：<textarea class="info" rows="3"></textarea>
                </div>

                <InputView ref="input" @input="onInput"></InputView>

                <div class="btn" @click="onClip">裁剪</div>
                <div class="tip" v-if="pic">图片尺寸: {{clipWidth}} x {{clipHeight}}</div>
                <img class="pic" v-if="pic" :src="pic"/>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '../page-view/index.vue'
// import TagView from '../tag-view/index.vue'
import LatelyTagView from '../lately-tag-view/index.vue'
import NowTagView from '../now-tag-view/index.vue'
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
            height: 0,
            clipWidth: 0,
            clipHeight: 0,
        };
    },
    components: {PageView, InputView, LatelyTagView, NowTagView},
    computed:{
        ...mapState(['pics', 'id', 'tags'])
    },
    async mounted() {
        console.log(this.$route, 'this.$route');

        var canvas = this.$refs.canvas;
        var offset = tooler.getElementPosition(this.$refs.box);
        console.log(offset);

        this.changeId(Number(this.$route.query.id));
        var url = this.pics[this.id];
        var size;
        if(this.$route.params.pic){
            size = await draw.parse(canvas, this.$route.params.pic, this.$refs.draw, offset);
        }
        else{
            size = await draw.init(canvas, url, this.$refs.draw, offset);
        }
        
        this.width = size.width;
        this.height = size.height;

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
    },
    methods:{
        ...mapMutations(['changePics', 'changeId', 'addTag']),
        async onClip(){
            var data = draw.clip();
            this.pic = data.src;
            this.clipWidth = data.width;
            this.clipHeight = data.height;
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
        },
        onChoose(n){
            this.$refs.now.push(n);
        },
        onInput(word){
            console.log(word);
            var list = word.split(/\s+/g);
            list.forEach(item => {
                if(item){
                    // this.addTag(item);
                    this.$refs.now.push(item);
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
