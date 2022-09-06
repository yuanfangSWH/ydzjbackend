<!--
 * @Author: your name
 * @Date: 2021-03-11 16:49:20
 * @LastEditTime: 2021-04-28 16:54:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\community\news.vue
-->
<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
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
        <div class="shanxdiv">
          <div style="flex: 1">
            <el-button
              v-if="!recycle"
              class="b-btn"
              type="success"
              @click="batchDelete"
              >删除</el-button
            >
            <el-button
              v-if="!recycle"
              class="b-btn"
              type="success"
              @click="insertInformation"
              >添加资讯</el-button
            >
            <el-button
              v-if="!recycle"
              class="y-btn"
              type="warning"
              @click="toRecycle"
              >回收站</el-button
            >

            <el-button
              v-if="recycle"
              class="b-btn"
              type="success"
              @click="batchDelete"
              >彻底删除</el-button
            >
            <el-button
              v-if="recycle"
              class="b-btn"
              type="success"
              @click="recoveryNews"
              >批量还原</el-button
            >
            <el-button
              v-if="recycle"
              class="y-btn"
              type="warning"
              @click="goBackFun"
              >返回</el-button
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
            <el-button class="sosuo" type="success" @click="seachFun"
              >搜索</el-button
            >
          </div>
        </div>
        <!-- <div class="shanxdiv" v-show="multipleSelection != ''">
          <el-button class="b-btn" type="danger" @click="batchDelete">批量删除</el-button>
          <el-button class="y-btn" type="warning" @click="toggleSelection()">取消勾选</el-button>
        </div> -->
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
          <el-tab-pane :name="'all'">
            <span slot="label">查看全部</span>
          </el-tab-pane>
          <el-tab-pane
            v-for="item in classData"
            :key="item.mid"
            :name="String(item.mid)"
          >
            <div class="tabsN" slot="label">
              <span :style="item.status == 0 ? 'color:#DCDFE6' : ''">
                {{ item.name }}</span
              ><i
                v-show="activeName == String(item.mid)"
                style="margin-left: 6px; color: #d7a138"
                class="el-icon-edit-outline"
                @click="bumUpdateDialog(JSON.parse(JSON.stringify(item)))"
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
            <el-table-column
              sortable="custom"
              prop="news_id"
              label="全选/ID"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.news_id }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="图片" width="350">
              <template slot-scope="scope">
                <div v-if="scope.row.images">
                  <el-image
                    v-for="(img, imgIndex) in scope.row.images"
                    :key="'img_' + imgIndex"
                    @click="showImglist(scope.row.images, imgIndex)"
                    style="width: 100px; height: 100px; margin-right: 5px"
                    :src="img"
                    fit="contain"
                  ></el-image>
                </div>
                <div v-else style="color: #e6a23c">没有图片</div>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="300">
              <template slot-scope="scope">
                <div>
                  <div class="muzhicss">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="scope.row.title"
                      placement="bottom"
                      :disabled="getShow(scope.row.title)"
                    >
                      <div>{{ getAgent(scope.row.title) }}</div>
                    </el-tooltip>
                    <div
                      style="color: #409eff"
                      v-if="
                        scope.row.province || scope.row.city || scope.row.area
                      "
                    >
                      {{ scope.row.province }}{{ scope.row.city
                      }}{{ scope.row.area }}
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="文章分类">
              <template slot-scope="scope">
                <span
                  style="margin-right: 10px"
                  v-for="(catItem, catIndex) in scope.row.category"
                  :key="'cat_' + catIndex"
                  >{{ catItem.name }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="list_shape" label="文章类型">
              <template slot-scope="scope">
                <span>{{ getListShape(scope.row.list_shape) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="stick" label="是否置顶">
              <template slot-scope="scope">
                <span>{{ scope.row.stick == 0 ? "否" : "是" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span>{{
                  scope.row.status == 0
                    ? "预留"
                    : scope.row.status == 1
                    ? "正常"
                    : "隐藏"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="allow_comment" label="允许评论">
              <template slot-scope="scope">
                <span>{{ scope.row.allow_comment == 0 ? "否" : "是" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="view_count" label="浏览量" />
            <el-table-column prop="comment_count" label="评论量">
              <template slot-scope="scope">
                <div @click="toCommentList(scope.row)" style="cursor: pointer">
                  {{ scope.row.comment_count }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              sortable="custom"
              prop="create_time"
              label="发布时间"
            />
            <el-table-column prop="is_push" label="是否推送">
              <template slot-scope="scope">
                <i v-if="scope.row.is_push == 1" class="el-icon-check"></i>
              </template>
            </el-table-column>
            <el-table-column
              sortable="custom"
              prop="push_time"
              label="推送时间"
            />
            <el-table-column
              align="center"
              label="操作"
              fixed="right"
              width="150"
            >
              <template slot-scope="scope">
                <!-- <el-button v-if="!recycle" size="mini" type="text">推送</el-button> -->
                <el-button
                  size="mini"
                  type="text"
                  @click="handlePushArticle(scope.row)"
                  >推送</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="
                    openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))
                  "
                  >编辑</el-button
                >
                <el-button
                  v-if="recycle"
                  size="mini"
                  type="text"
                  @click="openRecoveryDialog(scope.row)"
                  >还原</el-button
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
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="page_size"
        @size-change="handlePageSizeChange"
        background
        layout="sizes,prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 新增图库分类 -->
    <el-dialog title="新增分类" :visible.sync="bumintx" width="30%">
      <el-form
        :model="addbum"
        ref="formName3"
        label-width="120px"
        class="updateArea"
      >
        <el-form-item label="图库分类名称" prop="name">
          <el-input v-model="addbum.name" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addbum.sort" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="addbum.status"
            active-text="启用"
            :active-value="1"
            inactive-text="禁用"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bumintx = false">取 消</el-button>
        <el-button type="primary" @click="butianjia">确定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑图库分类 -->
    <el-dialog title="编辑分类" :visible.sync="xgbumintx" width="30%">
      <el-form :model="currenbum" label-width="120px" class="updateArea">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="currenbum.name" clearable />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="currenbum.sort" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="currenbum.status"
            active-text="启用"
            :active-value="1"
            inactive-text="禁用"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
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
    <!-- 还原单个内容 -->
    <el-dialog
      :title="'还原-' + deltitle"
      :visible.sync="recoveryOne"
      width="30%"
    >
      <span>确定要还原此项吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recoveryOne = false">取 消</el-button>
        <el-button type="primary" @click="recoveryItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量还原 -->
    <el-dialog title="还原" :visible.sync="recoveryMore" width="50%">
      <span class="s-title">确定要还原以下内容吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recoveryMore = false">取 消</el-button>
        <el-button type="primary" @click="recoveryItem('mutil')"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="大图预览" :visible.sync="dialogVisible" width="50%">
      <template v-if="dialogVisible">
        <el-carousel
          :autoplay="false"
          indicator-position="none"
          arrow="always"
          height="600px"
          :initial-index="imgIndex"
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

    <el-dialog
      title="发起推送"
      :visible.sync="pushDialog"
      width="50%"
      @opened="pushReady"
    >
      <el-tabs v-model="pushTabActive" @tab-click="handlePushClick">
        <el-tab-pane label="系统推送" name="system">
          <push-system
            ref="push_system"
            :pushclass="'news'"
            @cancel="pushCancel"
          ></push-system>
        </el-tab-pane>
        <el-tab-pane label="定向推送" name="target">
          <push-target
            ref="push_target"
            :pushclass="'news'"
            @cancel="pushCancel"
          ></push-target>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
    <el-backtop
      target=".main-container"
      :bottom="showBack ? 105 : 40"
    ></el-backtop>
  </div>
</template>

<script>
import _ from "lodash";
import uploadFiles from "@/components/uploadFiles";
import systemPushForm from "@/views/community/components/systemPushForm";
import targetPushForm from "@/views/community/components/targetPushForm";
export default {
  components: {
    uploadFiles,
    "push-system": systemPushForm,
    "push-target": targetPushForm,
  },
  name: "news",
  data() {
    return {
      pushDialog: false,
      pushTabActive: "system",
      dialogVisible: false,
      //是否删除 1是 0否
      xgbumintx: false,
      bumintx: false,
      activeName: "all",
      //员工状态
      admin_status: "",
      //部门ID
      class_id: "",
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
      tableListData: [], //页面表单的内容
      //添加图库分类
      addbum: {
        name: "",
        sort: 0,
        status: 1,
      },
      //修改图库分类
      currenbum: {
        mid: "",
        name: "",
        sort: "",
        type: "",
        status: 0,
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
      articleData: {}, //暂存文章数据
      //角色数据
      juesData: "",
      //排序
      sort: "create_time",
      order: "DESC",
      fileListActive: "",
      root: "goods_media",
      keyword: "",
      status: 1,
      recycle: false,
      recoveryOne: false,
      recoveryMore: false,
      picData: [],
      imgIndex: 0,
      news_id: null,
      showBack: false,
      listShape: {
        shope_1: "单图",
        shope_2: "三图",
        shope_3: "视频",
      },
      page_size: 10,
    };
  },
  created() {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    if (this.$route.query.news_id) {
      this.status = null;
      this.news_id = this.$route.query.news_id;
    }
    this.iniPageParam();
  },
  watch: {
    $route(to, from) {
      this.iniPageParam();
      //this.getTableList();
    },
  },
  destroyed() {
    // sessionStorage.removeItem("news_curPage");
    // sessionStorage.removeItem("news_keyword");
  },
  methods: {
    iniPageParam() {
      this.keyword = this.$route.query.keyword
        ? decodeURIComponent(this.$route.query.keyword)
        : "";
      this.curPage = this.$route.query.curPage
        ? Number(this.$route.query.curPage)
        : 1;
      this.getBumeng(1);
    },
    handlePageSizeChange(v) {
      this.getTableList();
    },
    //获得文章分类
    getListShape(v) {
      return this.listShape["shope_" + v];
    },
    //添加资讯
    insertInformation() {
      this.$router.push({
        path: "/news/addInformation",
        query: { id: 0, class: this.class_id ? this.class_id : "" },
      });
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
      this.class_id = this.activeName == "all" ? null : Number(this.activeName);
      this.addItem.class_id =
        this.activeName == "all" ? null : Number(this.activeName);
      this.curPage = 1;
      this.getTableList();
    },
    //获取图库分类数据
    getBumeng(key) {
      let data = {
        page: 1,
        page_size: 10000,
      };
      this.api.community.newsListClass().then((res) => {
        this.classData = res.data.data;
        this.activeName = this.class_id ? String(this.class_id) : "all"; //String(res.data.data[0].mid_id);
        this.class_id = this.class_id ? this.class_id : res.data.data[0].mid_id;
        this.addItem.class_id = this.class_id
          ? this.class_id
          : res.data.data[0].mid_id;
        this.classData = _.orderBy(
          this.classData,
          ["status", "mid_id"],
          ["desc", "asc"]
        );
        if (key == 1) {
          this.getTableList();
        }
      });
    },
    /* 获取列表内容 */
    getTableList() {
      sessionStorage.setItem("news_curPage", this.curPage);
      sessionStorage.setItem("news_keyword", this.keyword);
      var data = {
        keyword: this.keyword,
        class_id: this.class_id,
        sort: this.sort,
        order: this.order,
        status: this.status,
        news_id: this.news_id,
        page: this.curPage,
        mid: this.class_id,
        page_size: this.page_size,
      };
      this.api.community.newsList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    //统一验证方法
    validation(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "formName1") {
            this.insertItem(); //新增
          } else {
            this.multiUpdate(); //编辑
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
        this.api.community.newsInsertClass(data).then((res) => {
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
          mid: this.currenbum.mid,
          sort: this.currenbum.sort,
          name: this.currenbum.name,
          status: this.currenbum.status,
        };
        this.api.community.newsUpdateClass(data).then((res) => {
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
    //删除分类
    delClass() {
      if (this.tableListData.length != 0) {
        this.$message({
          message: "该分类下还有内容，请移除后再操作！",
          type: "warning",
        });
      } else {
        var data = {
          id: this.currenbum.mid,
        };
        this.api.community.newsDeleteClass(data).then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getBumeng();
          this.xgbumintx = false;
        });
      }
    },
    //打开添加图片弹框
    insertItemtk() {
      this.insertDialog = true;
    },
    /* 新增保存 */
    insertItem() {
      console.log("新增图片", this.addItem);
      var data = this.addItem;
      this.api.mediagoods.pictureInsert(data).then((res) => {
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
      // this.updateDialog = true;
      // this.updateDialogTitle = row.title;
      // this.currenItem = row;
      // this.currenItem.album_path = this.currenItem.filepath;
      // if(this.currenItem.filepath){
      //   setTimeout(()=> {
      //     this.$refs.uploadImg1.concert(this.currenItem.filepath);
      //   },0)
      // }
      this.$router.push({
        path: "/news/editorInformation",
        query: { news_id: row.news_id },
      });
    },
    /* 修改保存 */
    multiUpdate() {
      var data = {};
      data = {
        news_id: this.currenItem.news_id,
        title: this.currenItem.title,
        class_id: this.currenItem.class_id,
        album_path: this.currenItem.album_path,
      };
      this.api.mediagoods.pictureUpdate(data).then((res) => {
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
        this.multipleSelection.push(item.news_id);
        this.nameArr.push(item.title);
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      var id =
        type === "one"
          ? [this.currenDeleteRow.news_id]
          : this.multipleSelection;
      var data = {
        id: id,
      };
      if (this.recycle) {
        //真删
        this.api.community.newsRealDelete(data).then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getTableList();
          this.mutilDeleteDialog = false;
          this.deleteDialog = false;
        });
      } else {
        //放入回收站
        this.api.community.newsDelete(data).then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getTableList();
          this.mutilDeleteDialog = false;
          this.deleteDialog = false;
        });
      }
    },
    /* 打开还原框 */
    openRecoveryDialog(data) {
      this.deltitle = data.title;
      this.currenDeleteRow = data;
      this.recoveryOne = true;
    },
    /* 打开批量还原框 */
    recoveryNews() {
      if (this.multipleSelection != "") {
        this.recoveryMore = true;
      } else {
        this.$message({
          message: "请先勾选要还原的数据",
          type: "warning",
        });
      }
    },
    /* 还原选项 */
    recoveryItem(type) {
      var id =
        type === "one"
          ? [this.currenDeleteRow.news_id]
          : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.community.newsRecovery(data).then((res) => {
        this.$message({
          message: "还原成功",
          type: "success",
        });
        this.getTableList();
        this.recoveryOne = false;
        this.recoveryMore = false;
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      let datas = {
        curPage: this.curPage,
        keyword: this.keyword,
      };
      this.$router.push({ path: "/news/content", query: datas });
      //this.getTableList();
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
    parentFun(url, n) {
      this.addItem.album_path = url;
      this.currenItem.album_path = url;
      this.fileListActive = url;
    },
    showImglist(row, index) {
      this.dialogVisible = true;
      this.picData = row;
      this.imgIndex = index;
    },
    seachFun() {
      this.curPage = 1;
      //this.getTableList();
      this.pageChange(this.curPage);
    },
    Therecyclebin() {},
    toRecycle() {
      this.recycle = true;
      this.status = 0;
      this.getTableList();
    },
    goBackFun() {
      this.recycle = false;
      this.status = 1;
      this.getTableList();
    },
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow(v) {
      return v.length > 20 ? false : true;
    },
    toCommentList(row) {
      this.$router.push("/news/comment?news_id=" + row.news_id + "&from=true");
      // sessionStorage.removeItem("pages");
    },
    //发起推送
    handlePushArticle(row) {
      this.articleData = row;
      // this.detailsData.title = row.title;
      // this.detailsData.content = row.summary;
      // this.detailsData.image = row.images.length > 0 ? row.images[0] : "";
      // this.detailsData.url = "ydzj://news/detail?id=" + row.news_id;
      // this.detailsData.article_id = Number(row.news_id);
      this.pushDialog = true;
    },
    pushCancel() {
      this.pushDialog = false;
    },
    pushReady() {
      this.handlePushClick({ name: this.pushTabActive });
    },
    handlePushClick(v) {
      console.info(v.name);
      this.$refs["push_" + v.name].setData(this.articleData);
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
// .youblidiv {
//   width: 98%;
// }
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
@media screen and (min-width: 1900px) {
  .youblidiv {
    width: 98%;
  }
}
// @media screen and (min-width: 1201px) {
// .youblidiv {width: 88%;}
// }
/* 设置了浏览器宽度不小于1201px时 youblidiv 宽度 */

@media screen and (max-width: 1920px) {
  .youblidiv {
    width: 80%;
  }
}
/* 设置了浏览器宽度不大于1920px时 youblidiv 显示900px宽度 */

@media screen and (max-width: 1280px) {
  .youblidiv {
    width: 70%;
  }
}
/* 设置了浏览器宽度不大于1280px时 youblidiv 显示200px宽度 */

@media screen and (max-width: 1024px) {
  .youblidiv {
    width: 60%;
  }
}
/* 设置了浏览器宽度不大于1024px时 youblidiv 显示100px宽度 */
</style>
