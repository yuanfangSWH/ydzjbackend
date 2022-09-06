<template>
  <div>
    <div style="padding-bottom: 10px">
      <el-button
        v-if="html"
        type="primary"
        v-show="!isHtml && root != ''"
        @click="handleHtml(true)"
        >编辑HTML</el-button
      >
      <el-button
        type="primary"
        v-show="isHtml && root != ''"
        @click="handleHtml(false)"
        >返回编辑器</el-button
      >
      <el-button v-if="media && !isHtml" type="primary" @click="imgTK = !imgTK"
        >媒体库
        <i v-if="imgTK" class="el-icon-arrow-down"></i>
        <i v-else class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div style="padding-bottom: 10px" v-if="imgTK">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="图片库" name="pic">
          <picture-store
            v-if="activeName == 'pic'"
            ref="picture"
            @childImg="parentImg"
            :root="root"
          ></picture-store>
        </el-tab-pane>
        <el-tab-pane label="视频库" name="video">
          <picture-store
            v-if="activeName == 'video'"
            ref="videoBox"
            @childImg="parentVideo"
            :root="root"
          ></picture-store>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-show="!isHtml && root != ''" ref="editorElem"></div>
    <el-input
      v-show="isHtml && root != ''"
      type="textarea"
      :rows="15"
      placeholder="请输入内容"
      v-model="editorContentHtml"
      @change="handleHtmlChange"
    ></el-input>
    <h4 v-show="this.root == ''">没有设置路径“root”...</h4>
    <!-- <el-dialog title="选择图片/视频" :visible.sync="imgTK" width="30%">
      
    </el-dialog> -->
  </div>
</template>
<script>
import E from "wangeditor";
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;
import axios from "axios";
import { getToken } from "@/utils/auth";
import pictureStore from "@/components/pictureStoreII/picture";
export default {
  name: "Editor",
  components: { pictureStore },
  data() {
    return {
      activeName: "pic",
      imgTK: false,
      isHtml: false,
      editor: null,
      editorContent: "",
      editorContentHtml: "",
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
    };
  },
  props: {
    editorContentData: {},
    html: { type: Boolean, default: true },
    media: { type: Boolean, default: true },
    height: { type: Number, default: 500 },
    root: {
      type: String,
      default: "",
    },
  },
  watch: {
    editorContentData(n, o) {
      // console.log(this.editorContent);
      // console.log(n);
      if (!this.editorContent) {
        this.editorContent = n;
        this.editor.txt.html(this.editorContent);
      }
    },
  },
  mounted() {
    const menuKey = "alertMenuKey";

    // 注册菜单
    //E.registerMenu(menuKey, AlertMenu);
    this.editor = new E(this.$refs.editorElem);
    this.editor.config.height = this.height;
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };

    // 上传图片
    this.editor.config.withCredentials = true;
    //自定义插入图片函数
    // this.editor.customConfig.uploadImgHooks = {
    //   customInsert: function (insertImg, result, editor) {
    //     console.info(result);
    //   },
    // };
    // 自定义上传图片方法
    this.editor.config.customUploadImg = (file, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      let param = new FormData(); // 创建form对象
      param.append("file[]", file[0]);
      param.append("root", this.root);

      const url = "/api/file/uploads"; // url是上传图片的路径
      // 一般项目中都会封装好发送请求得方法,我这为了通用直接用axios
      axios.post(url, param, this.header).then((res) => {
        // res是上传成功后返回的数据,返回的数据中需要有上传图片的路径,
        // 通过insert方法将路径传入,即可将图片在富文本中插入

        // 我这返回的是JSON数据,需要解析
        const data = res.data;
        const imgUrl = data.data.url_path; // 上传后的图片路径
        // 上传代码返回结果之后，将图片插入到编辑器中

        for (let i in imgUrl) {
          this.editor.cmd.do(
            "insertHTML",
            '<img src="' +
              (this.GetImageOssUrl() + imgUrl[i]) +
              '" style="max-width: 100%;">'
          );
          //insert('"http://oss.ddhi.cn"' + imgUrl[i]);
        }
      });
    };
    this.editor.config.uploadImgMaxSize = 3 * 1024 * 1024; // 图片的大小
    this.editor.config.uploadImgMaxLength = 5; // 上传图片的个数
    this.editor.config.uploadImgShowBase64 = true;
    this.editor.config.uploadFileName = "myFileName";
    this.editor.config.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      //"image", // 插入图片
      "video", //插入视频
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },
  methods: {
    handleTabsClick(v) {
      let boxName = "picture";
      let boxValue = 1;
      if (v.name == "pic") {
        boxName = "picture";
        boxValue = 1;
      }
      if (v.name == "video") {
        boxName = "videoBox";
        boxValue = 2;
      }
      console.info(boxName);
      this.$nextTick(() => {
        this.$refs[boxName].concert(boxValue);
      });
    },
    // 获取到富文本中的值
    catchData(data) {
      this.$emit("editorData", data);
    },

    handleHtml(v) {
      if (v) {
        this.editorContentHtml = this.editorContent;
      } else {
        //this.editorContent = this.editorContentHtml;
        //this.editor.txt.html(this.editorContent);
      }
      this.isHtml = v;
    },
    handleHtmlChange() {
      this.editorContent = this.editorContentHtml;
      this.editor.txt.html(this.editorContent);
    },
    parentImg(url) {
      this.editor.cmd.do(
        "insertHTML",
        '<img src="' + url + '" style="max-width: 100%;">'
      );
      this.imgTK = false;
    },
    parentVideo(url, poster) {
      this.editor.cmd.do(
        "insertHTML",
        '<video width="100%" webkit-playsinline playsinline duration x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="false" x5-video-orientation="portraint" src="' +
          url +
          '" poster="' +
          poster +
          '" controls="controls"></video>'
      );
      this.imgTK = false;
    },
  },
};

class AlertMenu extends BtnMenu {
  constructor(editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(
      `<div class="w-e-menu" data-title="清除格式">
                <i class="el-icon-s-open"></i>
            </div>`
    );
    super($elem, editor);
  }
  // 菜单点击事件
  clickHandler() {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器

    //alert("hello world");
    let content = this.editor.selection.getSelectionText(); //this.editor.txt.html();
    //content = htmlToText(content);
    //this.editor.txt.html(content);
    this.editor.cmd.do("insertHTML", content);
    console.info(content);
  }
  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive() {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    this.active();

    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    // this.unActive()
  }
}
function htmlToText(v) {
  var reTag = /<(?:.|\s)*?>/g;
  return v.replace(reTag, "");
}
</script>
<style>
.w-e-panel-container {
  margin-left: 0px !important;
}
.w-e-text-container ul li {
  list-style: disc !important;
}
.w-e-text-container ol li {
  list-style: decimal !important;
}
.el-dialog__wrapper {
  z-index: 9999999 !important;
}
</style>
