<template>
    <div class="add-tag-view">
        <div class="tip">标签：</div>
        <input class="text" type="text" placeholder="输入标签" v-model="name"/>
        <div class="sure" @click="onSure" :class="{enable}">添加</div>
    </div>
</template>

<script>
// import PageView from '../page-view/index.vue'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';
import { mapState, mapMutations } from 'vuex'

export default {
    data() {
        return {
            name: "",
            enable: true
        };
    },
    components: {},
    computed:{
        ...mapState(['tags'])
    },
    mounted() {
        
    },
    methods:{
        ...mapMutations(['changePics']),
        onSure(){
            console.log(this.tags);
            if(!this.enable){
                return;
            }
            this.enable = false;
            this.$emit("add", this.name);
            setTimeout(() => {
                this.name = "";
                this.enable = true;
            }, 3000);

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
