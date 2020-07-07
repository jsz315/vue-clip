<template>
    <div class="checkbox-view" @click.stop="onChange">
        <div class="box" v-show="selected"></div>
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
            selected: false
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
        onChange(){
            this.selected = !this.selected;
            this.$emit('change');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
