<template>
  <div class="shopSet">
    <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
    <el-form label-width="400px" class="demo-ruleForm">
      <el-form-item
        :label="item.config_desc"
        v-for="(item, key) in valueData"
        :key="key"
      >
        <!-- 数字输入框 -->
        <el-input
          v-if="item.config_type == 0"
          style="width: 50%"
          placeholder="请输入对应内容"
          v-model="item.config_value"
          clearable
        ></el-input>
        <!-- 字符串输入框 -->
        <el-input
          v-if="item.config_type == 1"
          style="width: 80%"
          placeholder="请输入对应内容"
          v-model="item.config_value"
          clearable
        ></el-input>
        <!-- 文本框 -->
        <el-input
          v-if="item.config_type == 2"
          type="textarea"
          :rows="4"
          placeholder="请输入对应内容"
          v-model="item.config_value"
        >
        </el-input>
        <!-- 单选框 -->
        <el-radio-group
          v-model="item.config_value"
          v-if="item.config_type == 3"
        >
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
        <!-- 多选框 -->
        <el-checkbox-group
          v-model="item.config_value"
          v-if="item.config_type == 4"
        >
          <el-checkbox label="1"></el-checkbox>
          <el-checkbox label="2"></el-checkbox>
          <el-checkbox label="3"></el-checkbox>
        </el-checkbox-group>
        <!-- 下拉框 -->
        <el-select
          v-if="item.config_type == 5"
          style="margin-right: 10px"
          v-model="item.config_value"
          placeholder="请选择"
        >
          <el-option key="0" label="禁用" value="0"></el-option>
          <el-option key="1" label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="float: right" type="primary" @click="Update"
          >保存配置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valueData: [],
      category: [],
      category_id: "",
    };
  },
  created() {
    this.category = this.$store.state.temporaryZU;
    var category_name = this._getVuex("pageTitle");
    for (var i = 0; i < this.category.length; i++) {
      if (this.category[i].category_name == category_name) {
        this.category_id = this.category[i].category_id;
        break;
      }
    }
    this.getSystem();
  },
  methods: {
    //项目配置列表
    getSystem() {
      var data = { category_id: this.category_id };
      this.api.system.configList(data).then((res) => {
        this.valueData = res.data.data;
      });
    },
    //项目配置保存
    Update() {
      var data = {};
      for (var i = 0; i < this.valueData.length; i++) {
        data[this.valueData[i].config_name] = this.valueData[i].config_value;
      }
      this.api.system.configUpdate(data).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.getSystem();
      });
    },
  },
};
</script>

<style scoped>
.mainBox >>> .el-input {
  width: 50% !important;
}
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
.el-button--warning {
  background-color: #ffbe11;
  box-shadow: 0px 4px 4px rgba(255, 190, 17, 0.5);
  border: none;
  color: #0a0a0a;
  font-size: 15px;
}
.el-button--info {
  background-color: #f1f1f1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border: none;
  color: #0a0a0a;
  font-size: 15px;
}
.el-form-item {
  width: 50% !important;
}
.form-shan {
  margin-left: 10px;
}
.form-shan2 {
  margin-left: 10px;
  color: #aaaaaa;
  display: inline-block;
}
.attrBox {
  border: 1px solid #cecece;
  background: #f4f4f4;
  padding: 20px 20px 0;
  width: 60%;
  margin: 20px 0;
}
.box01 {
  display: flex;
  margin-bottom: 20px;
}
.m-nav {
  flex: 1;
}
.attr-s01 {
  margin-right: 10px;
}
.box02 {
  padding-left: 10%;
}
.btnBox {
  margin-top: 20px;
}
.shopSet >>> .timeNav {
  width: 120px !important;
  margin-right: 10px;
}
.timeBox {
  display: flex;
}
.time-span {
  margin: 0 5px;
}
.xiangche {
  margin-right: 10px;
}
</style>