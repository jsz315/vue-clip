<template>
    <div class="detail-view">
        <PageView>
            <template v-slot:header>
                <span class="iconfont icon-liebiao" @click="onBack"></span>
                <div class="title">图片详情</div>
                <span class="iconfont icon-bianji" @click="onEdit"></span>
            </template>
            <template v-slot:content>
                <div class="size" ref="box">
                    <div class="list" ref="list" :class="{move}" :style="{'transform': 'translateX(' + x + 'px)'}">
                        <div class="pic-box" v-for="item in list" v-bind:key="item.id">
                            <img class="pic" :src="item"/>
                        </div>
                    </div>
                </div>
            </template>
        </PageView>
        <!-- <div class="pic" :style="{backgroundImage: 'url(/man.jpg)'}"></div> -->
    </div>
</template>

<script>
import PageView from '../page-view/index.vue'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
import tooler from '../../core/tooler';
import { mapState, mapMutations } from 'vuex'

let isMobile = tooler.checkMobile();
let lastPoint;
let startPoint;

export default {
    props: {},
    data() {
        return {
            list: [],
            x: 0,
            move: true
        };
    },
    components: {PageView},
    computed:{
        ...mapState(['pics', 'id'])
    },
    mounted() {
        // var list = this.$refs.list;
        console.log('== detail-view mounted ==');
        console.log(this.$route, 'route');
        this.changeId(Number(this.$route.query.id));

        this.$nextTick(()=>{
            console.log('== detail-view nextTick ==');
            this.resetPic();
        })
        
        var box = this.$refs.box;
        box.addEventListener(isMobile ? "touchstart" : "mousedown", (e) => {
            e.preventDefault();
            if(isMobile){
                e = e.changedTouches[0];
            }
            
            lastPoint = {x: e.clientX, y: e.clientY};
            startPoint = {x: e.clientX, y: e.clientY};
        })
        box.addEventListener(isMobile ? "touchmove" : "mousemove", (e) => {
            if(isMobile){
                e = e.changedTouches[0];
            }
            if(lastPoint){
                this.x += e.clientX - lastPoint.x;
                lastPoint = {x: e.clientX, y: e.clientY};
            }
        })

        box.addEventListener(isMobile ? "touchend" : "mouseup", (e) => {
            if(isMobile){
                e = e.changedTouches[0];
            }
            if(lastPoint){
                lastPoint = null;
                var distance = e.clientX - startPoint.x;
                if(distance > 200){
                    console.log("左移");
                    this.x = window.innerWidth;
                    this.changePrev();
                    setTimeout(() => {
                        console.log('resetPic');
                        this.resetPic();
                    }, 300);
                }
                else if(distance < -200){
                    console.log("右移");
                    this.x = -window.innerWidth;
                    this.changeNext();
                    setTimeout(() => {
                        console.log('resetPic');
                        this.resetPic();
                    }, 300);
                }
                else{
                    console.log("恢复");
                    this.x = 0;
                }
            }
            console.log(e);
        })
        

        // var mc = new Hammer.Manager(document.body);
        // var pinch = new Hammer.Pinch();
        // var rotate = new Hammer.Rotate();
        // pinch.recognizeWith(rotate);
        // mc.add([pinch, rotate]);
        // mc.on("pinch rotate", function(ev) {
        //     console.log(ev.type + " ");
        // });
        
    },
    methods:{
        ...mapMutations(['changeId', 'changeNext', 'changePrev']),
        resetPic(){
            this.move = false;
            var temp = [];
            temp.push(this.getPic(this.id - 1));
            temp.push(this.getPic(this.id));
            temp.push(this.getPic(this.id + 1));
            this.list = temp;
            console.log(this.list, 'list');
            this.x = 0;
            setTimeout(() => {
                this.move = true;
            }, 30);
        },
        getPic(n){
            var pics = this.pics;
            if(n < 0){
                return pics[pics.length - 1];
            }
            if(n >= pics.length){
                return pics[n % pics.length];
            }
            return pics[n];
        },
        onEdit(){
            this.$router.push({ path: '/clip', query: { id: this.id }});
        },
        onBack(){
            console.log('detail back');
            history.back();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
