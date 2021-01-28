<!--
 * @Author: luoyong/471826078@qq.com
 * @Date: 2020-09-29 11:35:49
 * @LastEditors: 471826078@qq.com
-->
<template>
  <div id="app">
    <div class="header">国家级专业健身教练考试
        <span @click='show=true'>登录</span>
        </div>
    <router-view class="main" />
    <div class="footer">
        <!-- 主办单位：湖北省社会体育管理中心  -->
        </div>
    <el-dialog title="管理员登录" :visible.sync="show" width="300px" center :modal-append-to-body='false'>
      <span></span>
      <el-form :model="formInline" class="demo-form-inline">
        <el-form-item label="账号">
          <el-input v-model="formInline.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formInline.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      show: false,
      formInline: {
        name: "admin",
        password: "",
      },
    };
  },
  methods: {
      submit(){
          axios.post('api/exam/checkLogin',{name: this.formInline.name,password: this.formInline.password}).then(res=>{
              this.show = false
              if(res.data.isSuccess){
                  this.$router.push({name:'Result'})
              }else{
                  this.$message({
                      type:'warning',
                      message:'密码错误'
                  })
              }
          })
      }
  },
};
</script>
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
    position: relative;
  span {
    height: 24px;
    line-height: 24px;
    position: absolute;
    font-size: 14px;
    right: 10px;
    top: 3px;
    cursor: pointer;
  }
}
.main {
  background-color: #fff;
  border: 1px solid #ddd;
  overflow-y: auto;
}
.footer {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #666;

}
@media screen and (max-width: 768px) {
  .header {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    font-weight: bold;
  }
  .main {
    width: 100%;
    height: calc(100% - 114px);
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
    width: 1000px;
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
    width: 100%;
    margin: 0 auto;
    height: calc(100% - 100px);
  }
}
.toastExam {
  position: fixed;
  width: 260px;
  padding: 15px;
  line-height: 36px;
  top: 50%;
  left: 50%;
  background-color: #edf2fc;
  border-radius: 5px;
  transform: translate(-50%, -50%);
}
</style>
