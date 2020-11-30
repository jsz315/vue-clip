<template>
    <div class="delete-view">
        <div class="all-btn">
            <CheckboxView @change="onChange" ref="check"></CheckboxView>
            <span class="tip" @click="onAll">全选</span>
        </div>
        <div class="delete-btn" @click="onDelete">
            <span>删除</span>
        </div>
    </div>
</template>

<script>
import CheckboxView from "@/components/checkbox-view/index.vue";
// import PageView from '../page-view/index.vue'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
// import yunTooler from '../../core/yunTooler';
import { mapState, mapMutations } from 'vuex'

export default {
    props: ["item"],
    data() {
        return {
            
        };
    },
    components: {CheckboxView},
    computed:{
        ...mapState(['pics', 'id'])
    },
    async mounted() {
        
    },
    methods:{
        ...mapMutations(['changePics', 'changeId']),
        onDelete(){
            this.$emit('delete');
        },
        onAll(){
            var n = !this.$refs.check.selected;
            this.$refs.check.selected = n;
            this.$emit('all', n);
            console.log("onAll", n);
        },
        onChange(n){
            this.$emit('all', n);
            console.log("onChange", n);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
