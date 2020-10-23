<template>
    <div class="frame-view">
        <iframe class="frame" ref="frame" :src="src"></iframe>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import listener from '../../core/listener'

let eventMaker;

export default {
    props: {},
    data() {
        return {
            src: "about:blank"
        };
    },
    components: { },
    computed:{
        ...mapState(['pics', 'id', 'tags'])
    },
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        console.log("进入页面", to, from);
        next(vm => {
            vm.init();
        });
    },
    beforeRouteLeave(to, from, next) {
        eventMaker.destory();
        next();
    },
    async mounted() {
        // this.changeId(Number(this.$route.query.id));
    },
    methods:{
        ...mapMutations(['changePics', 'changeId', 'addTag', 'changeClipData']),
        init(){
            var url = this.$route.query.url;
            console.log("进入：" + decodeURIComponent(url));
            var changeClipData = this.changeClipData;
            this.src = "./dist/index.html?url=" + url;
            eventMaker = listener.make(window, "message", e=>{
                var obj = e.data;
                if(obj.type == "complete"){
                    console.log(Math.random(), obj);
                    changeClipData(obj);
                    history.back();
                }
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
