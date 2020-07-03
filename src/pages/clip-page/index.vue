<template>
    <div class="frame-view">
        <iframe class="frame" ref="frame" :src="src"></iframe>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
    async mounted() {
        // this.changeId(Number(this.$route.query.id));
        var url = this.$route.query.url;
        console.log(decodeURIComponent(url));

        this.src = "dist/index.html?url=" + url;
        window.addEventListener("message", e=>{
            var obj = e.data;
            if(obj.type == "complete"){
                console.log(obj);
                this.changeClipData(obj);
                history.back();
            }
        })
        
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
