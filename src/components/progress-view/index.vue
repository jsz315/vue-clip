<template>
    <div class="progress-view">
        <div class="box">
            <div class="loading"></div>
            <div class="tip">上传{{num}}%</div>
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
    props: ["item"],
    data() {
        return {
            num: 0
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
        show(n){
            this.num = n;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
