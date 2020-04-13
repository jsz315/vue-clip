<template>
    <div class="tag-view">
        {{name}}<span class="iconfont icon-bianji" @click="onDelete"></span>
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
            
        };
    },
    components: {},
    computed:{
        ...mapState(['pics', 'id'])
    },
    async mounted() {
        
    },
    methods:{
        ...mapMutations(['changePics', 'changeId']),
        onDelete(){
            console.log('onDelete');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
