<template>
    <div
        class="scroll-view"
        ref="content"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        @scroll="scroll"
        :class="scroll_class"
    >
        <div class="tip" :style="style" ref="tip">{{tip}}</div>

        <div class="box" :style="style" ref="box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            top: 0, //下拉元素距离顶部的距离
            tip: "下拉即可刷新", //下拉提示文案
            startY: -1, //滚动到顶部时的鼠标位置
            position: 0
        };
    },
    props: {
        "scroll_class": null, 
        "bottom": {
            type: Number,
            default: 0
        }
    },
    computed: {
        style(){
            return {
                height: this.top + "px",
                lineHeight: this.top + "px",
            }
        }
    },
    activated(){
        //this.$nextTick()异步执行dom刷新
        this.$nextTick(() => {
            console.log("activated", this.position)
            // this.$refs.content.scrollTop = this.position;
        })
    },
    deactivated(){
        this.position = this.$refs.content.scrollTop;
        console.log("deactivated", this.position)
    },
    methods: {
        scroll() {
            if (this.$refs.content.scrollTop + this.$refs.content.clientHeight >= this.$refs.content.scrollHeight - this.bottom) {
                //滚动到底部
                this.$emit("loadMore");
            }
        },
        
        touchstart() {
            //拖动时取消过度效果
            this.$refs.box.style.transition = "none";
            //拖动时取消过度效果
            this.$refs.tip.style.transition = "none";
        },
        touchmove(e) {
            // e.preventDefault();
            if(this.$refs.content.scrollTop == 0){
                if(this.startY < 0){
                    this.startY = e.targetTouches[0].clientY;
                    console.log(this.startY, "开始拖动");
                }
            }

            if(this.startY > 0){
                this.top = e.targetTouches[0].clientY - this.startY;
                if(this.top < 0){
                    this.top = 0;
                }
            }
        },
        touchend() {
            //释放添加回弹效果
            this.$refs.box.style.transition = "all .3s ease-in-out";
            //释放添加回弹效果
            this.$refs.tip.style.transition = "all .3s ease-in-out";
            //重置鼠标位置
            this.startY = -1;

            if (this.top >= 70) {
                this.tip = "加载中...";
                this.top = 70;
                setTimeout(() => {
                    //下拉刷新
                    this.$emit("refresh", () => {
                        this.top = 0;
                        this.tip = "加载完成";
                        //刷新完成添加回弹效果
                        this.$refs.box.style.transition = "all .2s ease-in-out"; 
                        //刷新完成添加回弹效果
                        this.$refs.tip.style.transition = "all .2s ease-in-out";
              
                    });
                }, 500);
            } else {
                this.tip = "下拉即可刷新";
                this.top = 0;
            }
        },
    },
};
</script>

<style lang='less' scoped>
@import url("./index.less");
</style>