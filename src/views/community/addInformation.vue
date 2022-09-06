<template>
  <div class="shopSet">
    <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="mid">
            <el-checkbox-group v-model="ruleForm.mid">
              <el-checkbox
                v-for="item in checkListData"
                :key="item.mid"
                :label="item.mid"
                v-if="item.status > 0"
                ><span :style="item.status == 0 ? 'color:#DCDFE6' : ''">{{
                  item.name
                }}</span></el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="文章要概" prop="summary">
            <el-input
              type="textarea"
              :rows="4"
              v-model="ruleForm.summary"
            ></el-input>
          </el-form-item>
          <el-form-item label="省市区" prop="area_id">
            <citySelectex
              @setCityAreaName="setCityAreaName"
              :isAll="true"
              :filterable="false"
              :showAll="false"
            />
          </el-form-item>
          <el-form-item label="文章类型" prop="name">
            <el-radio-group v-model="ruleForm.list_shape" @change="lengbh">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="2">三图</el-radio>
              <el-radio :label="3">视频</el-radio>
            </el-radio-group></el-form-item
          >
          <el-form-item label="上传视频" v-if="ruleForm.list_shape == 3">
            <div style="display: flex">
              <div
                class="zgsimg"
                style="height: 220px; width: 300px"
                v-if="videoIMG"
              >
                <i class="el-icon-error" @click="sctpVideo(0)"></i>
                <video
                  :src="videoIMG ? videoIMG : ''"
                  width="300"
                  height="200"
                  controls="controls"
                ></video>
              </div>
              <div class="tiebtp" @click="wyaoxuantp2" v-if="videoIMG == ''">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </el-form-item>
          <el-form-item
            :label="ruleForm.list_shape == 3 ? '视频封面' : '封面图'"
            prop="covers"
          >
            <div style="display: flex" v-if="ruleForm.list_shape == 1">
              <div class="zgsimg" v-if="fileImg">
                <i class="el-icon-error" @click="sctp(0)"></i>
                <el-image
                  style="width: 150px; height: 150px"
                  :src="fileImg ? fileImg : ''"
                  fit="contain"
                ></el-image>
              </div>
              <div
                class="tiebtp"
                @click="wyaoxuantp"
                v-if="ruleForm.covers.length < 1"
              >
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div style="display: flex" v-if="ruleForm.list_shape == 2">
              <div
                class="zgsimg"
                v-for="(item, index) in coversIMG"
                :key="index"
              >
                <i class="el-icon-error" @click="sctp(index)"></i>
                <el-image
                  style="width: 150px; height: 150px"
                  :src="item"
                  fit="contain"
                ></el-image>
              </div>
              <div
                class="tiebtp"
                @click="wyaoxuantp"
                v-if="ruleForm.covers.length < 3"
              >
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div style="display: flex" v-if="ruleForm.list_shape == 3">
              <div class="zgsimg" v-if="fileImg">
                <i class="el-icon-error" @click="sctp(0)"></i>
                <el-image
                  style="width: 150px; height: 150px"
                  :src="fileImg ? fileImg : ''"
                  fit="contain"
                ></el-image>
              </div>
              <div
                class="tiebtp"
                @click="wyaoxuantp"
                v-if="ruleForm.covers.length < 1"
              >
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="关联商家" prop="shop_id">
            <el-select
              class="sjiasrxz"
              v-model="ruleForm.shop_id"
              multiple
              :multiple-limit="10"
              filterable
              remote
              reserve-keyword
              placeholder="请搜索商家名称"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.shop_id"
                :label="
                  item.name +
                  ' [ ' +
                  item.type_name +
                  ' ] ' +
                  item.province +
                  ' ' +
                  item.city +
                  ' ' +
                  item.area
                "
                :value="item.shop_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="定时发布" prop="push_time">
            <el-date-picker
              class="dsfbt"
              v-model="ruleForm.push_time"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="允许评论">
            <el-radio-group v-model="ruleForm.allow_comment">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="置顶状态">
            <el-radio-group v-model="ruleForm.stick">
              <el-radio :label="1">置顶</el-radio>
              <el-radio :label="0">不置顶</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="1">正常</el-radio>
              <!-- <el-radio :label="2">隐藏</el-radio> -->
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="原创">
            <el-radio-group v-model="ruleForm.is_original">
              <el-radio :label="1">是</el-radio>
              <!-- <el-radio :label="2">隐藏</el-radio> -->
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="图文详情" name="second">
        <my-editor
          @change="getEditorData"
          :inicontent="ruleForm.content"
          :height="editorHeight"
          root="news"
          ref="my-editor"
          :preview="true"
        ></my-editor>
      </el-tab-pane>
      <div class="btnBox">
        <el-button
          type="warning"
          @click="tijiao"
          style="margin-right: 50px; margin-left: 50px"
          >提交</el-button
        >
        <el-button
          type="info"
          @click="
            () => {
              this.$router.go(-1);
            }
          "
          >返回</el-button
        >
      </div>
    </el-tabs>
    <!-- 图库弹层 -->
    <el-dialog
      :title="'选择' + (ruleForm.list_shape == 3 ? '视频封面' : '图片')"
      :visible.sync="imgTK"
      width="30%"
    >
      <!-- 本地上传或从图片库选择图片（组件） -->
      <picture-store
        ref="picture"
        @childImg="parentImg"
        :root="root"
      ></picture-store>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>
<script>
import citySelectex from "@/components/citySelectEX";
import pictureStore from "@/components/pictureStoreII/picture";
//import editorBar from "../articleManage/components/wangEditor";
import ueditor from "@/components/ueditor";
import _ from "lodash";
export default {
  name: "addInformation",
  components: { citySelectex, pictureStore, "my-editor": ueditor },
  data() {
    return {
      editorHeight: 0,
      //图库弹框
      imgTK: false,
      //关联商家
      options: [],
      list: [],
      loading: false,
      //上传值root
      root: "news",
      //分类数据
      checkListData: [],
      ruleForm: {
        //标题
        title: "",
        //概要
        summary: "",
        //富文本内容
        content: "",
        //文章类型
        list_shape: 1,
        //分类ID
        mid: [],
        //允许评论 ：1是 0否
        allow_comment: 1,
        //置顶状态：0不置顶 1置顶
        stick: 0,
        //状态：1正常 2禁用
        status: 1,
        //封面 单图传一张 三图传三张 视频传一张
        covers: [],
        //上传视频ID
        video_id: "",
        //省份ID
        province_id: "",
        //城市ID
        city_id: "",
        //区县ID
        area_id: "",
        //店铺ID数组
        shop_id: "",
        //推送时间 2020-01-02 15:04
        push_time: "",
        is_original: null,
      },
      //图片文件
      fileImg: "",
      //多张图片
      coversIMG: [],
      //视频
      videoIMG: "",
      videoTK: false,
      //TAB
      activeName: "first",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        //summary: [{ required: true, message: "请输入概要", trigger: "blur" }],
        mid: [
          {
            type: "array",
            required: true,
            message: "请选择分类",
            trigger: "blur",
          },
        ],
        // covers: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "请选择图片/视频",
        //     trigger: "blur",
        //   },
        // ],
        // shop_id: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "请选择关联店铺",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  created() {
    if (this.$route.query.class) {
      this.ruleForm.mid = [Number(this.$route.query.class)];
    }
    this.editorHeight = window.innerHeight * 0.65; //动态设置图文编辑器高度
    this.getGoodsClass();
  },
  methods: {
    //类型变化
    lengbh() {
      this.ruleForm.covers = [];
      this.coversIMG = [];
      this.fileImg = "";
      this.ruleForm.video_id = "";
      this.videoIMG = "";
    },
    //选择图片弹框
    wyaoxuantp() {
      this.imgTK = true;
      //初始化
      setTimeout(() => {
        this.$refs.picture.concert(1);
      }, 0);
    },
    //选择视频弹框
    wyaoxuantp2() {
      this.imgTK = true;
      this.videoTK = true;
      //初始化
      setTimeout(() => {
        this.$refs.picture.concert(2);
      }, 0);
    },
    //删除图片
    sctp(key) {
      this.ruleForm.covers.splice(key, 1);
      this.coversIMG.splice(key, 1);
      this.fileImg = "";
    },
    //删除视频
    sctpVideo() {
      this.ruleForm.video_id = "";
      this.videoIMG = "";
    },
    //输入商家名称查询方法
    remoteMethod(query) {
      if (query !== "") {
        this.api.zhixun.getShop({ keyword: query }).then((res) => {
          this.list = res.data.data;
        });
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 获取富文本子组件传来的数据
    getEditorData(data) {
      this.ruleForm.content = data;
    },
    // 获取子组件返回的图片数据
    parentImg(url, localPath, n, file, id) {
      if (this.ruleForm.list_shape == 1) {
        this.fileImg = file ? file : [url][0];
        this.ruleForm.covers = [url];
      } else if (this.ruleForm.list_shape == 2) {
        if (this.ruleForm.covers.length < 3) {
          this.ruleForm.covers.push(url);
          this.coversIMG.push(file ? file : [url]);
        } else {
          this.$message({
            message: "图片最多三张",
            type: "warning",
          });
        }
      } else if (this.ruleForm.list_shape == 3 && this.videoTK) {
        this.videoTK = false;
        this.videoIMG = url;
        this.fileImg = [localPath][0];
        this.ruleForm.covers = [localPath];
        this.ruleForm.video_id = n;
      } else if (this.ruleForm.list_shape == 3 && !this.videoTK) {
        this.fileImg = file ? file : [url][0];
        this.ruleForm.covers = [url];
      }
      this.imgTK = false;
    },
    // 获取子组件返回的ID
    setCityAreaName(areaName) {
      this.ruleForm.province_id = areaName.province;
      this.ruleForm.city_id = areaName.city;
      this.ruleForm.area_id = areaName.area;
    },
    // 获取分类列表
    getGoodsClass() {
      this.api.zhixun.getListclass().then((res) => {
        this.checkListData = res.data.data;
        this.checkListData = _.orderBy(
          this.checkListData,
          ["status", "mid_id"],
          ["desc", "asc"]
        );
      });
    },
    //提交
    tijiao() {
      if (this.ruleForm.content == "" && this.ruleForm.list_shape != 3) {
        //视频类型不需要有图文内容
        this.$message({
          message: "图文详情不能留空",
          type: "warning",
        });
        return;
      }
      if (this.ruleForm.mid.length == 0) {
        this.$message({
          message: "文章分类必须设置",
          type: "warning",
        });
        return;
      }
      if (this.ruleForm.covers.length == 0 && this.ruleForm.list_shape != 3) {
        this.$message({
          message: "文章封面必须设置",
          type: "warning",
        });
        return;
      }
      if (this.$refs["my-editor"].isSource()) {
        this.$message({
          message: "图文详情正处于源码编辑状态，无法提交。请切换回正常状态。",
          type: "warning",
        });
        return;
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let data = this.ruleForm;
          this.api.zhixun.insertZX(data).then((res) => {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$router.go(-1);
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.dsfbt {
  width: 300px;
}
.sjiasrxz {
  width: 100%;
}
.el-icon-error {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 80;
  color: rgb(223, 9, 9);
}
.zgsimg {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  position: relative;
}
.tiebtp {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  border: 2px #e6e6e6 dashed;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.el-icon-plus {
  color: #cacaca;
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
.el-button--primary {
  background-color: #1f1f1f;
  border: none;
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
.el-button--primary {
  background-color: #1f1f1f;
  border: none;
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
</style>
