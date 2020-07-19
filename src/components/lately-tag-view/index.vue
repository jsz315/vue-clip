<template>
    <div class="lately-tag-view">
        <div class="tip">推荐：</div>
        <div class="list">
            <div class="tag" v-for="item in list" v-bind:key="item.id" @click="onChoose(item)">{{item.name}}</div>
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
            // list: []
        };
    },
    components: {},
    computed:{
        ...mapState(['tags']),
        list(){
            var aim = [];
            if(this.tags.length > 0){
                for(var i = this.id; i < this.max + this.id; i++){
                    aim.push(this.tags[i % this.tags.length]);
                }
            }
            return aim;
        }
    },
    mounted() {
        setTimeout(() => {
            this.onRefresh();
        }, 300);
        
    },
    methods:{
        ...mapMutations(['changePics']),
        onDelete(){
            console.log('onDelete');
        },
        onRefresh(){
            // var list = [];
            // if(this.tags.length > 0){
            //     for(var i = this.id; i < this.max + this.id; i++){
            //         list.push(this.tags[i % this.tags.length]);
            //     }
            // }
            
            // this.list = list;
            this.id += this.max;
            // console.log(this.list, "--> list");
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
