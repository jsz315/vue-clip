<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import request from "@/core/request"
// import yunTooler from "@/core/yunTooler"
import remote from "@/core/remote";

export default {
  name: "App",
  data() {
    return {
      
    };
  },
  components: {},
  created() {
    console.log("== app created ==");
    // this.changePics([
    //   'http://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/42a98226cffc1e177a2eb0404290f603738de92a.jpg',
    //   'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586502962707&di=ee98af61cb765ad0afa14e1f66e02629&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F13%2F20150513144838_UkA58.thumb.700_0.jpeg',
    //   'http://pic2.52pk.com/files/130426/1283568_114807_4882.jpg',
    //   'http://www.1lifan.com/uploads/allimg/180731/230ILS6-5.jpg',
    //   'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586510568232&di=ff9c981c6849e5abc8fcd4dec7590851&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fbaike%2Fpic%2Fitem%2Ff11f3a292df5e0fe285a6174566034a85edf7201.jpg',
    //   'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2207089593,3263649201&fm=15&gp=0.jpg',
    //   'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586502962693&di=83606ae7627dee2503a9a1e6ed163941&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb90e7bec54e736d1e3eb0c7b9b504fc2d46269cd.jpg'
    // ]);
  },
  async mounted() {
    console.log("== app mounted remote ==");
    var res = await remote.getTags();
    if (res.data) {
      this.changeTags(res.data.data);
    }
    res = await remote.getTotal();
    if (res.data) {
      this.changeTotal(res.data.data[0].total);
    }
  },
  methods: {
    ...mapMutations(["changePics", "changeId", "changeTags", "changeTotal"]),
  },
};
</script>

<style lang='less'>
@import "./App.less";
</style>