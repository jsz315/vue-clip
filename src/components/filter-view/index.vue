<template>
    <div class="filter-view" :class="{'show': show}">
        <div class="line">
            <div class="type">搜索:</div>
            <div class="param">
                <div class="input">
                    <input class="text" type="text" placeholder="请输入搜索关键词" v-model="name"/>
                    <div class="sure" @click="onSure">确定</div>
                    <div class="sure" @click="onCancel">取消</div>
                </div>
                <div class="checks">
                    <CheckboxView ref="tag" @change="onChange"></CheckboxView>
                    <span class="tip">标签</span>
                </div>
                <div class="checks">
                    <CheckboxView ref="desc" @change="onChange"></CheckboxView>
                    <span class="tip">描述</span>
                </div>
            </div>
        </div>

        <div class="line">
            <div class="type">分类:</div>
            <div class="param">
                <div class="item" @click="onCancel">全部</div>
                <div class="item" v-for="item in tags" v-bind:key="item.id" @click="onChoose(item)">{{item.name}}</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import CheckboxView from '@/components/checkbox-view/index.vue'
// import PageView from '../page-view/index.vue'
// import Hammer from 'hammerjs';
import tooler from '@/core/tooler';
import yunTooler from '@/core/yunTooler';
import { mapState, mapMutations } from 'vuex'

export default {
    data() {
        return {
            name: ""
        };
    },
    props: ["show"],
    components: {CheckboxView},
    computed:{
        ...mapState(['tags'])
    },
    mounted() {
        
    },
    methods:{
        ...mapMutations(['changePics']),
        async onChoose(item){
            var res = await yunTooler.search({
                name: item.name,
                isTag: true,
                isDesc: false
            });
            // res = await yunTooler.getImages();
            if(res && res.data){
                this.changePics(res.data.data);
            }
            this.$emit("close");
        },
        async onSure(){
            if(tooler.isEmpty(this.name)){
                this.$toast({message: "内容不能为空"})
                return;
            }
            if(!this.$refs.tag.selected && !this.$refs.desc.selected){
                this.$toast({message: "筛选条件不能为空"})
                return;
            }
            var res = await yunTooler.search({
                name: this.name,
                isTag: this.$refs.tag.selected,
                isDesc: this.$refs.desc.selected
            });
            // res = await yunTooler.getImages();
            if(res && res.data){
                this.changePics(res.data.data);
            }
            this.$emit("close");
        },
        onCancel(){
            this.$emit("cancel");
        },
        onChange(){

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
