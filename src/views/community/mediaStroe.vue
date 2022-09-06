<!--
 * @Author: your name
 * @Date: 2021-03-15 14:33:57
 * @LastEditTime: 2021-03-15 19:26:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\community\mediaStroe.vue
-->
<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <el-tabs style="width: 100%" v-model="panelTab" @tab-click="tabFun">
        <el-tab-pane label="图片库" name="pic">
          <mediaStorePanel v-if="panelType == 1" :type="panelType" />
        </el-tab-pane>
        <el-tab-pane label="视频库" name="video">
          <mediaStorePanel v-if="panelType == 2" :type="panelType" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import mediaStorePanel from "./components/mediaStorePanel";
export default {
  name: "mediaStroe",
  components: {
    mediaStorePanel,
  },
  data() {
    return {
      panelType: 1,
      panelTab: "pic",
    };
  },
  methods: {
    tabFun(obj) {
      if (obj.name == "pic") {
        this.panelType = 1;
      }
      if (obj.name == "video") {
        this.panelType = 2;
      }
    },
  },
  created() {
    let t = this.$route.query.type;
    if (t) {
      this.panelTab = t;
      this.tabFun({ name: t });
    }
  },
};
</script>
<style lang="scss" scoped>
.y-btn {
  background-color: #fff6df !important;
  border: 1px solid #ffcf4d;
  color: #000;
}
.b-btn {
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
}
.youbliq {
  width: 140px;
}
.youbli {
  flex: 1;
  margin-left: 20px;
}
.youblidiv {
  width: 98%;
}
.glyshengp {
  width: 100%;
  display: flex;
}
.shanxdiv {
  display: flex;
  align-items: center;
}
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .pageTitle {
    margin: 10px 0 20px 0;
    font-size: 24px;
    color: #0a0a0a;
  }
  .add-box {
    margin: 10px 0;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .searchInput {
    float: right;
    width: 350px;
  }
  .el-form-item {
    width: 100% !important;
    .el-input {
      // min-width: 400px !important;
      width: 80% !important;
    }
    .el-textarea {
      min-width: 200px !important;
      width: 280px !important;
    }
    .el-form-item__label {
      width: 120px !important;
    }
    .el-form-item__content {
      margin-left: 120px !important;
    }
    .el-select,
    .el-textarea,
    .el-cascader,
    .el-date-editor--timerange.el-input__inner {
      min-width: 200px !important;
      width: 50% !important;
    }
  }
  .imgbox {
    width: 100%;
    text-align: center;
    display: inline-block;
  }
  .so-nav {
    width: 350px;
    display: flex;
  }
  .sosuo {
    margin-left: 10px;
  }
  .so-ipt {
    border-color: #cecece;
  }
  .el-input__suffix {
    color: #000 !important;
    font-weight: bold;
  }
}
</style>
