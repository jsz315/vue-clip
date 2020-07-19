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
                <FilterView v-show="isFilter" @cancel="onCancel"></FilterView>
                <EasyRefresh
                    :userSelect="false"
                    :onRefresh="onRefresh"
                    :loadMore="onLoadMore">
                    <div class="list">
                        <div class="item" v-for="(item, index) in pics" v-bind:key="item.id" @click="onShow(index)" v-lazy:background-image="getPath(item.name)">
                            <div class="btn">
                                <CheckboxView ref="checkboxs" @change="onChoose($event, index)" v-show="isEdit"></CheckboxView>
                            </div>
                        </div>
                    </div>
                </EasyRefresh>
                
                <DeleteView @all="onAll" @delete="onDelete" v-show="isEdit"></DeleteView>
            </template>
        </PageView>
    </div>
</template>

<script>
import PageView from '@/components/page-view/index.vue'
import CheckboxView from '@/components/checkbox-view/index.vue'
import DeleteView from '@/components/delete-view/index.vue'
// import ReflashView from '@/components/reflash-view/index.vue'
import FilterView from '@/components/filter-view/index.vue'
import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
import config from '@/core/config';
import yunTooler from "@/core/yunTooler";

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
    components: {PageView, CheckboxView, DeleteView, FilterView},
    mounted() {
        // this.changePics([
        //     'http://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/42a98226cffc1e177a2eb0404290f603738de92a.jpg',
        //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586502962707&di=ee98af61cb765ad0afa14e1f66e02629&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F13%2F20150513144838_UkA58.thumb.700_0.jpeg',
        //     'http://pic2.52pk.com/files/130426/1283568_114807_4882.jpg',
        //     'http://www.1lifan.com/uploads/allimg/180731/230ILS6-5.jpg',
        //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586510568232&di=ff9c981c6849e5abc8fcd4dec7590851&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fbaike%2Fpic%2Fitem%2Ff11f3a292df5e0fe285a6174566034a85edf7201.jpg',
        //     'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2207089593,3263649201&fm=15&gp=0.jpg',
        //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586502962693&di=83606ae7627dee2503a9a1e6ed163941&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb90e7bec54e736d1e3eb0c7b9b504fc2d46269cd.jpg'
        // ]);
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
            console.log("onRefresh")
            var res = await yunTooler.getTags();
            if(res.data){
                this.changeTags(res.data.data);
            }
            this.curPage = 0;
            this.changePics([]);
            // this.onLoadMore(done);
            await this.loadData();
            done && done();
        },
        async onLoadMore(done){
            console.log("onLoadMore");
            await this.loadData();
            done && done();
            // if(done){
            //     if(list.length < this.size){
            //         done(false);
            //     }
            //     else{
            //         done(false);
            //     }
            // }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
