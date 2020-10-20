<template>
    <div class="url-view">
       <input class="txt" v-model="url"/>
       <div class="btn" @click="add">添加</div>
    </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
import request from '../../core/request';

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
            var url = "/resource/proxy/img?url=" + encodeURIComponent(this.url);
            console.log(url);
            var res = await request.httpGet(url);
            console.log(res.data);
            this.$emit("url", "https://wlwol.cn/asset/temp/" + res.data);
            this.url = "";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
