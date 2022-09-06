<!--
 * @Author: 朱强
 * @Date: 2021-02-19 09:22:12
 * @LastEditTime: 2021-04-12 11:26:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\shopPhone.vue
-->
<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle"
           v-if="!shop_id > 0">
        {{ this._getVuex("pageTitle") }}
      </div>
      <div class="shanxdiv">
        <div class="rucwz2">关键字</div>
        <el-input style="width: 350px; margin-right: 10px"
                  placeholder="输入电话或者店铺"
                  v-model="searchOption.keyword"
                  @change="screening"
                  clearable></el-input>
        <el-date-picker class="datePicker"
                        v-model="searchTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        @change="dateChange"></el-date-picker>
        <el-button class="filter-btn"
                   type="primary"
                   @click="screening"
                   style="margin-left: 10px">筛选</el-button>
        <el-button class="filter-btn"
                   type="primary"
                   @click="resetData">清空条件</el-button>
      </div>
    </div>

    <div class="shopSet">
      <el-table ref="multipNum"
                stripe
                :data="tableListData"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                @sort-change="handleDataSort">
        <el-table-column prop="id"
                         label="ID"
                         width="70"
                         sortable="true" />
        <el-table-column label="用户信息">
          <template slot-scope="scope">
            <div class="duio muzhicss"
                 @click="userInformation(scope.row)">
              <el-image class="ustrimg"
                        v-if="scope.row.avatar"
                        :src="scope.row.avatar"
                        fit="cover"></el-image>
              <div>
                <div class="bjgt">
                  <el-tooltip class="item"
                              effect="dark"
                              :content="scope.row.nickname"
                              placement="bottom"
                              :disabled="getShow2(scope.row.nickname)">
                    <div :title="getAgent2(scope.row.nickname)">
                      {{ getAgent2(scope.row.nickname) }}（<span v-if="scope.row.gender == 0">未知</span>
                      <span v-else-if="scope.row.gender == 1">男</span>
                      <span v-else-if="scope.row.gender == 2">女</span>/{{
                        scope.row.age
                      }}岁）
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shop_phone"
                         label="拨打号码" />
        <el-table-column prop="name"
                         label="店铺名称" />
        <el-table-column prop="address"
                         label="店铺地址" />
        <el-table-column prop="create_time"
                         label="拨打时间" />
      </el-table>
      <div class="pagination">
        <el-pagination ref="pagination"
                       :current-page="searchOption.page"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="searchOption.page_size"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       @size-change="handlePageSizeChange"
                       layout="sizes,prev, pager, next,jumper"
                       :total="total"></el-pagination>
      </div>
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"
                   :routerURL="routerURL"></userBounced>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>
<script>
export default {
  name: "ShopPhone",
  props: {
    enable: {
      type: Boolean,
      default: true,
    },
    shop_id: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      usertx: false,
      routerURL: "/shopPhone",
      loading: false,
      tableListData: [],
      total: 0,
      searchTime: ["", ""],
      searchOption: {
        shop_id: null,
        keyword: "",
        start: "",
        end: "",
        page: 1,
        page_size: 10,

      },
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
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
    };
  },
  methods: {
    // 内容过长，鼠标移入显示全部
    getAgent2 (v) {
      return v.length > 6 ? v.substring(0, 6) + " ..." : v;
    },
    getShow2 (v) {
      return v.length > 10 ? false : true;
    },
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v && v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow (v) {
      return v && v.length > 20 ? false : true;
    },
    handleDataSort (obj) {
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
    },
    //日期选择
    dateChange (val) {
      if (val) {
        this.searchOption.start = val[0];
        this.searchOption.end = val[1];
      }
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    screening () {
      this.searchOption.page = 1;
      this.pageChange();
    },
    resetData () {
      this.searchOption = {
        shop_id: this.shop_id == undefined ? null : this.shop_id,
        keyword: "",
        start: "",
        end: "",
        page: 1,
      };
      this.searchTime = [];
      this.pageChange();
    },
    /* 改变页数 */
    pageChange (p) {
      if (p) this.searchOption.page = p;
      this.getTableList();
      // this.$router.push({
      //   path: "/shopPhone",
      //   query: this.searchOption,
      // });
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
    iniPageParam () {
      if (this.shop_id != undefined) {
        var data = this.$store.state.screeningData.ShopPhone;
        if (data) {
          if (data.Yuanfang) {
            this.searchOption = {
              keyword: data.keyword,
              start: data.start,
              end: data.end,
              page: data.page,
            };
            if (data.start && data.end) {
              this.searchTime = [data.start, data.end];
            }
            //初始化VUEX筛选存储
            var value = this.$store.state.screeningData;
            var groupData = {
              ShopPhone: { Yuanfang: false },
            };
            Object.assign(value, groupData);
            this.$store.dispatch("updateVuex", {
              key: "screeningData",
              value: value,
            });
          }
        }
      } else {
        this.searchOption = {
          shop_id: this.shop_id,
          page: 1,
          page_size: 10,
        };
        this.searchTime = [];
      }
      this.getTableList();
    },
    ConditionsF () {
      let data = this.$store.state.screeningData;
      let groupData = {
        ShopPhone: this.searchOption,
      };
      groupData.ShopPhone.Yuanfang = true;
      Object.assign(data, groupData);
      //将筛选条件存储到VUEX
      this.$store.dispatch("updateVuex", {
        key: "screeningData",
        value: data,
      });
      console.info("Saved the search options...");
    },
    /* 获取列表内容 */
    getTableList () {
      var datas = this.searchOption;
      this.loading = true;
      this.api.shop
        .shopPhone(datas)
        .then(({ data }) => {
          let res = data.data;
          this.loading = false;
          this.$refs.pagination.internalCurrentPage = this.searchOption.page;

          this.tableListData = res.data;
          this.total = res.count ? res.count : 0;
          //this.ConditionsF();
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  created () {
    if (this.shop_id == undefined) this.iniPageParam();
  },
  beforeDestroy () {
    //if (this.shop_id == undefined) this.ConditionsF();
  },
  watch: {
    // $route(to, from) {
    //   this.iniPageParam();
    //   this.getTableList();
    // },
    enable: {
      immediate: true,
      handler (val) {
        if (val) {
          if (this.shop_id != undefined) {
            this.searchOption.shop_id = this.shop_id;
            this.iniPageParam();
          }
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}

.shanxdiv {
  margin-bottom: 10px;
  display: flex;
  .rucwz2 {
    color: #0a0a0a;
  }
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
    width: 50% !important;
    .el-input {
      min-width: 400px !important;
      width: 50% !important;
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
}
</style>