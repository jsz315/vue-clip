<template>
    <div class="lately-tag-view">
        <div class="tip">推荐：</div>
        <div class="list">
            <div class="tag" v-for="(item, index) in list" v-bind:key="item + '_' + index" @click="onChoose(item)">{{item}}</div>
            <div class="refresh" @click="onRefresh"></div>
        </div>
    </div>
</template>

<script>
// import PageView from '../page-view/index.vue'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
// import yunTooler from '../../core/yunTooler';
import { mapState, mapMutations } from 'vuex'

export default {
    props: ["name"],
    data() {
        return {
            id: 0,
            max: 6,
            list: []
        };
    },
    components: {},
    computed:{
        ...mapState(['tags'])
    },
    mounted() {
        this.onRefresh();
    },
    methods:{
        ...mapMutations(['changePics']),
        onDelete(){
            console.log('onDelete');
        },
        onRefresh(){
            var list = [];
            for(var i = this.id; i < this.max + this.id; i++){
                list.push(this.tags[i % this.tags.length]);
            }
            this.list = list;
            this.id += this.max;
        },
        onChoose(n){
            this.$emit("choose", n);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
