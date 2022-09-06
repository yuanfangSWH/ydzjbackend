<template>
  <div class="add-box">
    <div class="so-nav">
      <div class="so-box1">
        <span class="s01">搜索</span>
        <el-input class="so-ipt"
                  clearable
                  placeholder="搜索商家名称/用户手机号"
                  v-model="keyword">
        </el-input>
      </div>
      <div class="so-box1">
        <span class="s01">时间选择</span>
        <div class="">
          <el-date-picker class="datePicker"
                          v-model="value2"
                          type="datetimerange"
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          align="right"
                          value-format="yyyy-MM-dd HH:mm"
                          format="yyyy-MM-dd HH:mm"
                          @change="dateChange">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="selectBox">
      <div class="zx-box1">
        <span class="queue-s01">状态</span>
        <el-select class="se-nav"
                   v-model="status"
                   placeholder="请选择"
                   @change="showStatus">
          <el-option v-for="item in StatusArr"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="btnBox">
      <span>
        <el-button class="sosuo"
                   type="primary"
                   @click="filtrateFun">筛选</el-button>
      </span>
      <span style="margin-left: 10px">
        <el-button class="sosuo"
                   type="primary"
                   @click="clearFun">清空条件</el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterItem",
  props: {
    keyword: String,
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      sceneText: "",
      value2: "",
      status: "",
      start_time: "",
      end_time: "",
      StatusArr: [
        { value: null, label: "全部" },
        { value: 0, label: "删除" },
        { value: 1, label: "正常" },
        { value: 2, label: "违规" },
        { value: 3, label: "待审核" }
      ],
    };
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    //日期选择
    dateChange (val) {
      if (val) {
        this.start_time = val[0];
        this.end_time = val[1];
      } 
      // else {
      //   this.start_time = "";
      //   this.end_time = "";
      //   this.$emit(
      //     "filtrateFun",
      //     this.keyword,
      //     this.status,
      //     this.start_time,
      //     this.end_time,
      //     2
      //   );
      // }
    },
    //座位筛选
    showPlace (val) {
      // console.log(val)
    },
    //状态筛选
    showStatus (val) { },
    filtrateFun () {
      this.$emit(
        "filtrateFun",
        this.keyword,
        this.status,
        this.start_time,
        this.end_time,
        1
      );
    },
    clearFun () {
      this.keyword = "";
      this.status = null;
      this.start_time = "";
      this.end_time = "";
      this.value2 = "";
      this.$emit(
        "filtrateFun",
        this.keyword,
        this.status,
        this.start_time,
        this.end_time,
        2
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.add-box {
  margin: 10px 0;
  .selectBox {
    float: left;
    margin: 15px 0 15px 20px;
    width: 460px;
    .se-nav {
      margin: 0 8px;
      width: 334px;
    }
    .queue-s01 {
      width: 100px;
      display: inline-block;
      text-align: right;
    }
  }
  .btnBox {
    float: left;
    margin-bottom: 15px;
    margin-top: 16px;
    .sosuo {
      float: left;
      background-color: #f4f4f4 !important;
      border: 1px solid #cecece;
      color: #0a0a0a;
      width: 90px;
      margin-right: 10px;
    }
  }
}
.so-nav {
  width: 504px;
  float: left;
  margin-bottom: 15px;
  .so-box1 {
    width: 514px;
    display: inline-block;
    position: relative;
    margin: 10px 0 0 0;
    .s01 {
      width: 74px;
      line-height: 40px;
      float: left;
      margin-right: 10px;
      text-align: right;
    }
    .sosuo {
      margin-left: 10px;
      float: left;
      background-color: #f4f4f4 !important;
      border: 1px solid #cecece;
      color: #0a0a0a;
      width: 90px;
    }
    .so-ipt {
      border-color: #cecece;
      float: left;
      width: 426px;
    }
    .el-input__suffix {
      color: #000 !important;
      font-weight: bold;
    }
    .datePicker {
      width: 426px;
    }
  }
}
</style>