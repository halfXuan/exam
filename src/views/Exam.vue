<template>
  <div class="exam">
    <ul style="min-height:300px">
      <li v-for="(item, index) in list" :key="index">
        <div v-if="currentIndex == index">
          <h2 class="questionTItle" v-if="index < 20">
            一、判断题（每题 2 分，共 40 分）
          </h2>
          <h2 class="questionTItle" v-else>
            二、选择题（每题 1 分，共 60 分）
          </h2>
          <div v-if="item.type == 1">
            <p class="question">
              <span>{{ (index+1) + "、" }}</span
              >{{ item.question }}
            </p>
            <el-radio-group v-model="item.answer">
              <el-radio :label="1">正确</el-radio>
              <el-radio :label="2">错误</el-radio>
            </el-radio-group>
          </div>
          <div v-else>
            <p class="question">
              <span>{{ (index+1) + "、" }}</span
              >{{ item.question }}
            </p>
            <el-checkbox-group v-model="item.answer">
              <el-checkbox
                :label="item.title"
                v-for="(item, indexs) in item.checks"
                :key="indexs"
                >{{ item.title }}、{{ item.text }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
      </li>
    </ul>
    <ul class="btnBox">
      <li class="pre" v-if="currentIndex > 0" @click="toPre">
        上一题
      </li>
      <li class="center" @click="drawer = true">我的答题</li>
      <li class="next" @click="toNext">
        下一题
      </li>
    </ul>
    <el-drawer
      title="我的答案(红色为未完成题目，共80题)"
      :append-to-body="true"
      :visible.sync="drawer"
      :direction="direction"
      size="80%"
    >
      <ul class="answerBox">
        <li v-for="(item, index) in list" :key="index">
          <div v-if="item.type == 1" class="list" @click="toQuestion(index)">
            <span>{{ index + 1 }}、</span
            ><span :class="item.answer == '' ? 'text textNo' : 'text'">{{
              item.answer == 1 ? "✔" : item.answer == 2 ? "✖" : ""
            }}</span>
          </div>
          <div v-else class="list" @click="toQuestion(index)">
            <span>{{ index + 1 }}、</span
            ><span :class="item.answer.length == 0 ? 'text textNo' : 'text'">{{
              item.answer.toString()
            }}</span>
          </div>
        </li>
      </ul>
    </el-drawer>
    <div class="submitBox">
         <el-button type="primary" @click="submit" v-sdc class="submit">交卷</el-button>
    </div>
   
    <div class="toastExam" v-if="showToast">
      考试未开始，<br />请在13号6：30后参加考试
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog, Toast } from "vant";

// 全局注册
Vue.use(Dialog);
Vue.use(Toast);
import axios from "axios";
import { list } from "@/utils/a";
export default {
  name: "exams",
  data() {
    return {
      name: "",
      phone: "",
      list,
      currentIndex: 0,
      drawer: false,
      direction: "btt",
      showToast: false,
      isPC: true,
    };
  },
  mounted() {
    let wid = document.body.clientWidth;
    if (wid > 765) {
      this.isPC = true;
    } else {
      this.isPC = false;
    }
    const { name, phone } = this.$route.query;
    this.name = name;
    this.phone = phone;
  },
  methods: {
    toPre() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else {
        this.currentIndex = 0;
      }
    },
    toNext() {
      let len = this.list.length;
      if(this.currentIndex>19){
          if(this.list[this.currentIndex].answer.length>0){
               if(this.list[this.currentIndex].len < this.list[this.currentIndex].answer.length){
                        Toast('本题只有'+this.list[this.currentIndex].len+'个答案')
                        return false
                }else if(this.list[this.currentIndex].len > this.list[this.currentIndex].answer.length){
                        Toast('本题有'+this.list[this.currentIndex].len+'个答案')
                        return false
                }
          }
         
      }
      if (this.currentIndex < len - 1) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
    },
    toQuestion(index) {
      this.currentIndex = index;
      this.drawer = false;
    },
    submit() {
      console.log(this.list);
      let flag = true;
      let answerArr = [];
      this.list.forEach((item, index) => {
        if (index < 20) {
          answerArr.push(item.answer);
          if (item.answer == "") {
            flag = false;
          }
        } else {
          answerArr.push(item.answer.sort().toString());
          if (item.answer.length == 0) {
            flag = false;
          }
        }
      });

      if (flag) {
        if (this.isPC) {
          this.$confirm("提交答案后不能继续考试, 是否提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              axios
                .post("/api/exam/addExam", {
                  name: this.name,
                  phone: this.phone,
                  answer: answerArr,
                })
                .then((res) => {
                  console.log(res);
                  if(res.data.isSuccess){
                    //   this.$message({
                    //     type: "success",
                    //     message: "提交成功",
                    // });
                    this.$router.replace({name:'success'})
                  }else{
                       this.$message({
                        type: "info",
                        message: res.data.message,
                    });
                  }
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消",
              });
            });
        } else {
          Dialog.confirm({
            title: "提示",
            message: "提交答案后不能继续考试, 是否提交?",
          })
            .then(() => {
              axios
                .post("/api/exam/addExam", {
                  name: this.name,
                  phone: this.phone,
                  answer: answerArr,
                })
                .then((res) => {
                  if(res.data.isSuccess){
                     this.$router.replace({name:'success'})
                  }else{
                    Toast(res.data.message)
                  }
                });
            })
            .catch(() => {
              Toast('取消')
            });
        }
      } else {
        if (this.isPC) {
          this.$message({
            type: "error",
            message: "还有题目未完成",
          });
        } else {
          Toast("还有题目未完成");
        }

        setTimeout(() => {
          this.drawer = true;
        }, 1000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.exam {
  text-align: left;
  padding: 15px;
  .questionTItle {
    line-height: 36px;
    font-size: 16px;
    padding: 10px 0;
  }
  .question {
    position: relative;
    padding-left: 40px;
    line-height: 26px;
    font-size: 16px;
    margin-bottom: 15px;
    color: #666;
    span {
      position: absolute;
      height: 26px;
      line-height: 26px;
      top: 0;
      left: 0;
      color: #333;
      font-weight: bold;
    }
  }
  .el-radio-group {
    width: 100%;
    background-color: #f8f8f8;
    padding: 10px 0 10px 40px;
    .el-radio {
      display: block;
      line-height: 38px;
    }
  }
  .el-checkbox-group {
    width: 100%;
    background-color: #f8f8f8;
    padding: 10px 0 10px 40px;
    .el-checkbox {
      display: block;
      line-height: 38px;
    }
  }
}
.btnBox {
  position: relative;
  height: 44px;
  line-height: 44px;
  margin-top: 30px;
  .pre {
    height: 36px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  .next {
    height: 36px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  .center {
    width: 100px;
    margin: 0 auto;
    text-align: center;
  }
}
.answerBox {
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  li {
    width: 110px;
    display: inline-block;
    margin-bottom: 5px;
    .list {
      line-height: 30px;
      display: flex;
      align-items: center;
      height: 30px;
    }
    .text {
      display: inline-block;
      width: 60px;
      height: 30px;
      color: #67c23a;
    }
    .textNo {
      background-color: red;
      opacity: 0.7;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
}
.submitBox{
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
/deep/.el-drawer__header {
  margin-bottom: 10px;
}
</style>