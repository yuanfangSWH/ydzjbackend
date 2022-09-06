<!--
 * @Author: 朱强
 * @Date: 2021-01-25 15:53:17
 * @LastEditTime: 2021-02-02 18:04:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\shopApply.vue
-->
<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle">
        {{ this._getVuex("pageTitle") }}
        <div class="shanxdiv">
          <div style="flex: 1">
            <el-button v-if="searchOption.status != 0"
                       type="danger"
                       @click="moreDeleteFun(0)">批量删除</el-button>
          </div>
          <div class="">
            <el-input style="width: 350px; margin-right: 10px"
                      placeholder="搜索关键字"
                      v-model="searchOption.keyword"
                      @change="screening"
                      clearable></el-input>
            <el-button type="danger"
                       @click="screening"
                       style="margin-left: 10px">搜索</el-button>
          </div>
        </div>
      </div>

      <el-tabs type="border-card"
               v-model="menuIndex"
               @tab-click="tabChange">
        <el-tab-pane label="待审核"
                     name="0">
          <shop-apply-item v-if="menuIndex == '0'"
                           :shopData="tableListData"
                           :status="0"
                           :loading.sync="loading"
                           @sortFun="handleSortFun"
                           @applyFun="handleApply" />
        </el-tab-pane>
        <el-tab-pane label="已入驻"
                     name="1">
          <shop-apply-item v-if="menuIndex == '1'"
                           :shopData="tableListData"
                           :status="1"
                           :loading.sync="loading"
                           @sortFun="handleSortFun"
                           @applyFun="handleApply" />
        </el-tab-pane>
        <el-tab-pane label="未通过"
                     name="2">
          <shop-apply-item v-if="menuIndex == '2'"
                           :shopData="tableListData"
                           :status="2"
                           :loading.sync="loading"
                           @sortFun="handleSortFun"
                           @applyFun="handleApply" />
        </el-tab-pane>
      </el-tabs>

      <div class="pagination">
        <el-pagination ref="pagination"
                       :current-page="searchOption.page"
                       :hide-on-single-page="true"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="searchOption.page_size"
                       @current-change="pageChange"
                       background
                       @size-change="handlePageSizeChange"
                       layout="sizes,prev, pager, next,jumper"
                       :total="total"></el-pagination>
      </div>
    </div>

    <el-dialog title="完善店铺信息"
               :visible.sync="shopDataFormDialog"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               @opened="setShopDataForm">
      <shop-data-form ref="shopDataForm"
                      :visible.sync="shopDataFormDialog"
                      @handleShopOk="handleShopOk" />
    </el-dialog>
    <!-- 备注 -->
    <el-dialog title="备注"
               :visible.sync="markDialog"
               width="30%">
      <div>
        <el-input type="textarea"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  placeholder="填写备注信息"
                  v-model="mark">
        </el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="markDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="markSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除单条 -->
    <el-dialog title="删除"
               :visible.sync="dialogVisible"
               width="30%">
      <span>确定要删除“{{a_name}}”这个店铺入住申请吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteFun">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除多个 -->
    <el-dialog title="删除"
               :visible.sync="dialogMore"
               width="30%">
      <span>确定要删除以下数据吗？</span>
      <div style="margin-top:30px">
        <span v-for="(item,index) in nameArr"
              :key="index">{{item}}，</span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogMore = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteFun">确 定</el-button>
      </span>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>
<script>
import shopApplyItem from "./components/shopApplyItem";
import shopDataForm from "./components/shopDataForm";
export default {
  name: "shopApply",
  components: {
    shopApplyItem,
    shopDataForm,
  },
  data () {
    return {
      //testDataForm: {},
      shopDataFormDialog: false,
      menuIndex: "0", //默认显示“待审核”
      loading: false,
      tableListData: [],
      total: 0,
      addItem: {
        type_id: "",
        name: "",
        ename: "",
        province_id: "",
        city_id: "",
        area_id: "",
        address: "",
        basic_price: "",
        score: "",
        logo: "",
        business_start_time: "",
        business_stop_time: "",
        summary: "",
        phone: "",
        order_all_count: "",
        commission_rate: "",
        reserve_days: "",
        reserve_auto_audit: "0",
        shopping_auto_audit: "0",
        shopping_pay_online: "0",
        business_status: 1,
        notice: "",
        reserve_choose_place: "1",
        week_take_out_wine: "1",
        reserve_latest_arrive: "",
        status: 1,
        vr: null,
        vr_url: "",
        svg: null,
        svg_url: "",
        reserve: null,
        choose_place: null,
        choose_time: null,
        refund: null,
        group_buy_num: null,
        // menu:null
      },
      searchOption: {
        keyword: "",
        status: 0,
        page: 1,
        page_size: 10,
        sort: "create_time",
        order: "DESC",
      },
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      id: '',
      markDialog: false,
      mark: '',
      multipleSelection: [],
      dialogMore: false,
      deleteStatus: 0,
      nameArr: [],
      dialogVisible: false,
      a_name: ''
    };
  },
  created () {
    if (this.$route.query.sort) {
      this.iniPageParam();
    }
    this.getTableList();
  },
  watch: {
    $route (to, from) {
      this.iniPageParam();
      this.getTableList();
    },
  },
  methods: {
    screening () {
      this.pageChange();
    },
    getTableList () {
      var data = this.searchOption;
      console.log(data)
      this.loading = true;
      this.api.shop
        .shopApply(data)
        .then(({ data }) => {
          let res = data;
          this.loading = false;
          this.$refs.pagination.internalCurrentPage = this.searchOption.page;
          this.tableListData = res.data;
          this.total = res.count ? res.count : 0;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    iniPageParam () {
      this.menuIndex = this.$route.query.status
        ? String(this.$route.query.status)
        : "0";
      this.searchOption = {
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        status: this.$route.query.status,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        // keyword: this.$route.query.keyword ? decodeURIComponent(this.$route.query.keyword) : "",
        keyword: this.$route.query.keyword ? this.$route.query.keyword : "",
        page_size: this.searchOption.page_size,
      };
    },

    tabChange () {
      this.searchOption.keyword = "";
      this.pageChange(false);
    },

    /**
     * @description: 改变页码，也用于确定筛选等操作
     * @param {*} p
     * @return {*}
     */
    pageChange (p) {
      if (p) this.searchOption.page = p;
      this.searchOption.status = Number(this.menuIndex);
      // this.searchOption.keyword = this.searchOption.keyword ? encodeURIComponent(this.searchOption.keyword) : "";
      this.searchOption.keyword = this.searchOption.keyword ? this.searchOption.keyword : "";

      //console.info(this.searchOption);
      this.$router.push({
        path: "/shopApply",
        query: this.searchOption,
      });
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },

    /**
     * @description: 处理表格子组件调用的排序
     * @param {*} obj el-table的排序方法参数
     * @return {*}
     */
    handleSortFun (obj) {
      console.info(obj);
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
    },

    /**
     * @description: 处理表格子组件调用的改变数据状态
     * @param {*} obj 需要处理的数据
     * @param {*} v 改变状体的值
     * @return {*}
     */
    handleApply (obj, v) {
      if (v != 4) {
        if (v == 3) {// 删除
          this.id = obj.apply_id
          this.a_name = obj.name
          this.deleteStatus = 4
          this.dialogVisible = true
        } else if (v != '') {//通过、拒绝
          if (v == 1) {//通过
            this.addItem.name = obj.name;
            this.addItem.type_id = obj.type_id;
            this.addItem.phone = obj.phone;
            this.addItem.address = obj.address;
            this.addItem.apply_id = obj.apply_id;
            this.shopDataFormDialog = true;
            return;
          }
          let id = obj.apply_id;
          this.$confirm("确定要修改状态吗？", "提示")
            .then(() => {
              this.loading = true;
              this.api.shop
                .shopHandingApply({ id: id, status: v })
                .then(({ data }) => {
                  let res = data;
                  this.loading = false;
                  this.getTableList();
                  this.$message({
                    message: "" + res.msg,
                    type: "success",
                  });
                })
                .catch((e) => {
                  this.loading = false;
                  console.info(e);
                });
            })
            .catch((e) => {
              this.loading = false;
              console.info(e);
            });
        } else {//批量操作（删除）
          this.handleSelectionChange(obj)
        }
      } else {//备注
        this.id = obj.apply_id
        this.mark = obj.mark
        this.markDialog = true
      }
    },
    handleSelectionChange (val) {
      var arr = []
      this.nameArr = []
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].apply_id)
        this.nameArr.push(val[i].name)
      }
      this.multipleSelection = arr
      this.nameArr = Array.from(new Set(this.nameArr))
    },
    moreDeleteFun (n) {
      if (n == 0) {//批量删除
        if (this.multipleSelection == '') {
          this.$message({
            message: '请先勾选要删除的数据',
            type: 'warning'
          });
        } else {
          this.dialogMore = true
        }
      }
    },
    deleteFun () {
      let data = {}
      if (this.deleteStatus == 4) {
        data = {
          id: [this.id]
        }
      } else {
        data = {
          id: this.multipleSelection
        }
      }
      this.api.shop.shopApplyDelete(data).then((res) => {
        this.dialogVisible = false
        this.dialogMore = false
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.multipleSelection = []
        this.nameArr = []
        this.getTableList()
      });
    },
    setShopDataForm () {
      let data = Object.assign({}, this.addItem);
      delete data.apply_id;
      this.$refs.shopDataForm.setFormData(data);
    },
    handleShopOk (obj) {
      if (this.addItem.apply_id) {
        this.loading = true;
        this.api.shop
          .shopHandingApply({
            id: this.addItem.apply_id,
            status: 1,
            merchant_id: obj.merchant_id,
            shop_id: obj.shop_id,
          })
          .then(({ data }) => {
            let res = data;
            this.loading = false;
            this.getTableList();
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
          })
          .catch((e) => {
            this.loading = false;
            console.info(e);
          });
      }
    },
    markSubmit () {
      if (this.mark != '') {
        let datas = {
          apply_id: this.id,
          mark: this.mark
        }
        this.api.shop.shopMark({
          apply_id: this.id,
          mark: this.mark
        })
          .then(({ data }) => {
            let res = data;
            this.markDialog = false
            this.getTableList();
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
          })
          .catch((e) => {
            this.markDialog = false;
            console.info(e);
          });
        // this.api.shop.shopMark(datas).then((res) => {
        //   this.$message({
        //       message: ''+res.data.msg,
        //       type: 'success'
        //   });
        //   this.markDialog = false
        //   this.dataFun()
        // });
      } else {
        this.markDialog = false
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.el-button--danger {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.el-button--primary {
  color: #000;
  background-color: #fff6df !important;
  border-color: #ffbe11 !important;
}
.shanxdiv {
  margin: 20px 0 10px;
  display: flex;
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