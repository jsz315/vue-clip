<template>
    <div class="clip-view">
        <iframe class="frame" id="frame" :src="src"></iframe>
    </div>
</template>

<script>
// import PageView from '../page-view/index.vue'
// import LatelyTagView from '../lately-tag-view/index.vue'
// import NowTagView from '../now-tag-view/index.vue'
// import InputView from '../input-view/index.vue'
import { mapState, mapMutations } from 'vuex'


export default {
    props: {},
    data() {
        return {
            pic: null,
            width: 0,
            height: 0,
            clipWidth: 0,
            clipHeight: 0,
            src: "about:blank"
        };
    },
    components: {},
    computed:{
        ...mapState(['pics', 'id', 'tags'])
    },
    async mounted() {
        console.log(this.$route, 'this.$route');
        this.changeId(Number(this.$route.query.id));
        this.pic = this.pics[this.id];
       
        this.src = "index.html?url=" + encodeURIComponent(this.pic);
        window.addEventListener("message", e=>{
            var obj = e.data;
            if(obj.type == "complete"){
                console.log(obj);
            }
        })
    },
    methods:{
        ...mapMutations(['changePics', 'changeId', 'addTag']),
        async onClip(){
            // var data = draw.clip();
            // this.pic = data.src;
            // this.clipWidth = data.width;
            // this.clipHeight = data.height;
            // var fname = 'aaa.jpg';
            // var file = tooler.dataURLtoFile(this.pic, fname);
            // var res = await yunTooler.startUpload(file, '/', '/' + fname);
            // if(res){
            //     this.$message({message:'上传成功'});
            // }
            // else{
            //     this.$message({message:'上传失败'});
            // }
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
            this.$router.push({ path: '/frame', query: { url: this.pic }});
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
