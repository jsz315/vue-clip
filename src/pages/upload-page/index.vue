<template>
    <div class="upload-view">
        <PageView>
            <template v-slot:header>
                <span class="iconfont icon-fanhui2" @click="onBack"></span>
                <div class="title">上传图片</div>
            </template>
            <template v-slot:content>
                <div class="upload-box">
                    <DragView @drag="onDrag"></DragView>
                    <div class="file" @click="onOpen"><div class="ico"></div>点击选择上传文件</div>
                    <input v-show="false" ref="file" type="file" multiple="multiple" @change="onChange($event)"/>
                    <UrlView @url="onUrl"/>
                </div>
                <div class="list">
                    <div class="item" v-for="(item, index) in list" v-bind:key="index" @click="onEdit(item)">
                        <img class="img" :src="fileToImage(item)"/>
                    </div>
                </div>
                <ReflashView @reflash="onReflash"></ReflashView>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '@/components/page-view/index.vue'
import UrlView from '@/components/url-view/index.vue'
import ReflashView from '@/components/reflash-view/index.vue'
import DragView from '@/components/drag-view/index.vue'
import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import cosTooler from '../../core/cosTooler';

// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            list: []
        };
    },
    components: {PageView, ReflashView, DragView, UrlView},
    mounted() {
        if(this.clipData){
            this.list.push(this.clipData);
        }
    },
    computed: {
        ...mapState(['pics', 'id', 'clipData'])
    },
    beforeRouteEnter(to, from, next){
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        console.log("进入页面", to, from);
        next();
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        this.changeClipData(null);
        console.log("离开页面")
        next();
    },
   
    
    methods: {
        ...mapMutations(['changePics', 'changeId', 'changeClipData']),
        fileToImage(file){
            if(file.type == "img"){
                return file.src;
            }
            if(file.type == "complete"){
                return window.URL.createObjectURL(file.blob);
            }
            return window.URL.createObjectURL(file);
        },
        onEdit(n){
            // this.changeId(n);
            // this.$router.push({ path: '/detail', query: { id: n }});
            this.$router.push({ path: '/edit', query: { url: encodeURIComponent(this.fileToImage(n)) }});
            // this.$router.push({ name: 'clip', params: { pic: n } });
        },
        onOpen(){
            this.$refs.file.click();
        },
        onUrl(url){
            console.log(url);
            this.list.push({type: "img", src: url});
        },
        onChange(e){
            console.log(e);
            var files = e.target.files;
            for(var i = 0; i < files.length; i++){
                this.list.push(files[i]);
                // cosTooler.putObject(files[i], files[i].name, e => {console.log(e)});
            }

        },
        onBack(){
            history.back();
        },
        onReflash(){
            this.list = [];
        },
        onDrag(files){
            console.log(files);
            for(var i = 0; i < files.length; i++){
                this.list.push(files[i]);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
