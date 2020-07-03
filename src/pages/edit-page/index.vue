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
                <div class="canvas-box" @click="goClip">
                    <img class="canvas" v-if="pic" :src="pic"/>
                </div>

                <NowTagView class="now-tag" ref="now" @add="onAdd"/>
                <LatelyTagView class="lately-tag" @choose="onChoose"/>

                <div class="info-box">
                    描述：<textarea class="info" rows="3"></textarea>
                </div>

                <InputView ref="input" @input="onInput"></InputView>

                <div class="btn" @click="onClip">裁剪</div>
                <div class="tip" v-if="preview">图片尺寸: {{clipWidth}} x {{clipHeight}}</div>
                <img class="pic" v-if="preview" :src="preview"/>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '@/components/page-view/index.vue'
// import TagView from '../tag-view/index.vue'
import LatelyTagView from '@/components/lately-tag-view/index.vue'
import NowTagView from '@/components/now-tag-view/index.vue'
import InputView from '@/components/input-view/index.vue'
import { mapState, mapMutations } from 'vuex'
import tooler from '@/core/tooler'
import yunTooler from '@/core/yuntTooler'

export default {
    props: {},
    data() {
        return {
            pic: null,
            preview: null,
            width: 0,
            height: 0,
            clipWidth: 0,
            clipHeight: 0,
        };
    },
    components: {PageView, InputView, LatelyTagView, NowTagView},
    computed:{
        ...mapState(['pics', 'id', 'tags', 'clipData'])
    },
    async mounted() {
        console.log(this.$route, 'this.$route mounted');
        this.changeId(Number(this.$route.query.id));
        this.pic = this.pics[this.id];
    },
    beforeRouteEnter(to, from, next){
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        console.log("进入页面", to, from);
        next(vm => {
            console.log('== beforeRouteEnter nextTick ==', vm);
            console.log(vm.clipData);
            if(vm.clipData){
                vm.preview = window.URL.createObjectURL(vm.clipData.blob);
            }
            
        });
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        this.changeClipData(null);
        console.log("离开页面")
        next();
    },
    methods:{
        ...mapMutations(['changePics', 'changeId', 'addTag', 'changeClipData']),
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
        },
        goClip(){
            this.$router.push({ path: '/clip', query: { url: encodeURIComponent(this.pic) }});
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
