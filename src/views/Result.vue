<template>
  <div class="result">
    <el-card class="top">
      <el-breadcrumb
        separator="/"
        style="height: 40px; line-height: 40px; width: 200px"
      >
        <el-breadcrumb-item>考试</el-breadcrumb-item>
        <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" size="small" v-sdc @click="getExcel()"
        >导出成绩单</el-button
      >
    </el-card>
    <el-table :data="tableData" border="" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="course" label="分数"> </el-table-column>
      <el-table-column prop="createTime" label="交卷时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <!-- <el-button @click="edit(scope.row)" type="text" size="small"
            >编辑</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
// import Blob from "@/utils/Blob";
const { export_json_to_excel } = require("@/utils/Export2Excel");
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      axios.get("api/exam/queryExamAll", {}).then((res) => {
        if (res.data.isSuccess) {
          this.tableData = res.data.data;
        }
      });
    },
    getExcel() {
      require.ensure([], () => {
        const tHeader = ["姓名", "电话", "分数", "交卷时间"];
        const filterVal = ["name", "phone", "course", "createTime"];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "考试成绩汇总");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    handleClick(item) {
      this.$confirm("删除后不可恢复, 是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post("/api/exam/deleteExam", {
              _id: item._id,
            })
            .then((res) => {
              if (res.data.isSuccess) {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
                this.load();
              } else {
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
    },
    edit(item) {
      console.log(item);
    },
  },
};
</script>
<style lang="scss" scoped>
.result {
  padding: 10px;
}
.top {
  // height: 40px;

  display: flex;
  justify-content: space-between;
}
/deep/ .el-card__body {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>