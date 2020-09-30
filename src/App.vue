<!--
 * @Author: luoyong/471826078@qq.com
 * @Date: 2020-09-29 11:35:49
 * @LastEditors: 471826078@qq.com
-->
<template>
  <div id="app">
    <div class="header">测试一下响应式布局-@media</div>
    <router-view class="main" />
    <div class="footer">测试一下响应式布局-@media</div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
  width: 7px;
  /*对垂直流动条有效*/
  height: 7px;
  /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/

::-webkit-scrollbar-thumb {
  border-radius: 7px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #dbdee2;
}

/*定义两端按钮的样式*/

::-webkit-scrollbar-button {
  background-color: transparent;
  height: 0;
  width: 0;
}

/*定义右下角汇合处的样式*/

::-webkit-scrollbar-corner {
  background: khaki;
}
.header {
  width: 100%;
  box-shadow: 0 3px 3px #ddd;
}
.main {
  background-color: #fff;
  border: 1px solid #ddd;
  overflow-y: auto;
}
.footer{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #666;
}
@media screen and (max-width: 768px) {
  .header {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    font-weight: bold;
  }
  .main {
    width: 100%;
    height: calc(100% - 84px);
    border-left: none;
    border-right: none;
  }
}
@media screen and (min-width: 1024px) {
  .header {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 3px 3px 3px #ddd;
  }
  .main {
    width: 1200px;
    margin: 0 auto;
    height: calc(100% - 110px);
    box-shadow: 3px 3px 3px #ddd;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .header {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  .main {
    width: 1200px;
    margin: 0 auto;
    height: calc(100% - 100px);
  }
}
</style>
