<template>
    <div class="input-view" v-if="visible">
        <div class="tag-content">
            <input type="text" v-model="word" class="text" placeholder="输入标签，多个可用空格隔开"/>
            <LatelyTagView @choose="onChoose"/>
            <div class="btns">
                <div class="btn quit" @click="onQuit">取消</div>
                <div class="btn sure" @click="onSure">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import LatelyTagView from '../lately-tag-view/index.vue'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
// import yunTooler from '../../core/yunTooler';
import { mapState, mapMutations } from 'vuex'


export default {
    props: {},
    data() {
        return {
            visible: false,
            word: ''
        };
    },
    components: {LatelyTagView},
    computed:{
        ...mapState(['pics', 'id', 'tags'])
    },
    mounted() {
    
    },
    methods:{
        ...mapMutations(['changePics', 'changeId', 'addTag']),
        onQuit(){
            this.hide();
        },
        onSure(){
            this.hide();
            this.$emit("input", this.word);
        },
        hide(){
            this.visible = false;
            document.body.classList.remove("onscroll");
        },
        show(){
            this.visible = true;
            document.body.classList.add("onscroll");
        },
        onChoose(n){
            var t = this.word.split(/\s+/);
            t.push(n);
            this.word = t.join(" ") + " ";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
