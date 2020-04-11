<template>
    <div class="toast-box" v-if="show" :style="{'animation-duration': duration + 'ms'}">
        <div class="wrap">{{text}}</div>
    </div>
</template>
  

<style lang="less" scoped>
@import "./index.less";
</style>