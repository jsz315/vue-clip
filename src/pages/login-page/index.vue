<template>
    <div class="login-view">
        <PageView>
            <template v-slot:header>
                <div class="title">登录</div>
            </template>
            <template v-slot:content>
                <div class="head-img"></div>
                <div class="param">
                    <pre class="label">账    户：</pre>
                    <input class="txt" type="text" v-model="username" placeholder="请输入账户名称">
                </div>
                <div class="param">
                    <pre class="label">密    码：</pre>
                    <input class="txt" type="text" v-model="password" placeholder="请输入账户密码">
                </div>
                <div class="btn" @click="onLogin">登录</div>
                <div class="tips">
                    <div class="forget" @click="onForget">忘记密码</div>
                    <div class="regist" @click="goRegist">注册新账号</div>
                </div>
                
            </template>
        </PageView>
    </div>
</template>

<script>

import PageView from '@/components/page-view/index.vue'
import user from '../../core/user';
import { mapState, mapMutations } from 'vuex'
// import Hammer from 'hammerjs';
// import draw from '../../core/draw';
// import cosTooler from '../../core/cosTooler';

// let isMobile = tooler.checkMobile();
// let lastPoint;

export default {
    props: {},
    data() {
        return {
            username: "",
            password: ""
        };
    },
    components: {PageView},
    mounted() {
        this.auth();
    },
    computed: {
        ...mapState(['pics', 'id', 'clipData', 'token'])
    },
    beforeRouteEnter(to, from, next){
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        console.log("进入页面", to, from);
        next();
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        this.changeClipData(null);
        console.log("离开页面")
        next();
    },
   
    
    methods: {
        ...mapMutations(['changePics', 'changeId', 'changeClipData', 'changeToken', 'changeUserInfo']),
        goRegist(){
            this.$router.push({ path: '/regist', query: {  }});
        },
        async onForget(){
            var res = await user.httpGet("/hello", {
                name: this.username
            });
            if(res.data.code == 0){
                localStorage.setItem("token", res.data.token);
            }
            console.log(res);
        },
        async onLogin(){
            var res = await user.httpPost("/user/login", {
                username: this.username,
                password: this.password
            });
            if(res.data.code == 0){
                localStorage.setItem("token", res.data.data.token);
                this.changeUserInfo(res.data.data.userInfo);
                this.$toast({message: "登录成功"});
                this.$router.replace({path: "/list"});
            }
            else{
                this.$toast({message: res.data.msg});
            }
        },
        async auth(){
            var res = await user.httpGet("/user/auth", {
                token: localStorage.getItem("token")
            });
            if(res.data.code == 0){
                this.$toast({message: "认证成功"});
                this.changeUserInfo(res.data.data.userInfo);
                console.log(res.data.data.userInfo);
                this.$router.replace({path: "/list"});
            }
            else{
                this.$toast({message: res.data.msg});
            }

            console.log(res);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
