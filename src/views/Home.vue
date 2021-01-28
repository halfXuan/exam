<!--
 * @Author: luoyong/471826078@qq.com
 * @Date: 2020-09-29 11:35:49
 * @LastEditors: 471826078@qq.com
-->
<template>
  <div class="home">
    <p class="tips">考试时间：2020年10月13号</p>
    <p class="tips">18：30 - 20：10</p>
    <el-form
      class="login"
      :label-position="labelPosition"
      :rules="rules"
      label-width="80px"
      :model="formLabelAlign"
      ref="formdata"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" v-sdc @click="beginExam('formdata')"
          >开始考试</el-button
        >
      </el-form-item>
    </el-form>
    <div class="toastExam" v-if="showToast">
      考试未开始，<br />请在13号6：30后参加考试
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
import axios from "axios";
export default {
  name: "Home",
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign.phone)) {
          callback(new Error("手机号格式不正确"));
          return false;
        } else {
          callback();
        }
      }
    };
    return {
      labelPosition: "top",
      formLabelAlign: {
        name: "",
        phone: "",
      },
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { validator: validatePhone, trigger: "blur" },
        ],
      },
      isPC: false,
      showToast: false,
    };
  },
  methods: {
    beginExam(formName) {
      if (this.formLabelAlign.phone == "13072754656") {
        this.$router.push({
          name: "Exam",
          query: {
            name: this.formLabelAlign.name,
            phone: this.formLabelAlign.phone,
          },
        });
      } else {
        let beginDate = new Date("2020/10/13 18:30:00").getTime();
        let end =  new Date("2020/10/13 20:15:00").getTime();
        let curDate = new Date().getTime();
        if(beginDate>end){
            Toast('考试已结束')
            return false
        }
        if (beginDate > curDate) {
          if (this.isPC) {
            this.$message({
              type: "info",
              message: "考试未开始，请在13号6：30后参加考试",
            });
          } else {
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 2000);
          }
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios
                .post("/api/exam/checkExam", {
                  name: this.formLabelAlign.name,
                  phone: this.formLabelAlign.phone,
                })
                .then((res) => {
                  if (res.data.isSuccess) {
                    this.$router.push({
                      name: "Exam",
                      query: {
                        name: this.formLabelAlign.name,
                        phone: this.formLabelAlign.phone,
                      },
                    });
                  } else {
                    Toast("你已经参加过考试");
                  }
                });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      }
    },
  },
  mounted() {
    let wid = document.body.clientWidth;
    if (wid > 765) {
      this.isPC = true;
    } else {
      this.isPC = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.home {
  .tips {
    line-height: 16px;
    height: 16px;
    font-size: 16px;
    color: #666;
    margin-top: 15px;
  }
  .login {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 15px;
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (min-width: 1024px) {
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .login {
      position: fixed;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
    }
  }
}
.el-form-item {
  text-align: left;
}
</style>
