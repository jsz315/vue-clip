<template>
    <div class="input-view" v-if="visible">
        <div class="tag-content">
            <input type="text" class="text" placeholder="输入标签，多个可用空格隔开"/>
            <div class="tags-box">
                推荐：
                <div class="tags">
                    <TagView name="卡通" class="tag" v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7]" v-bind:key="index"></TagView>
                    <div class="add"></div>
                </div>
            </div>
            <div class="btns">
                <div class="btn quit" @click="onQuit">取消</div>
                <div class="btn sure" @click="onSure">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import TagView from '../tag-view/index.vue'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
// import yunTooler from '../../core/yunTooler';
import { mapState, mapMutations } from 'vuex'


export default {
    props: {},
    data() {
        return {
            visible: false
        };
    },
    components: {TagView},
    computed:{
        ...mapState(['pics', 'id'])
    },
    mounted() {
    
    },
    methods:{
        ...mapMutations(['changePics', 'changeId']),
        onQuit(){
            console.log('onQuit');
            this.hide();
        },
        onSure(){
            console.log('onSure');
            this.hide();
        },
        hide(){
            this.visible = false;
            document.body.classList.remove("onscroll");
        },
        show(){
            this.visible = true;
            document.body.classList.add("onscroll");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
