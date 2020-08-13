<template>
    <div class="list-view">
        <PageView>
            <template v-slot:header>
                <span class="iconfont iconbianji" @click="onEdit" v-show="!isEdit"></span>
                <span class="over-btn" @click="onQuit" v-show="isEdit">完成</span>
                
                <div class="title" @click="onTogglerFilter">筛选列表</div>
                <span class="iconfont iconadd-fill-copy" @click="onAdd"></span>
            </template>
            <template v-slot:content>
                <FilterView :show="isFilter" @cancel="onCancel" @close="isFilter=false"></FilterView>
                <ScrollView @loadMore="onLoadMore" @refresh="onRefresh" scroll_class="scroll" :bottom="20">
                    <div class="list">
                        <div class="item" v-for="(item, index) in pics" v-bind:key="item.id" @click="onShow(index)" v-lazy:background-image="getPath(item.name)">
                            <div class="btn">
                                <CheckboxView ref="checkboxs" @change="onChoose($event, index)" v-show="isEdit"></CheckboxView>
                            </div>
                        </div>
                    </div>
                </ScrollView>
                
                <DeleteView @all="onAll" @delete="onDelete" v-show="isEdit"></DeleteView>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '@/components/page-view/index.vue'
import CheckboxView from '@/components/checkbox-view/index.vue'
import DeleteView from '@/components/delete-view/index.vue'
import ScrollView from "@/components/scroll-view/index.vue";
import FilterView from '@/components/filter-view/index.vue'
import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
import config from '@/core/config';
import yunTooler from "@/core/yunTooler";
import tooler from "@/core/tooler";

// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            src: null,
            isEdit: false,
            isFilter: false,
            size: 20,
            curPage: 0
        };
    },
    components: {PageView, CheckboxView, DeleteView, FilterView, ScrollView},
    mounted() {
        this.onLoadMore();
    },
    computed: {
        ...mapState(['pics', 'id'])
    },
    methods: {
        ...mapMutations(['changePics', 'changeId', 'changeTags']),
        onShow(n){
            // this.changeId(n);
            this.$router.push({ path: '/detail', query: { id: n }});
        },
        onAdd(){
            this.$router.push({ path: '/upload' });
        },
        getPath(name){
            return config.getPath(name);
        },
        onEdit(){
            this.isEdit = true;
        },
        onQuit(){
            this.isEdit = false;
        },
        onAll(n){
            console.log("all", n);
            console.log(this.$refs.checkboxs);
            this.$refs.checkboxs.forEach(element => {
                element.selected = n;
            });
        },
        onDelete(){
            console.log("delete");
            var checkboxs = this.$refs.checkboxs;
            var list = this.pics.filter((item, index)=>{
                return checkboxs[index].selected
            })
            var pics = this.pics.filter((item, index)=>{
                return !checkboxs[index].selected
            })
            this.changePics(pics);
            if(list.length == 0){
                this.$toast({message: "操作对象为空"})
                return;
            }
            yunTooler.deleteResources(list);
            this.isEdit = false;
        },
        onChoose(v, id){
            console.log(v, id);
        },
        onTogglerFilter(){
            this.isFilter = !this.isFilter;
        },
        async onCancel(){
            this.onRefresh();
            this.isFilter = false;
        },
        async loadData(){
            var res = await yunTooler.getImages(this.curPage++, this.size);
            if(res && res.data){
                var list = res.data.data.list;
                var pics = this.pics.concat(list);
                this.changePics(pics);
            }
        },
        async onRefresh(done){
            var res = await yunTooler.getTags();
            if(res.data){
                this.changeTags(res.data.data);
            }
            this.curPage = 0;
            this.changePics([]);
            await this.loadData();
            done && done();
        },
        onLoadMore(){
            tooler.throttle(async ()=>{
                await this.loadData();
            }, 400);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
