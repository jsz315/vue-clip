<template>
    <div class="move-view">
        <div class="list">
            <div class="item" v-for="(item, index) in list" :key="item.id">
                <div class="img" :style="{'background-image': 'url(' + getPath(item.name) + ')'}"></div>
                <div class="name">{{index + 1}}. {{item.name}}</div>
                <div class="percent" :class="{over: item.percent == 1}">{{item.percent == 1 ? "上传完成" : item.percent}}</div>
            </div>
        </div>
        <div class="state">
            <div class="info">
                <div class="page">当前页：<input type="text" class="num" v-model="curPage"></div>
                <div class="success">成功数：{{success}}</div>
                <div class="error">失败数：{{error}}</div>
                <div class="pass">跳过数：{{pass}}</div>
            </div>
            <div class="btn" @click="toggler" :class="{running}">{{running ? "停止" : "运行"}}</div>
        </div>
        <div class="search">
            <input v-model="fileName" type="text" class="file-name"/>
            <div class="btn" @click="search">搜索</div>
        </div>
        
        <canvas v-show="false" ref="canvas"></canvas>
    </div>
</template>

<script>
// import PageView from '@/components/page-view/index.vue'
// import ReflashView from '@/components/reflash-view/index.vue'
// import DragView from '@/components/drag-view/index.vue'
// import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
import yunTooler from '../../core/yunTooler';
import cosTooler from '../../core/cosTooler';
import fileTooler from '../../core/fileTooler';
import config from '@/core/config';
// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            list: [],
            size: 20,
            curPage: 20,
            success: 0,
            error: 0,
            pass: 0,
            total: 0,
            hasNext: true,
            running: false,
            fileName: ""
        };
    },
    mounted() {
        // this.loadData();
        var page = localStorage.getItem("page");
        this.curPage = page || 1;
    },
    computed: {
        
    },
    methods: {
        getPath(name){
            return config.cvmPath(name);
        },
        toggler(){
            this.curPage = Number(this.curPage);
            this.running = !this.running;
            if(this.running){
                this.loadData();
            }
        },
        async search(){
            var item = {name: this.fileName, id: this.fileName};
            var url = this.getPath(item.name);
            item.percent = "开始下载";
            this.list = [item];
            var canvas = this.$refs.canvas;
            var file = await fileTooler.urlToFile(url, canvas, false);
            if(file){
                await this.upload(file, item);
                item.percent = "1";
            }
            else{
                item.percent = "下载失败";
            }
        },
        async loadData(){
            if(!this.running){
                return;
            }
            if(!this.hasNext){
                console.log('没有更多');
                return;
            }
            this.total = 0;
            var res = await yunTooler.getImages(this.curPage++, this.size);
            localStorage.setItem("page", this.curPage);
            if(res && res.data){
                var list = res.data.data;
                this.hasNext = this.size == list.length;
                var canvas = this.$refs.canvas;
                list.map(async item => {
                    item.percent = "checking";
                    // var has = await fileTooler.validateLink(config.cosPath(item.name));
                    var has = false;
                    if(!has){
                        var url = this.getPath(item.name);
                        item.percent = "开始下载";
                        var file = await fileTooler.urlToFile(url, canvas, false);
                        if(file){
                            await this.upload(file, item);
                            this.success++;
                            item.percent = "1";
                        }
                        else{
                            this.error++;
                            item.percent = "下载失败";
                        }
                    }
                    else{
                        item.percent = "已处理";
                        this.pass++;
                    }
                    this.checkComplete();
                });
                this.list = list;
            }
        },
        upload(file, item){
            return cosTooler.putObject(file, item.name, e => {
                console.log(e);
                item.percent = "已上传" + Math.floor(e.percent * 100) + "%";
            });
        },
        checkComplete(){
            if(++this.total == this.size){
                setTimeout(() => {
                    this.loadData();
                }, 2000);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
