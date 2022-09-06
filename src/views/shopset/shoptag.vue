<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <div style="text-align: center; width: 140px">
        <i
          class="el-icon-plus"
          style="cursor: pointer; font-size: 14px"
          @click="butianjiaItemtk(0)"
          >新增分组</i
        >
      </div>
      <div style="flex: 1; margin-left: 20px">
        <div class="shanxdiv" v-show="multipleSelection == ''">
          <div style="flex: 1">
            <el-button class="b-btn" type="success" @click="openInsert(0)"
              >新增标签</el-button
            >
          </div>
          <!-- <el-button class="y-btn" type="warning" @click="authorization">角色权限</el-button> -->
          <div class="so-nav">
            <el-input
              class="so-ipt"
              placeholder="请输入关键字"
              clearable
              v-model="keyword"
              @change="seachFun"
            >
            </el-input>
            <el-button class="sosuo" type="success" @click="seachFun"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="shanxdiv" v-show="multipleSelection != ''">
          <el-button class="b-btn" type="danger" @click="batchDelete"
            >批量删除</el-button
          >
          <!-- <el-button class="b-btn" type="danger" @click="batchUpdata">批量修改</el-button> -->
          <el-button class="y-btn" type="warning" @click="toggleSelection()"
            >取消勾选</el-button
          >
        </div>
      </div>
    </div>
    <div class="glyshengp">
      <div class="youbliq">
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
          tab-position="left"
          class="tabPhane"
        >
          <el-tab-pane
            v-for="item in classData"
            :key="item.group_id"
            :name="String(item.group_id)"
          >
            <div class="tabsN" slot="label">
              <span> {{ item.name }}</span
              ><i
                v-show="activeName == String(item.group_id)"
                style="margin-left: 6px; color: #d7a138"
                class="el-icon-edit-outline"
                @click="butianjiaItemtk(JSON.parse(JSON.stringify(item)))"
              ></i>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="youbli">
        <div class="youblidiv">
          <el-table
            ref="multipNum"
            stripe
            :data="tableListData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="selectItem"
            @sort-change="screeningData"
            @filter-change="filterTagTable"
          >
            <el-table-column type="selection" />
            <el-table-column sortable="custom" prop="tag_id" label="全选/ID">
              <template slot-scope="scope">
                <span>{{ scope.row.tag_id }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="名称" />
            <el-table-column prop="icon" label="图标">
              <template slot-scope="scope">
                <el-image
                  v-if="scope.row.icon"
                  @click="showImglist(scope.row.icon)"
                  style="width: 20px; height: 20px"
                  :src="scope.row.icon"
                  fit="cover"
                ></el-image>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="group.name" label="分组"></el-table-column>
            <el-table-column prop="sort" label="排序" sortable="custom">
              <template slot-scope="{ row, $index }">
                <div
                  @click="
                    {
                      {
                        chengenum(row, $index);
                      }
                    }
                  "
                >
                  <el-input
                    ref="saveTagInput"
                    class="slot-ipt"
                    v-if="editable[$index]"
                    v-model.number="row.sort"
                    size="small"
                    autofocus
                    @blur="sortBlue($index, row.sort)"
                    @keyup.enter.native="$event.target.blur"
                  />
                  <span class="slotSpan" v-else>{{ row.sort }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              sortable="custom"
              prop="create_time"
              label="添加时间"
            />
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="openInsert(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="openDelDialog(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        layout="prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 新增标签 -->
    <el-dialog :title="tagname" :visible.sync="insertDialog" width="30%">
      <el-form
        :model="addItem"
        :rules="rules"
        ref="formName1"
        label-width="120px"
        class="updateArea"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addItem.name" clearable placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="分组" prop="group_id">
          <el-select v-model="addItem.group_id" placeholder="请选择">
            <el-option
              v-for="item in classData"
              :key="item.group_id"
              :label="item.name"
              :value="item.group_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <uploadFiles
            v-if="insertDialog"
            class="uploadTemp"
            ref="uploadImg2"
            @theIMG="parentFun"
            :imageUrl="fileListActive"
            :root="root"
          />
          <!-- <div style="color:#999; font-size:12px">（建议尺寸：400x400px，清晰图片）</div> -->
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addItem.sort" clearable placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addItem.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm2('formName1')">取 消</el-button>
        <el-button type="primary" @click="validation('formName1')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 新增/编辑标签分组 -->
    <el-dialog :title="tagGroupName" :visible.sync="bumintx" width="30%">
      <el-form
        :model="addbum"
        ref="formName3"
        label-width="120px"
        class="updateArea"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addbum.name" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <uploadFiles
            v-if="bumintx"
            class="uploadTemp"
            ref="uploadImg"
            @theIMG="parentFun"
            :imageUrl="fileListActive"
            :root="root"
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addbum.sort" />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="addbum.status" placeholder="请选择">
            <el-option label="停用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delGrouply = true">删 除</el-button>
        <el-button @click="bumintx = false">取 消</el-button>
        <el-button type="primary" @click="butianjia('formName3')"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除标签组 -->
    <el-dialog
      :title="'删除-' + delgrouptitle"
      :visible.sync="delGrouply"
      width="30%"
    >
      <span>确定要删除此项吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delGrouply = false">取 消</el-button>
        <el-button type="primary" @click="delGroupItem">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除单个内容 -->
    <el-dialog
      :title="'删除-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要删除此项吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除" :visible.sync="mutilDeleteDialog" width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="大图预览" :visible.sync="dialogVisible" width="50%">
      <template v-if="dialogVisible">
        <el-carousel
          :autoplay="false"
          indicator-position="none"
          arrow="always"
          height="600px"
        >
          <el-carousel-item>
            <div class="imgbox">
              <el-image
                style="height: 600px; width: auto"
                fit="contain"
                :src="picData"
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
  components: {
    uploadFiles,
  },
  name: "shoptag",
  data() {
    return {
      oldSort: "",
      dataItem: {},
      editable: [],
      dialogVisible: false,
      //是否删除 1是 0否
      bumintx: false,
      activeName: "",
      //员工状态
      admin_status: "",
      //部门ID
      group_id: "",
      //部门数据
      classData: [],
      //角色数据
      roleData: [],
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        group_id: [
          { required: true, message: "请选择标签组", trigger: "change" },
        ],
      },
      tableListData: [], //页面表单的内容
      //添加图库分类
      addbum: {
        name: "",
        icon: "",
        sort: 0,
        status: 1,
      },
      //修改图库分类
      currenbum: {
        group_id: "",
        name: "",
        sort: 0,
      },
      //添加的内容
      addItem: {
        name: "",
        group_id: "",
        icon: "",
        sort: "",
        status: 1,
      },
      //修改数据
      currenItem: {
        title: "",
        group_id: "",
        album_path: "",
      },
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      //角色数据
      juesData: "",
      //排序
      sort: "create_time",
      order: "desc",
      fileListActive: "",
      root: "shop/tag",
      keyword: "",
      tagGroupName: "新增标签分组",
      delGrouply: false,
      delgrouptitle: "",
      tagname: "新增标签",
    };
  },
  created() {
    this.getBumeng(1);
  },
  methods: {
    chengenum(row, index) {
      // this.isfocus = true
      this.dataItem = row;
      this.oldSort = row.sort;
      this.editable[index] = true;
      this.$set(this.editable, index, true);
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    // 失焦 完成
    sortBlue(row, val) {
      if (/^[0-9]*$/.test(val) === false) {
        this.$message.warning("请填写数字类型！");
        return false;
      }
      if (val == this.oldSort) {
        this.$set(this.editable, row, false);
        return false;
      } else {
        let data = {
          id: this.dataItem.tag_id,
          sort: val,
        };
        this.api.shop.tagSetSort(data).then((res) => {
          this.$message.success("修改成功！");
          this.getTableList();
          this.$set(this.editable, row, false);
        });
      }
    },
    //筛选
    filterTagTable(data) {
      if (data.admin_status != "") {
        this.admin_status = Number(data.admin_status[0]);
      } else {
        this.admin_status = "";
      }
      this.getTableList();
    },
    //TAB筛选
    screeningData(column) {
      if (column.order) {
        this.sort = column.prop;
        this.order = column.order == "ascending" ? "ASC" : "DESC";
      } else {
        this.sort = "";
        this.order = "";
      }
      this.getTableList();
    },
    //TAB
    handleClick() {
      this.curPage = 1;
      this.group_id = Number(this.activeName);
      this.addItem.group_id = Number(this.activeName);
      this.getTableList();
    },
    //获取标签分类数据
    getBumeng(key) {
      let data = {
        page: 1,
        page_size: 10000,
      };
      this.api.shop.shopTagGroupList(data).then((res) => {
        this.classData = res.data.data;
        this.activeName = String(res.data.data[0].group_id);
        this.group_id = res.data.data[0].group_id;
        this.addItem.group_id = res.data.data[0].group_id;
        if (key == 1) {
          this.getTableList();
        }
      });
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {
        keyword: this.keyword,
        group_id: this.group_id,
        sort: this.sort,
        order: this.order,
        page: this.curPage,
      };
      this.api.shop.shopTagList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    //统一验证方法
    validation(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.insertItem(); //新增或编辑标签
        } else {
          return false;
        }
      });
    },
    //打开添加图库分类弹框
    butianjiaItemtk(n) {
      if (n == 0) {
        this.addbum = {
          name: "",
          icon: "",
          sort: 0,
          status: 1,
        };
        this.tagGroupName = "新增标签分组";
      } else {
        this.tagGroupName = "编辑标签分组";
        this.addbum = n;
        this.delgrouptitle = this.addbum.name;
        this.group_id = this.addbum.group_id;
        setTimeout(() => {
          this.$refs.uploadImg.concert(this.addbum.icon);
        }, 0);
      }
      this.bumintx = true;
    },
    //新增/编辑标签分组
    butianjia(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = this.addbum;
          data.sort = Number(data.sort);
          if (this.tagGroupName == "新增标签分组") {
            //新增标签组
            this.api.shop.tagGroupInsert(data).then((res) => {
              this.$refs["formName3"].resetFields();
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.resetForm("formName3");
              this.getBumeng(0);
              this.bumintx = false;
            });
          } else {
            //编辑标签组
            this.api.shop.tagGroupUpdate(data).then((res) => {
              this.$refs["formName3"].resetFields();
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.resetForm("formName3");
              this.getBumeng(0);
              this.bumintx = false;
            });
          }
        } else {
          return false;
        }
      });
    },
    // 删除标签组
    delGroupItem() {
      if (this.tableListData.length != 0) {
        this.$message({
          message: "该分类下还有数据，请移除后再操作！",
          type: "warning",
        });
      } else {
        var data = {
          id: [this.group_id],
        };
        this.api.shop.tagGroupDelete(data).then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getBumeng(0);
          this.delGrouply = false;
          this.bumintx = false;
        });
      }
    },
    // 打开新增弹窗
    openInsert(n) {
      this.insertDialog = true;
      if (n == 0) {
        this.tagname = "新增标签";
      } else {
        this.addItem.name = n.name;
        this.addItem.group_id = n.group_id;
        this.addItem.icon = n.icon;
        this.addItem.sort = n.sort;
        this.addItem.status = n.status;
        this.addItem.tag_id = n.tag_id;
        this.tagname = "编辑标签";
        setTimeout(() => {
          this.$refs.uploadImg2.concert(this.addItem.icon);
        }, 0);
      }
    },
    /* 新增保存标签 */
    insertItem() {
      var data = this.addItem;
      data.sort = Number(data.sort);
      if (this.tagname == "新增标签") {
        this.api.shop.tagInsert(data).then((res) => {
          // this.$refs["formName1"].resetFields();
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getTableList();
          this.resetForm("formName1");
          // this.insertDialog = false;
        });
      } else {
        this.api.shop.tagUpdate(data).then((res) => {
          // this.$refs["formName1"].resetFields();
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getTableList();
          this.resetForm("formName1");
          // this.insertDialog = false;
        });
      }
    },
    /* 打开批量删除框 */
    batchDelete() {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning",
        });
      }
    },
    /* 打开删除框 */
    openDelDialog(data) {
      this.deltitle = data.name;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.tag_id);
        this.nameArr.push(item.name);
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      var id =
        type === "one" ? [this.currenDeleteRow.tag_id] : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.shop.tagDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipNum.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipNum.clearSelection();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.addItem = {
      //   name: "",
      //   group_id: "",
      //   icon: '',
      //   sort:'',
      //   status:1
      // }
      this.addItem.name = "";
      this.addItem.icon = "";
      this.addItem.sort = "";
      this.addItem.status = 1;
      this.addbum = {
        name: "",
        icon: "",
        sort: 0,
        status: 1,
      };
      this.insertDialog = false;
    },
    resetForm2() {
      this.addItem.name = "";
      this.addItem.icon = "";
      this.addItem.sort = "";
      this.addItem.status = 1;
      this.insertDialog = false;
    },
    parentFun(url, n) {
      this.addbum.icon = url;
      this.addItem.icon = url;
      this.fileListActive = url;
    },
    showImglist(row) {
      this.dialogVisible = true;
      this.picData = row;
    },
    seachFun() {
      this.curPage = 1;
      this.getTableList();
    },
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
  .tabsN {
    width: 90px !important;
    display: flex;
    align-items: center;
  }
  .tabsN {
    span {
      width: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
