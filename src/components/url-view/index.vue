<template>
    <div class="url-view">
        <div class="row">
            <input class="txt" v-model="url" @keyup.enter="add"/>
            <div class="btn" @click="add">确定</div>
            <div class="iconfont icon-liebiao" @click="toggler"></div>
        </div>
       
       <div class="opt" v-if="useHeaders">
           <textarea class="more" v-model="more" placeholder="请输入请求头数据"></textarea>
       </div>
    </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
import request from '../../core/request';
// import config from '../../core/config';
// import axios from 'axios';

// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            url: "",
            more: "",
            useHeaders: false
        };
    },
    components: {},
    mounted() {
        this.more = localStorage.getItem("more");
    },
    computed: {
        
    },
    methods: {
        toggler(){
            this.useHeaders = !this.useHeaders;
        },
        getHeaders(){
            localStorage.setItem("more", this.more);
            var list = this.more.split("\n");
            var data = {};
            list.forEach(item => {
                var t = item.split(":");
                var key = t[0].replace(/^\s+|\s+$/g, "");
                var value = t[1].replace(/^\s+|\s+$/g, "");
                data[key] = value;
            })
            return data;
        },
        async add(){
            if(this.url.replace(/\s*/ig, '') == ""){
                return;
            }
            
            // var headers = {
            //         "Referer": "https://th.hentai-img.com/",
            //         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"
            //     };

// Referer : https://th.hentai-img.com/
// User-Agent : Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36

            let data = new FormData();
            data.append('url', this.url);
            if(this.useHeaders){
                var headers = this.getHeaders();
                console.log(headers);
                data.append('headers', JSON.stringify(headers));
            }
            
            var res = await request.httpPost("https://www.madman.fun/resource/proxy", data);
            console.log(res.data);
            if(res.data.code == 200){
                this.$emit("url", "https://www.madman.fun/asset/temp/" + res.data.data);
            }
            else{
                this.$toast({message: "请求图片失败"});
            }
            
            this.url = "";
        }
    }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
