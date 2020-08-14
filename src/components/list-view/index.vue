<template>
    <div class="list-view">
        <PageView>
            <template v-slot:header>
                <div class="title">图片列表</div>
                <span class="iconfont icon-tianjia" @click="onAdd"></span>
            </template>
            <template v-slot:content>
                <div class="list">
                    <div class="item" v-for="(item, index) in pics" v-bind:key="item.id" @click="onShow(index)" :style="{'background-image': 'url(' + item + ')'}"></div>
                </div>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '../page-view/index.vue'
import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import tooler from '../../core/tooler';

// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            src: null
        };
    },
    components: {PageView},
    mounted() {
        
    },
    computed: {
        ...mapState(['pics', 'id'])
    },
    methods: {
        ...mapMutations(['changePics', 'changeId']),
        onShow(n){
            this.$router.push({ path: '/detail', query: { id: n }});
        },
        onAdd(){
            this.$router.push({ path: '/upload' });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
