<template>
    <div class="upload-view">
        <PageView>
            <template v-slot:header>
                <span class="iconfont icon-liebiao" @click="onBack"></span>
                <div class="title">上传图片</div>
            </template>
            <template v-slot:content>
                <div class="upload-box">
                    <div class="file" @click="onOpen"><div class="ico"></div>点击选择上传文件</div>
                    <input v-show="false" ref="file" type="file" multiple="multiple" @change="onChange($event)"/>
                </div>
                <div class="list">
                    <div class="item" v-for="(item, index) in list" v-bind:key="index" @click="onEdit(item)">
                        <img class="img" :src="fileToImage(item)"/>
                    </div>
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
            list: []
        };
    },
    components: {PageView},
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
    },
    computed: {
        ...mapState(['pics', 'id'])
    },
    methods: {
        ...mapMutations(['changePics', 'changeId']),
        fileToImage(file){
            return window.URL.createObjectURL(file);
        },
        onEdit(n){
            // this.changeId(n);
            // this.$router.push({ path: '/detail', query: { id: n }});
            // this.$router.push({ path: '/clip', query: { id: this.id }});
            this.$router.push({ name: 'clip', params: { pic: n } });
        },
        onOpen(){
            this.$refs.file.click();
        },
        onChange(e){
            console.log(e);
            var files = e.target.files;
            for(var i = 0; i < files.length; i++){
                this.list.push(files[i]);
            }
        },
        onBack(){
            history.back();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
