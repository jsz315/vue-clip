<template>
    <div class="frame-view">
        <iframe class="frame" ref="frame" src="./dist/index.html"></iframe>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

let clipWindow;

export default {
    props: {},
    data() {
        return {
            
        };
    },
    components: { },
    computed:{
        ...mapState(['pics', 'id', 'tags'])
    },
    async mounted() {
        // this.changeId(Number(this.$route.query.id));
        var url = this.$route.query.url;
        console.log(url);
        
        let f = this.$refs.frame;
        clipWindow = f.window || f.contentWindow;
        clipWindow.addEventListener("message", e=>{
            var obj = e.data;
            if(obj.type == "clip"){
                console.log(obj);
                this.changeClipData(obj);
                history.back();
            }
        })
        setTimeout(()=>{
            clipWindow.postMessage({type:"url", data:url});
        }, 1200)
        
    },
    methods:{
        ...mapMutations(['changePics', 'changeId', 'addTag', 'changeClipData']),
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
