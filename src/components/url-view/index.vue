<template>
    <div class="url-view">
       <input class="txt" v-model="url" @keyup.enter="add"/>
       <div class="btn" @click="add">添加</div>
    </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
import request from '../../core/request';
import config from '../../core/config';
// import axios from 'axios';

// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            url: ""
        };
    },
    components: {},
    mounted() {
    
    },
    computed: {
        
    },
    methods: {
        async add(){
            if(this.url.replace(/\s*/ig, '') == ""){
                return;
            }
            // var url = config.proxyHost + "/resource/proxy/img?url=" + encodeURIComponent(this.url);
            // console.log(url);
            // var res = await request.httpGet(url);
            // console.log(res.data);
            // this.$emit("url", config.tempPath(res.data));
            // this.url = "";

            var headers = {
                    "Referer": "https://th.hentai-img.com/",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"
                };
            let data = new FormData();
            data.append('url', this.url);
            data.append('headers', JSON.stringify(headers));
            

            // var res = await axios.post("http://170.106.154.187:8899/proxy", data, {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // });
            
            var res = await request.httpPost("http://170.106.154.187:8899/proxy", data);
            console.log(res.data);
            this.$emit("url", config.tempPath(res.data));
            // this.url = "";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
