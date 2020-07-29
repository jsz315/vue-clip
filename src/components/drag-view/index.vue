<template>
    <div class="drag-view" :class="{enter}" ref="box">
        拖拽本地文件
    </div>
</template>
<script>
export default {
    data(){
        return {
            enter: false,
        }
    },
    methods: {
        onDrag: function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log("进入");
            this.enter = true;
        },
        onDragLeave: function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log("离开");
            this.enter = false;
        },
        onDrop: function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log("松手");
            this.enter = false;
            var dt = e.dataTransfer;
            this.$emit("drag", dt.files);
        },
    },
    mounted(){
        var box = this.$refs.box;
        box.addEventListener("dragenter", this.onDrag, false);
        box.addEventListener("dragover", this.onDrag, false);
        box.addEventListener("dragleave", this.onDragLeave, false);
        box.addEventListener("drop", this.onDrop, false);
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>