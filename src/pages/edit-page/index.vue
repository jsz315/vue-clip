<template>
    <div class="clip-view">
        <PageView>
            <template v-slot:header>
                <!-- <span class="iconfont icon-liebiao" @click="onBack"></span> -->
                <div class="iconfont iconfanhui" @click="onBack"></div>
                <div class="title">图片编辑</div>
            </template>
            <template v-slot:content>
                <div class="canvas-box" @click="goClip">
                    <img class="canvas" v-if="pic" :src="pic" />
                </div>
                <div class="tip">图片尺寸: {{width}} x {{height}}</div>

                <NowTagView class="now-tag" ref="now" @add="onAdd" />
                <LatelyTagView class="lately-tag" @choose="onChoose" />

                <div class="info-box">
                    描述：<textarea class="info" rows="3" v-model="desc"></textarea>
                </div>

                <InputView ref="input" @input="onInput"></InputView>

                <div class="btn" @click="onUpload" :class="{enable}">确定</div>
                <!-- <div class="tip" v-if="preview">图片尺寸: {{clipWidth}} x {{clipHeight}}</div>
                <img class="pic" v-if="preview" :src="preview" /> -->

                <ProgressView ref="progress" v-show="!enable"></ProgressView>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from "@/components/page-view/index.vue";
// import TagView from '../tag-view/index.vue'
import LatelyTagView from "@/components/lately-tag-view/index.vue";
import NowTagView from "@/components/now-tag-view/index.vue";
import InputView from "@/components/input-view/index.vue";
import ProgressView from "@/components/progress-view/index.vue";
import { mapState, mapMutations } from "vuex";
// import tooler from "@/core/tooler";
import yunTooler from "@/core/yunTooler";
// import _ from 'lodash';

export default {
    props: {},
    data() {
        return {
            pic: null,
            cur: null,
            width: 0,
            height: 0,
            clipWidth: 0,
            clipHeight: 0,
            id: 0,
            desc: "",
            enable: true
        };
    },
    components: { PageView, InputView, LatelyTagView, NowTagView, ProgressView },
    computed: {
        ...mapState(["pics", "tags", "clipData"])
    },
    async mounted() {
        console.log(this.$route, "this.$route mounted");
        // this.changeId(Number(this.$route.query.id));
        // this.id = this.$route.query.id;
        // this.pic = this.$route.query.url;
    },
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        console.log("进入页面", to, from);
        next(vm => {
            console.log("== beforeRouteEnter nextTick ==", vm);
            console.log(vm.clipData);
            vm.id = vm.$route.query.id;
            vm.enable = true;
            if (vm.clipData) {
                vm.pic = window.URL.createObjectURL(vm.clipData.blob);
            }
            else{
                vm.pic = decodeURIComponent(vm.$route.query.url);
                vm.cur = vm.pics[vm.id];
            }
            vm.resetSize();
        });
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        this.changeClipData(null);
        // this.cur = null;
        console.log("离开页面");
        next();
    },
    methods: {
        ...mapMutations(["changePics", "changeId", "addTag", "changeClipData"]),
        resetSize(){
            var img = new Image();
            img.onload = ()=>{
                this.width = img.naturalWidth;
                this.height = img.naturalHeight;
            }
            img.src = this.pic;

            if(this.cur){
                var tags = this.cur.tags.split(",");
                var list = [];
                tags.forEach(item=>{
                    console.log(this.tags);
                    var obj = this.tags.find(m => m.id == item);
                    if(obj){
                        list.push(obj);
                    }
                }, this)
                console.log(this.cur, "this.cur");
                console.log(tags, "tags");
                this.desc = this.cur.desc;
                this.$refs.now.setTags(list);
            }
        },
        onProgress(n){
            console.log(Math.floor(n * 100) + "%");
            this.$refs.progress.show(Math.floor(n * 100));
        },
        onUpload: async function() {
            if(!this.enable){
                console.log("已经在上传中");
                return;
            }
            this.enable = false;
            console.log(this, "this");
            var tags = this.$refs.now.getTags();
            var src = this.clipData ? this.clipData.url : this.pic;
            var res;
            if(this.id){
                if(this.clipData){
                    console.log("图片有修改");
                    res = await yunTooler.editResource(this.cur.id, tags, this.desc, src, this.cur.name, this.onProgress);
                }
                else{
                    console.log("图片未修改")
                    res = await yunTooler.editResource(this.cur.id, tags, this.desc);
                }
            }
            else{
                console.log('新增');
                res = await yunTooler.addResource(src, tags, this.desc, this.onProgress);
            }
            if(res.data.res){
                this.$toast({message: "操作成功"});
                history.back();
            }
            this.enable = true;
           
        },
        onBack() {
            console.log("clip back");
            history.back();
        },
        onAdd() {
            this.$refs.input.show();
        },
        onChoose(n) {
            this.$refs.now.push(n);
        },
        onInput(word) {
            console.log(word);
            var list = word.split(/\s+/g);
            list.forEach(item => {
                if (item) {
                    var obj = this.tags.find(m => m.name == item);
                    if(obj){
                        // list.push(obj);
                        this.$refs.now.push(obj);
                    }
                    // this.addTag(item);
                    // this.$refs.now.push(item);
                }
            });
        },
        goClip() {
            this.$router.push({
                path: "/clip",
                query: { url: encodeURIComponent(this.pic) }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
