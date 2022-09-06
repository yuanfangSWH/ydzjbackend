<!--
 * @Author: your name
 * @Date: 2021-03-15 14:49:56
 * @LastEditTime: 2021-03-19 09:45:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\community\components\mediaStorePic.vue
-->
<template>
  <div class="shopSet">
    <div class="shanxdiv">
      <div style="text-align: center; width: 140px">
        <i
          class="el-icon-plus"
          style="cursor: pointer; font-size: 14px"
          @click="butianjiaItemtk"
          >新建分类</i
        >
      </div>
      <div style="flex: 1; margin-left: 20px">
        <div class="shanxdiv" v-show="multipleSelection == ''">
          <div style="flex: 1">
            <el-button class="b-btn" type="success" @click="insertItemtk"
              >新增{{ panelInfo["name_" + type] }}</el-button
            >
            <!-- <el-button class="y-btn" type="info" @click="Therecyclebin">回收站</el-button> -->
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
            <el-button class="sosuo" type="" @click="seachFun">搜索</el-button>
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
        >
          <el-tab-pane
            v-for="item in classDatas"
            :key="item.class_id"
            :name="String(item.class_id)"
          >
            <span slot="label"
              >{{ item.name
              }}<i
                v-show="activeName == String(item.class_id)"
                style="margin-left: 6px; color: #d7a138"
                class="el-icon-edit-outline"
                @click="bumUpdateDialog(JSON.parse(JSON.stringify(item)))"
              ></i
            ></span>
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
            <el-table-column sortable="custom" prop="media_id" label="全选/ID">
              <template slot-scope="scope">
                <span>{{ scope.row.media_id }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="title"
              :label="panelInfo['name_' + type] + '名称'"
            />
            <el-table-column prop="" :label="panelInfo['name_' + type]">
              <template slot-scope="scope">
                <el-image
                  v-if="type == 1"
                  @click="showImglist(scope.row.filepath)"
                  style="width: 100px; height: 100px"
                  :src="scope.row.filepath"
                  fit="contain"
                ></el-image>
                <div v-if="type == 2" class="img-div">
                  <div v-if="scope.row.video_url != ''">
                    <img
                      style="object-fit: contain"
                      class="d-img"
                      :src="scope.row.filepath"
                      alt=""
                      @mouseover="showPlayBtnId = scope.row.media_id"
                      @mouseleave="showPlayBtnId = ''"
                    />
                    <div
                      @click="playVideo(scope.row)"
                      class="del-icon2"
                      v-show="showPlayBtnId == scope.row.media_id"
                      @mouseover="showPlayBtnId = scope.row.media_id"
                      @mouseleave="showPlayBtnId = ''"
                    >
                      <i class="el-icon-caret-right"></i>
                    </div>
                  </div>
                  <el-alert
                    v-else
                    title="解码中"
                    type="warning"
                    :closable="false"
                  >
                  </el-alert>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              :label="panelInfo['name_' + type] + '信息'"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.filename">{{ scope.row.filename }}</div>
                <div v-if="scope.row.mime_type">{{ scope.row.mime_type }}</div>
                <div v-if="scope.row.width && scope.row.height">
                  {{ scope.row.width }}*{{ scope.row.height }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="class_name" label="分类"></el-table-column>
            <el-table-column
              sortable="custom"
              prop="create_time"
              label="创建时间"
            />
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="
                    openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))
                  "
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
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 新增图片 -->
    <el-dialog
      :title="'新增' + panelInfo['name_' + type]"
      :visible.sync="insertDialog"
      width="30%"
    >
      <el-form
        :model="addItem"
        :rules="rules"
        ref="formName1"
        label-width="120px"
        class="updateArea"
      >
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="addItem.title"
            clearable
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item label="分类" prop="class_id">
          <el-select v-model="addItem.class_id" placeholder="请选择">
            <el-option
              v-for="item in classData"
              :key="item.class_id"
              :label="item.name"
              :value="item.class_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="panelInfo['name_' + type]" prop="album_path">
          <div v-if="type == 1">
            <uploadFiles
              class="uploadTemp"
              @theIMG="parentFun"
              :imageUrl="fileListActive"
              :root="root"
            />
            <div style="color: #999; font-size: 12px">
              （建议尺寸：400x400px，清晰图片）
            </div>
          </div>
          <div v-if="type == 2">
            <uploadVideo
              v-if="video_id == ''"
              :limit="1"
              @childrenFun="parentFunVideo"
              :root="root"
            />
            <el-alert
              v-if="video_id != ''"
              title="视频已经上传，请继续操作。"
              type="success"
              :closable="false"
            >
            </el-alert>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('formName1')">取 消</el-button>
        <el-button type="primary" @click="validation('formName1')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改图片 -->
    <el-dialog
      :title="'修改-' + updateDialogTitle"
      :visible.sync="updateDialog"
      width="30%"
    >
      <el-form
        :model="currenItem"
        ref="formName2"
        :rules="rules"
        label-width="120px"
        class="updateArea"
      >
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="currenItem.title"
            clearable
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item label="分类" prop="class_id">
          <el-select v-model="currenItem.class_id" placeholder="请选择">
            <el-option
              v-for="item in classData"
              :key="item.class_id"
              :label="item.name"
              :value="item.class_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="type == 1" label="图片" prop="album_path">
          <el-image
            style="width: 150px; height: 150px"
            fit="contain"
            :src="currenItem.album_path"
          ></el-image>
        </el-form-item>
        <el-form-item v-if="type == 2" label="视频" prop="album_path">
          <el-button
            class="b-btn"
            type="success"
            @click="dialogVisibleVideo = true"
            >播放视频</el-button
          >
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation('formName2')"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增图库分类 -->
    <el-dialog title="新增图库分类" :visible.sync="bumintx" width="30%">
      <el-form
        :model="addbum"
        ref="formName3"
        label-width="120px"
        class="updateArea"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addbum.name" />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="addbum.dept_status" placeholder="请选择">
            <el-option label="停用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bumintx = false">取 消</el-button>
        <el-button type="primary" @click="butianjia">确定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑图库分类 -->
    <el-dialog title="编辑图库分类" :visible.sync="xgbumintx" width="30%">
      <el-form :model="currenbum" label-width="120px" class="updateArea">
        <el-form-item label="图库分类名称" prop="name">
          <el-input v-model="currenbum.name" clearable />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="currenbum.sort" clearable />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="currenbum.dept_status" placeholder="请选择">
            <el-option label="停用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="delClass">删 除</el-button>
        <el-button type="primary" @click="bumUpdate">保存</el-button>
        <el-button @click="xgbumintx = false">取 消</el-button>
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

    <el-dialog title="视频详情" :visible.sync="dialogVisibleVideo">
      <el-card :body-style="{ padding: '0px' }">
        <div style="text-align: center">
          <video
            v-if="dialogVisibleVideo"
            autoplay
            height="480"
            :src="currenVideo.video_url"
            :poster="currenVideo.filepath"
            controls
          ></video>
        </div>
      </el-card>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack></goBack>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
import uploadVideo from "@/components/uploadFiles/mediaVideoUpload";
export default {
  components: {
    uploadFiles,
    uploadVideo,
  },
  props: {
    type: { type: Number, default: 1 },
    root: { type: String, default: "news" },
  },
  name: "mediaStorePanel",
  data() {
    return {
      currenVideo: {},
      showPlayBtnId: "",
      panelInfo: {
        name_1: "图片",
        name_2: "视频",
      },
      dialogVisible: false,
      //是否删除 1是 0否
      xgbumintx: false,
      bumintx: false,
      activeName: "",
      //员工状态
      admin_status: "",
      //部门ID
      class_id: "",
      //分类数据
      classData: [],
      classDatas: [], //有全部选项的分类数据
      //角色数据
      roleData: [],
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      rules: {
        title: [{ required: true, message: "请输入图片名称", trigger: "blur" }],
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        album_path: [
          {
            required: this.type == 1,
            message: "请设置媒体文件",
            trigger: "blur",
          },
        ],
        class_id: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
      },
      tableListData: [], //页面表单的内容
      //添加图库分类
      addbum: {
        name: "",
      },
      //修改图库分类
      currenbum: {
        class_id: "",
        name: "",
        sort: "",
      },
      //添加的内容
      addItem: {
        title: "",
        class_id: "",
        album_path: "",
      },
      //修改数据
      currenItem: {
        title: "",
        class_id: "",
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
      sort: "",
      order: "",
      fileListActive: "",
      keyword: "",
      video_id: "",
      dialogVisibleVideo: false,
    };
  },
  created() {
    this.getBumeng(1);
  },
  methods: {
    playVideo(item) {
      this.currenVideo = item;
      this.dialogVisibleVideo = true;
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
      this.class_id = Number(this.activeName);
      this.addItem.class_id = Number(this.activeName);
      this.getTableList();
    },
    //获取图库分类数据
    getBumeng(key) {
      let data = {
        page: 1,
        page_size: 10000,
      };
      this.api.zhixun.Listclass().then((res) => {
        this.classData = res.data.data;
        this.classDatas = [{ class_id: 0, name: "全部" }, ...res.data.data];
        this.activeName = String(this.classDatas[0].class_id);
        this.class_id = this.classDatas[0].class_id;
        // this.addItem.class_id = res.data.data[0].class_id;
        if (key == 1) {
          this.getTableList();
        }
      });
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {
        //关键字
        keyword: this.keyword,
        //分类ID
        class_id: this.class_id,
        //1图片 2视频
        type: this.type,
        //分页
        page: this.curPage,
      };
      this.api.zhixun.Listmedia(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    //统一验证方法
    validation(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "formName1") {
            this.insertItem(); //新增图片
          } else {
            this.multiUpdate(); //编辑图片
          }
        } else {
          return false;
        }
      });
    },
    //打开添加图库分类弹框
    butianjiaItemtk() {
      this.bumintx = true;
    },
    //新增图库分类
    butianjia() {
      if (this.addbum.name != "") {
        var data = this.addbum;
        this.api.zhixun.newsMediaInsertClass(data).then((res) => {
          this.$refs["formName3"].resetFields();
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getBumeng(0);
          this.bumintx = false;
        });
      } else {
        this.$message({
          message: "请填写分类名称",
          type: "warning",
        });
      }
    },
    //打开修改图库分类弹框
    bumUpdateDialog(row) {
      this.currenbum = row;
      this.xgbumintx = true;
    },
    //图库分类修改保存
    bumUpdate() {
      if (this.currenbum.name != "") {
        var data = {};
        data = {
          class_id: this.currenbum.class_id,
          sort: this.currenbum.sort,
          name: this.currenbum.name,
        };
        this.api.zhixun.newsMediaUpdateClass(data).then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getBumeng();
          this.xgbumintx = false;
        });
      } else {
        this.$message({
          message: "请填写分类名称",
          type: "warning",
        });
      }
    },
    //删除图库分类
    delClass() {
      if (this.tableListData.length != 0) {
        this.$message({
          message: "该分类下还有图片，请移除后再操作！",
          type: "warning",
        });
      } else {
        this.$confirm("确定删除分类吗？", "提示")
          .then(() => {
            var data = {
              id: [this.currenbum.class_id],
            };
            this.api.zhixun.newsMediaDeleteClass(data).then((res) => {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getBumeng();
              this.xgbumintx = false;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //打开添加图片弹框
    insertItemtk() {
      this.addItem = {
        title: "",
        class_id: "",
        album_path: "",
      };
      this.video_id = "";
      this.insertDialog = true;
    },
    /* 新增保存 */
    insertItem() {
      console.log("新增" + this.panelInfo["name_" + this.type], this.addItem);
      var data = this.addItem;
      if (this.type == 2) {
        if (this.video_id == "") {
          this.$message({
            message: "请上传视频",
            type: "error",
          });
          return false;
        } else {
          data.video_id = this.video_id;
        }
      }
      this.api.zhixun.newsMediaInsert(data).then((res) => {
        this.$refs["formName1"].resetFields();
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.getTableList();
        this.resetForm("formName1");
        // this.insertDialog = false;
      });
    },
    /* 打开修改窗口 */
    openUpdateDialog(row) {
      this.updateDialog = true;
      this.updateDialogTitle = row.title;
      this.currenItem = row;
      if (this.type == 2) {
        this.currenVideo = row;
      }
      this.currenItem.album_path = this.currenItem.filepath;
      // if(this.currenItem.filepath){
      //   setTimeout(()=> {
      //     this.$refs.uploadImg1.concert(this.currenItem.filepath);
      //   },0)
      // }
    },
    /* 修改保存 */
    multiUpdate() {
      var data = {};
      data = {
        media_id: this.currenItem.media_id,
        title: this.currenItem.title,
        class_id: this.currenItem.class_id,
        album_path: this.currenItem.album_path,
      };
      this.api.zhixun.newsMediaUpdate(data).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTableList();
        this.updateDialog = false;
      });
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
      this.deltitle = data.title;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.media_id);
        this.nameArr.push(item.title);
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      var id =
        type === "one"
          ? [this.currenDeleteRow.media_id]
          : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.zhixun.newsMediaDelete(data).then((res) => {
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
      this.insertDialog = false;
    },
    parentFun(url, defaltIcon, localPath, imageUrl, imageInfo) {
      this.addItem.album_path = url;
      this.addItem.size = imageInfo.size;
      this.addItem.width = imageInfo.width;
      this.addItem.height = imageInfo.height;
      this.currenItem.album_path = url;
      this.fileListActive = url;
    },
    parentFunVideo(obj) {
      this.video_id = obj.videoId;
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

.img-div {
  width: 102px;
  display: inline-block;
  margin: 0 6px 4px 0;
  position: relative;
  z-index: 0;
  .d-img {
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px solid #eeeeee;
    border-radius: 6px;
  }
  .v-img {
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px solid #eeeeee;
    border-radius: 6px;
  }
  .del-icon {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    line-height: 24px;
    text-align: center;
    background: #000;
    opacity: 0.4;
  }
  .del-icon2 {
    background-color: #dcdfe6;
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    line-height: 24px;
    text-align: center;
    .delete-i {
      font-size: 12px !important;
      color: #ffffff;
      position: relative;
      top: -2px;
      line-height: 24px !important;
    }
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
