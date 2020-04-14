<template>
    <div class="now-tag-view">
        <div class="tip">标签：</div>
        <div class="list">
            <TagView :name="item" class="tag" v-for="(item, index) in list" v-bind:key="item + '_' + index" @delete='onDelete(index)'></TagView>
            <div class="add" @click="onAdd"></div>
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
    props: ["name"],
    data() {
        return {
            list: []
        };
    },
    components: {TagView},
    computed:{
        ...mapState(['pics', 'id', 'tags'])
    },
    async mounted() {
        
    },
    methods:{
        ...mapMutations(['changePics', 'changeId']),
        onDelete(id){
            this.list.splice(id, 1);
        },
        onAdd(){
            this.$emit("add");
        },
        push(n){
            if(this.list.indexOf(n) == -1){
                this.list.push(n);
            }
            
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
