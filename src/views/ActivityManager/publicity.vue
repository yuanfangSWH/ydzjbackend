<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>

    <div class="add-box">
      <div class="btn-nav">
        <el-button type="danger" @click="insertTK">新增</el-button>
        <el-button
          v-show="is_delete == 0"
          type="danger"
          @click="batchDelete"
          :disabled="!tableListData.length > 0"
          >下架</el-button
        >
        <el-button
          v-show="is_delete == 1"
          type="danger"
          @click="batchRestore"
          :disabled="!tableListData.length > 0"
          >恢复</el-button
        >
        <el-button type="primary" v-show="is_delete == 0" @click="hszqh"
          >回收站</el-button
        >
        <el-button type="primary" v-show="is_delete == 1" @click="hszqh"
          >返回</el-button
        >
      </div>
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectItem"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        prop="type_id"
        label="全选/ID"
        width="120"
        sortable="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.activity_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="海报">
        <template slot-scope="scope">
          <el-image
            class="lihaibimg"
            :src="scope.row.img_url"
            @click="showImglist(scope.row.img_url)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="海报标题" />
      <el-table-column prop="activity.name" label="对应活动名称" />
      <el-table-column prop="activity.url" label="对应活动链接" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column fixed="right" align="center" label="操作" width="140">
        <template slot-scope="scope">
          <div style="display: flex">
            <div
              class="jump1"
              @click="openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))"
            >
              编辑
            </div>
            <div
              class="jump2"
              v-show="scope.row.status == 1"
              @click="openDelDialog(scope.row)"
            >
              下架
            </div>
            <div
              class="jump2"
              v-show="scope.row.status == 0"
              @click="openRestore(scope.row)"
            >
              恢复
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 新增内容 -->
    <el-dialog title="新增" :visible.sync="insertDialog">
      <el-form
        :model="addItem"
        ref="formName"
        label-width="200px"
        class="updateArea"
        :rules="rulesForm"
      >
        <el-form-item label="对应活动" prop="activity_id">
          <el-select v-model="addItem.activity_id" placeholder="请选择对应活动">
            <el-option
              v-for="item in activityData"
              :key="item.activity_id"
              :label="item.name"
              :value="item.activity_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="海报标题" prop="title">
          <el-input v-model="addItem.title" class="inputap" />
        </el-form-item>
        <el-form-item label="海报文案" prop="summary">
          <el-input v-model="addItem.summary" class="inputap" />
        </el-form-item>
        <el-form-item label="海报" prop="img_url">
          <uploadFiles
            root="poster"
            ref="uploadImg"
            @theIMG="theIMG"
            :image-url="addItem.img_url"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="Number" v-model="addItem.sort" class="inputap" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="addItem.status" placeholder="请选择状态">
            <el-option :key="0" label="禁用" :value="0"></el-option>
            <el-option :key="1" label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertItem">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <el-form
        :model="currenItem"
        ref="updateArea"
        label-width="200px"
        class="updateArea"
        :rules="rulesForm"
      >
        <el-form-item label="对应活动" prop="activity_id">
          <el-select
            v-model="currenItem.activity_id"
            placeholder="请选择对应活动"
          >
            <el-option
              v-for="item in activityData"
              :key="item.activity_id"
              :label="item.name"
              :value="item.activity_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="海报标题" prop="title">
          <el-input v-model="currenItem.title" class="inputap" />
        </el-form-item>
        <el-form-item label="海报文案" prop="summary">
          <el-input v-model="currenItem.summary" class="inputap" />
        </el-form-item>
        <el-form-item label="图标" prop="img_url">
          <uploadFiles root="shop" ref="uploadImg" @theIMG="theIMG" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="Number" v-model="currenItem.sort" class="inputap" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currenItem.status" placeholder="请选择状态">
            <el-option :key="0" label="禁用" :value="0"></el-option>
            <el-option :key="1" label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="multiUpdate">确定</el-button>
      </span>
    </el-dialog>

    <!-- 下架单个内容 -->
    <el-dialog
      :title="'下架-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要下架这条海报吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量下架 -->
    <el-dialog title="下架" :visible.sync="mutilDeleteDialog" width="50%">
      <span class="s-title">确定要下架以下海报吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 恢复单个内容 -->
    <el-dialog
      :title="'恢复-' + deltitle"
      :visible.sync="RestoreDialog"
      width="30%"
    >
      <span>确定要恢复这条海报吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RestoreDialog = false">取 消</el-button>
        <el-button type="primary" @click="RestoreItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量恢复 -->
    <el-dialog title="恢复" :visible.sync="mutilRestore" width="50%">
      <span class="s-title">确定要恢复以下海报吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilRestore = false">取 消</el-button>
        <el-button type="primary" @click="RestoreItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 放大图片 -->
    <el-dialog title="" :visible.sync="dialogVisibleImg" width="50%">
      <template v-if="dialogVisibleImg">
        <el-carousel
          :autoplay="false"
          indicator-position="none"
          arrow="never"
          height="600px"
        >
          <el-carousel-item v-for="(item, index) in picData" :key="index">
            <div class="imgbox">
              <el-image
                style="height: 600px; width: auto"
                fit="contain"
                :src="item"
              ></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
export default {
  name: "publicity",
  components: {
    uploadFiles,
  },
  data() {
    return {
      //放大图片弹框
      dialogVisibleImg: false,
      picData: [],
      //回收站 0是关闭 1是开启
      is_delete: 0,
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      tableListData: [],
      activityData: [],
      deltitle: "",
      mutilRestore: false, //打开批量恢复框
      RestoreDialog: false, //打开恢复框
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开下架框
      deleteDialog: false, //打开下架框
      rulesForm: {
        activity_id: [
          { required: true, message: "请选择对应活动", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        summary: [{ required: true, message: "请输入文案", trigger: "blur" }],
        img_url: [
          { required: true, message: "请上传海报图片", trigger: "blur" },
        ],
      },
      currenDeleteRow: "", //当前选中的下架行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      //添加
      addItem: {
        activity_id: "",
        title: "",
        summary: "",
        img_url: "",
        sort: "",
        status: 1,
      },
      //编辑
      currenItem: {
        poster_id: "",
        activity_id: "",
        title: "",
        summary: "",
        img_url: "",
        sort: "",
        status: 1,
      },
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //放大IMG控件
    showImglist(row) {
      this.picData = [];
      this.dialogVisibleImg = true;
      this.picData.push(row);
    },
    //回收站切换
    hszqh() {
      if (this.is_delete == 1) {
        this.is_delete = 0;
      } else {
        this.is_delete = 1;
      }
      this.getTableList();
    },
    /*, 获取表单内容 */
    getTableList() {
      var data = {
        //回收站状态
        is_delete: this.is_delete,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.publicity.posterList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList();
    },
    //活动列表
    dataFun() {
      let data = {
        status: 1,
      };
      this.api.activity.activityList(data).then((res) => {
        this.activityData = res.data.data;
      });
    },
    //图片上传子组件传值
    theIMG(url) {
      this.addItem.img_url = url;
      this.currenItem.img_url = url;
    },
    //打开添加窗口
    insertTK() {
      this.dataFun();
      var _this = this;
      //初始化图片;
      setTimeout(function () {
        _this.$refs.uploadImg.concert("");
      }, 0);
      this.insertDialog = true;
    },
    /* 新增 */
    insertItem() {
      if ((this.addItem.sort = "")) {
        this.addItem.sort = 0;
      }
      this.addItem.sort = Number(this.addItem.sort);
      var data = this.addItem;
      this.loading = true;
      this.api.publicity.posterInsert(data).then((res) => {
        this.$refs["formName"].resetFields();
        this.getTableList();
        this.insertDialog = false;
      });
    },
    /* 打开修改窗口 */
    openUpdateDialog(row) {
      var _this = this;
      setTimeout(function () {
        _this.$refs.uploadImg.concert(row.img_url);
      }, 0);
      this.currenItem = {
        poster_id: row.poster_id,
        activity_id: row.activity_id,
        title: row.title,
        summary: row.summary,
        img_url: row.img_url,
        sort: row.sort,
        status: row.status,
      };
      this.dataFun();
      this.updateDialog = true;
    },
    /* 修改 */
    multiUpdate() {
      if ((this.currenItem.sort = "")) {
        this.currenItem.sort = 0;
      }
      this.currenItem.sort = Number(this.currenItem.sort);
      var data = this.currenItem;
      this.api.publicity.posterUpdate(data).then((res) => {
        this.$refs["updateArea"].resetFields();
        this.getTableList();
        this.updateDialog = false;
      });
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.poster_id);
        this.nameArr.push(item.title);
      });
    },
    /* 打开批量下架框 */
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要下架的海报数据",
          type: "warning",
        });
      }
    },
    /* 打开下架框 */
    openDelDialog(item) {
      this.deltitle = item.title;
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    /* 下架 */
    deleteItem(type) {
      var poster_id = [this.currenDeleteRow.poster_id];
      var id = type === "one" ? poster_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.publicity.posterDelete(data).then((res) => {
        this.$message({
          message: "下架成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 打开批量恢复框 */
    batchRestore() {
      if (this.multipleSelection.length > 0) {
        this.mutilRestore = true;
      } else {
        this.$message({
          message: "请先勾选要恢复的海报数据",
          type: "warning",
        });
      }
    },
    /* 打开恢复框 */
    openRestore(item) {
      this.deltitle = item.title;
      this.currenDeleteRow = item;
      this.RestoreDialog = true;
    },
    /* 恢复 */
    RestoreItem(type) {
      var poster_id = [this.currenDeleteRow.poster_id];
      var id = type === "one" ? poster_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.publicity.posterRecovery(data).then((res) => {
        this.$message({
          message: "恢复成功",
          type: "success",
        });
        this.getTableList();
        this.mutilRestore = false;
        this.RestoreDialog = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.lihaibimg {
  width: 100px;
}
.editBtn {
  margin: 20px 0 10px;
  float: left;
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
}
.sosuo {
  margin-left: 10px;
  float: left;
  background-color: #f4f4f4 !important;
  border: 1px solid #cecece;
  color: #0a0a0a;
  width: 90px;
}
.t-s01 {
  line-height: 34px;
  font-size: 15px;
}
.t-s02 {
  margin-left: 20px;
}
.ustrimg {
  width: 34px;
  height: 34px;
  border-radius: 100%;
}
.tadshiqu {
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
}
.lievyt {
  width: 160px;
  height: 200px;
  margin-right: 12px;
  margin-bottom: 12px;
}
.neibtiaoq {
  width: 100%;
  height: 160px;
  border: 1px solid rgb(170, 170, 170);
}
.chengimg {
  width: 100px;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  margin-top: -50px;
}
.tilmwz {
  font-size: 16px;
  color: #000;
  text-align: center;
  line-height: 40px;
}

.zjiang {
  font-size: 24px;
  line-height: 36px;
  color: darkgrey;
  padding-left: 4px;
  padding-right: 4px;
}
.xialdiv {
  padding-top: 30px;
  padding-bottom: 50px;
}
.gz-lieb {
  display: flex;
}
.shanxdiv {
  margin-bottom: 10px;
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
  .ewmsou {
    float: left;
    width: 300px;
    margin-right: 10px;
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
  .el-button--danger{ background-color: #2e2e2e !important;border-color: #2e2e2e !important;}
  .el-button--primary{ color: #000; background-color: #fff6df !important;border-color: #ffbe11 !important;}
}
</style>
