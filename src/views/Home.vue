<!--
 * @Author: luoyong/471826078@qq.com
 * @Date: 2020-09-29 11:35:49
 * @LastEditors: 471826078@qq.com
-->
<template>
  <div class="home">
    <div class="header1">测试一下响应式布局-@media</div>
    <div class="main2">21313</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  mounted() {
    let wid = document.body.clientWidth;
    console.log(wid);
  },
};
</script>
<style lang="scss" scoped>
.home {
 
}
</style>
