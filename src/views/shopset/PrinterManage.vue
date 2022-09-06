<template>
  <div class="shopSet">
    <div class="add-box">
      <el-button type="danger" @click="batchDelete">删除</el-button>
      <el-button type="primary" @click="addPrinter">新增</el-button>
      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      ></el-input>
    </div>
    <el-table
      ref="multipNum_type"
      stripe
      :data="printListData"
      @sort-change="sortFilterFun"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectPrinter"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="全选/ID" width="120" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.printer_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="打印机名称" width="150" />
      <el-table-column prop="brand" label="型号" width="150" />
      <el-table-column prop="sn" label="编号" width="150" sortable="custom" />
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <!-- <i v-if="scope.row.status===1" class="el-icon-check"></i> -->
          <span v-if="scope.row.status == 0">禁用</span>
          <span v-if="scope.row.status == 1">正常</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateDialog(scope.$index, JSON.parse(JSON.stringify(scope.row)), 'type')"
            >修改/查看</el-button
          >
          <el-button size="mini" type="danger" @click="openDelDialog(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <!-- <el-pagination page-size="15" :current-page='curPage' :hide-on-single-page="true" @prev-click="prePage" @current-change="pageChange" @next-click="nextPage" background layout="prev, pager, next" :total="total">
      </el-pagination>-->
    </div>

    <!-- 打印机详情 -->
    <el-dialog
      :title="printerDialogTitle"
      :visible.sync="printDetail"
      width="50%"
    >
      <el-form
        ref="updateForm"
        :model="currenPrinter"
        :rules="rulesForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="打印机型号" prop="brand">
          <el-input v-model="currenPrinter.brand" />
        </el-form-item>
        <el-form-item label="打印机名称" prop="name">
          <el-input v-model="currenPrinter.name" />
        </el-form-item>
        <el-form-item label="编号" prop="sn">
          <el-input v-model="currenPrinter.sn" />
        </el-form-item>
        <el-form-item label="终端密钥" prop="key">
          <el-input v-model="currenPrinter.key" />
        </el-form-item>
        <el-form-item label="打印联数" prop="times">
          <el-input v-model="currenPrinter.times" />
        </el-form-item>
        <el-form-item label="自定义信息" prop="custom_info">
          <el-input v-model="currenPrinter.custom_info" />
          <br />
          <el-checkbox v-model="currenPrinter.custom_info_larger"
            >是否放大自定义信息</el-checkbox
          >
        </el-form-item>
        <el-form-item label="二维码">
          <el-checkbox v-model="currenPrinter.show_qr"
            >是否显示二维码</el-checkbox
          >
        </el-form-item>
        <el-form-item label="商家信息">
          <el-checkbox v-model="currenPrinter.show_phone"
            >是否显示商家信息</el-checkbox
          >
        </el-form-item>
        <el-form-item label="状态">
          <el-checkbox v-model="currenPrinter.status">是否启用</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePrinter('updateForm')"
            >保存</el-button
          >
          <el-button @click="resetForm('updateForm')">取消</el-button>
        </el-form-item>
        <el-form-item class="printerImg">
          <img
            style="width: 418px; height: 530px"
            src="../../assets/print1.png"
          />
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加打印机 -->
    <el-dialog
      title="新增打印机"
      :visible.sync="showAddDialog"
      width="50%"
      ref="addForm"
    >
      <el-form
        ref="updateForm"
        :model="addPrinterData"
        :rules="rulesForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="打印机名称" prop="name">
          <el-input v-model="addPrinterData.name" />
        </el-form-item>
        <el-form-item label="型号" prop="brand">
          <el-input v-model="addPrinterData.brand" />
        </el-form-item>
        <el-form-item label="编号" prop="sn">
          <el-input v-model="addPrinterData.sn" />
        </el-form-item>
        <el-form-item label="终端密钥" prop="key">
          <el-input v-model="addPrinterData.key" />
        </el-form-item>
        <el-form-item label="打印联数" prop="times">
          <el-input v-model="addPrinterData.times" />
        </el-form-item>
        <el-form-item label="自定义信息">
          <el-input v-model="addPrinterData.custom_info" />
          <el-checkbox v-model="currenPrinter.custom_info_larger"
            >是否放大自定义信息</el-checkbox
          >
        </el-form-item>
        <el-form-item label="二维码">
          <el-checkbox v-model="currenPrinter.show_qr"
            >是否显示二维码</el-checkbox
          >
        </el-form-item>
        <el-form-item label="商家信息">
          <el-checkbox v-model="currenPrinter.show_phone"
            >是否显示商家信息</el-checkbox
          >
        </el-form-item>
        <el-form-item label="状态">
          <el-checkbox v-model="currenPrinter.status">是否启用</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertPrinter('updateForm')"
            >保存</el-button
          >
          <el-button @click="resetForm('updateForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 删除单个打印机 -->
    <el-dialog
      :title="'删除打印机-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要删除此打印机吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deletePrinter('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog
      title="删除打印机"
      :visible.sync="mutilDeletePrinterBox"
      width="50%"
    >
      <span class="s-title">确定要删除以下打印机吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilDeletePrinterBox = false">取 消</el-button>
        <el-button type="primary" @click="deletePrinter('mutil')"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ShopSet",
  data() {
    return {
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      msg: "店铺打印机",
      srcList: [],
      searchValue: "",
      printDetail: false,
      mutilDeletePrinterBox: false,
      deleteDialog: false,
      showUpdateDialog: false,
      showAddDialog: false,
      printerDialogTitle: "",
      currenDeleteRow: {},
      deltitle: "",
      curPage: 1,
      total: 0,
      multipleSelection: "",
      nameArr: [],
      printListData: [
        {
          printer_id: "",
          name: "",
          brand: "",
          sn: "",
          status: "",
          printer_id: "",
        },
      ],
      addPrinterData: {
        name: "",
        brand: "",
        sn: "",
        key: "",
        times: null,
        custom_info: "",
        custom_info_larger: "",
        show_qr: "",
        show_phone: "",
      },
      currenPrinter: {
        shop_id: 0,
        merchant_id: 0,
        printer_id: "",
        name: "",
        brand: "",
        sn: "",
        status: "",
        key: "",
        times: null,
        custom_info: "",
        custom_info_larger: "",
        show_qr: "",
        show_phone: "",
      },

      rulesForm: {
        name: [
          { required: true, message: "请输入打印机名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        brand: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        sn: [{ required: true, message: "请输入终端编号", trigger: "blur" }],
        times: [{ required: true, message: "请输入打印联数", trigger: "blur" }],
        key: [{ required: true, message: "请输入终端密钥", trigger: "blur" }],
        custom_info: [
          { required: true, message: "请输入自定义信息", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    if (this.$route.query.shop_id && this.$route.query.merchant_id) {
      this.merchants.shop_id = Number(this.$route.query.shop_id);
      this.merchants.merchant_id = Number(this.$route.query.merchant_id);
      /* 把店铺商家ID数据存入VUEX */
      this.$store.dispatch("updateVuex", {
        key: "merchantsData",
        value: this.merchants,
      });
    } else {
      var dpID = this.$store.state.merchantsData;
      this.merchants.shop_id = Number(dpID.shop_id);
      this.merchants.merchant_id = Number(dpID.merchant_id);
    }
    this.getPrinterList(this.curPage);
  },
  methods: {
    getPrinterList(page) {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: page,
      };
      this.$store.dispatch("shop/printerList", data).then((res) => {
        console.log(res);
        this.printListData = res.data;
        this.total = res.count;
      });
    },
    updatePrinter(formName) {
      this.currenPrinter.times = parseInt(this.currenPrinter.times);
      this.currenPrinter.custom_info_larger =
        this.currenPrinter.custom_info_larger === true ? 1 : 0;
      this.currenPrinter.show_qr = this.currenPrinter.show_qr === true ? 1 : 0;
      this.currenPrinter.show_phone =
        this.currenPrinter.show_phone === true ? 1 : 0;
      this.currenPrinter.shop_id = this.merchants.shop_id;
      this.currenPrinter.merchant_id = this.merchants.merchant_id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("shop/updatePrinter", this.currenPrinter)
            .then((res) => {
              // console.log('update:',res)
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.getPrinterList(this.curPage);
              this.printDetail = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //table排序
    sortMethod(val) {
      let order = "asc";
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        order = "asc"; //正序
      } else {
        order = "desc"; //倒序
      }
      let data = { page: this.curPage, sort: val, order: order };
      this.$store.dispatch("shop/printerList", data).then((res) => {
        this.printListData = res.data;
        this.total = res.count;
      });
    },
    //table排序 当表格的排序条件发生变化的时候会触发该事件
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    searchDatas() {
      let data = { name: this.searchValue };
      this.$store.dispatch("shop/printerList", data).then((res) => {
        // console.log(res)
        this.printListData = res.data;
        this.total = res.count;
      });
    },

    openDelDialog(item) {
      this.deltitle = item.name;
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    addPrinter() {
      this.showAddDialog = true;
    },
    insertPrinter() {
      var datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        name: this.addPrinterData.name,
        brand: this.addPrinterData.brand,
        sn: this.addPrinterData.sn,
        key: this.addPrinterData.key,
        times: parseInt(this.addPrinterData.times),
        custom_info: this.addPrinterData.custom_info,
        custom_info_larger: this.addPrinterData.custom_info_larger ? 1 : 0,
        show_qr: this.addPrinterData.show_qr ? 1 : 0,
        show_phone: this.addPrinterData.show_phone ? 1 : 0,
      };
      this.$store.dispatch("shop/insertPrinter", datas).then((res) => {
        // this.$showMessage('添加成功')
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.getPrinterList(this.curPage);
        this.resetForm("updateForm");
        this.showAddDialog = false;
      });
    },
    batchDelete() {
      if (this.multipleSelection) {
        this.mutilDeletePrinterBox = true;
      } else {
        this.$message({
          message: "请先勾选要删除的打印机",
          type: "warning",
        });
      }
    },
    deletePrinter(type) {
      let oneId = [];
      oneId.push(this.currenDeleteRow.printer_id);
      var id = type === "one" ? { id: oneId } : { id: this.multipleSelection };
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: id,
      };
      this.$store.dispatch("shop/deletePrinter", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getPrinterList(this.curPage);
        this.mutilDeletePrinterBox = false;
        this.deleteDialog = false;
      });
    },
    /* 修改按钮打开窗口 */
    updateDialog(index, row) {
      this.printDetail = true;
      this.printerDialogTitle = "打印机管理-" + row.name;
      this.currenPrinter = {
        printer_id: row.printer_id,
        name: row.name,
        sn: row.sn,
        brand: row.brand,
        status: row.status,
        key: row.key,
        times: row.times,
        custom_info: row.custom_info,
        custom_info_larger: row.custom_info_larger,
        show_qr: row.show_qr,
        show_phone: row.show_phone,
      };
    },
    //当选择项发生变化时会触发该事件
    selectPrinter(val) {
      this.multipleSelection = "";
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection += (index > 0 ? "," : "") + item.printer_id;
        this.nameArr.push(item.name);
      });
    },
    prePage() {
      this.curPage -= 1;
      this.getPrinterList(this.curPage);
    },
    pageChange(page) {
      this.curPage = page;
      this.getPrinterList(this.curPage);
    },
    nextPage() {
      this.curPage += 1;
      this.getPrinterList(this.curPage);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.shopSet {
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  padding: 15px 15px;
  font-size: 20px;
  .demo-ruleForm {
    position: relative;
  }
  .el-form-item {
    width: 50% !important;
    .el-input {
      min-width: 200px !important;
      width: 50% !important;
    }
    .el-textarea {
      min-width: 200px !important;
      width: 50% !important;
    }
  }
  .printerImg {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .searchInput {
    float: right;
    width: 350px;
  }
  .warning-row {
    background: rgb(219, 204, 175) !important;
  }
  .success-row {
    background: #d8eccd !important;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
}
</style>
<style>
.pagination {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
</style>
