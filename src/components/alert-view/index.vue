<template>
    <div class="alert-view" v-if="show">
        <div class="box">
            <div class="tip">{{tip}}</div>
            <div class="btns">
                <div class="sure btn" @click="sure">确定</div>
                <div class="cancal btn" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    props: ["item", "onSure", "onCancel"],
    data() {
        return {
            tip: "",
            show: true
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
        sure(){
            // this.$emit('delete');
            this.show = false;
            this.onSure && this.onSure();
        },
        cancel(){
            // this.$emit('all', n);
            this.show = false;
            this.onCancel && this.onCancel();
        },
        alert(tip){
            this.tip = tip;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "./index.less";
</style>
