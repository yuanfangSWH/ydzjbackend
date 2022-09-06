<!--
 * @Author: your name
 * @Date: 2021-03-22 09:35:25
 * @LastEditTime: 2021-04-21 10:12:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\components\ueditor\index.vue
-->
<template>
  <el-row :gutter="20">
    <el-col
      :span="preview ? 12 : 24"
      :lg="preview ? 12 : 24"
      :md="24"
      :sm="24"
      :xs="24"
    >
      <div style="margin: 0 auto; width: 800px">
        <div style="padding-bottom: 10px; width: 800px">
          <el-button v-if="media" type="primary" @click="imgTK = !imgTK"
            >媒体库
            <i v-if="imgTK" class="el-icon-arrow-down"></i>
            <i v-else class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <div style="padding-bottom: 10px; width: 800px" v-if="imgTK">
          <el-tabs
            v-if="picstore == 'news'"
            v-model="activeName"
            @tab-click="handleTabsClick"
          >
            <el-tab-pane label="图片库" name="pic">
              <my-picture-store
                v-if="activeName == 'pic'"
                ref="picture"
                @childImg="parentImg"
                :root="root"
              ></my-picture-store>
            </el-tab-pane>
            <el-tab-pane label="视频库" name="video">
              <my-picture-store
                v-if="activeName == 'video'"
                ref="videoBox"
                @childImg="parentVideo"
                :root="root"
              ></my-picture-store>
            </el-tab-pane>
          </el-tabs>
          <my-goods-store
            v-if="picstore == 'goods'"
            @childImg="parentImg"
            root="goods_media"
          ></my-goods-store>
        </div>
        <my-ueditor
          @ready="ueReady"
          v-model="content"
          :config="myConfig"
          class="center-block"
        ></my-ueditor>
      </div>
    </el-col>
    <el-col v-if="preview" :lg="12" :md="12" :sm="24" :xs="24">
      <div class="phone" style="position: relative">
        <img
          class="phone-box"
          style="width: 511px; height: 1036px"
          src="../../assets/phone.png"
        />
        <div style="position: absolute; top: 154px; left: 35px">
          <div class="preview-box night">
            <div class="content" v-html="content"></div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
let UE;
import VueUeditorWrap from "vue-ueditor-wrap";
import pictureStore_news from "@/components/pictureStoreII/picture";
import pictureStore_goods from "@/components/pictureStore/picture";
export default {
  name: "ueditor",
  components: {
    "my-ueditor": VueUeditorWrap,
    "my-picture-store": pictureStore_news,
    "my-goods-store": pictureStore_goods,
  },
  props: {
    inicontent: {
      type: String,
      default: "",
    },
    media: { type: Boolean, default: true },
    root: {
      type: String,
      default: "",
    },
    preview: { type: Boolean, default: false },
    height: {
      type: Number,
      default: 0,
    },
    picstore: { type: String, default: "news" },
  },
  data() {
    return {
      imgTK: false,
      content: "",
      activeName: "pic",
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight:
          this.height > 0 ? this.height : window.outerHeight * 0.58,
        // 初始容器宽度
        initialFrameWidth: "800",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！部署在国外的服务器，如果无法访问，请自备梯子）
        serverUrl: "",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/UEditor/",
        enableAutoSave: false,
        zIndex: 3005,
        toolbars: [
          //   [
          //     "anchor", //锚点
          //     "undo", //撤销
          //     "redo", //重做
          //     "bold", //加粗
          //     "indent", //首行缩进
          //     "snapscreen", //截图
          //     "italic", //斜体
          //     "underline", //下划线
          //     "strikethrough", //删除线
          //     "subscript", //下标
          //     "fontborder", //字符边框
          //     "superscript", //上标
          //     "formatmatch", //格式刷
          //     "source", //源代码
          //     "|",
          //     "blockquote", //引用
          //     "pasteplain", //纯文本粘贴模式
          //     "selectall", //全选
          //     "print", //打印
          //     "preview", //预览
          //     "horizontal", //分隔线
          //     "removeformat", //清除格式
          //     "time", //时间
          //     "date", //日期
          //     "unlink", //取消链接
          //     "|",
          //     "inserttable", //插入表格
          //     "insertrow", //前插入行
          //     "insertcol", //前插入列
          //     "mergeright", //右合并单元格
          //     "mergedown", //下合并单元格
          //     "deleterow", //删除行
          //     "deletecol", //删除列
          //     "splittorows", //拆分成行
          //     "splittocols", //拆分成列
          //     "splittocells", //完全拆分单元格
          //     "deletecaption", //删除表格标题
          //     "inserttitle", //插入标题
          //     "mergecells", //合并多个单元格
          //     "deletetable", //删除表格
          //     "insertparagraphbeforetable", //"表格前插入行"
          //     "edittable", //表格属性
          //     "edittd", //单元格属性
          //     "|",
          //     "link", //超链接
          //     "emotion", //表情
          //     "spechars", //特殊字符
          //     "cleardoc", //清空文档
          //     "|",
          //     "insertcode", //代码语言
          //     "fontfamily", //字体
          //     "fontsize", //字号
          //     "paragraph", //段落格式
          //     "searchreplace", //查询替换
          //     "justifyleft", //居左对齐
          //     "justifyright", //居右对齐
          //     "justifycenter", //居中对齐
          //     "justifyjustify", //两端对齐
          //     "forecolor", //字体颜色
          //     "backcolor", //背景色
          //     "insertorderedlist", //有序列表
          //     "insertunorderedlist", //无序列表
          //     "fullscreen", //全屏
          //     "directionalityltr", //从左向右输入
          //     "directionalityrtl", //从右向左输入
          //     "rowspacingtop", //段前距
          //     "rowspacingbottom", //段后距
          //     "imagenone", //默认
          //     "imageleft", //左浮动
          //     "imageright", //右浮动
          //     "imagecenter", //居中
          //     "wordimage", //图片转存
          //     "lineheight", //行间距
          //     "edittip ", //编辑提示
          //     "customstyle", //自定义标题
          //     "autotypeset", //自动排版
          //     "touppercase", //字母大写
          //     "tolowercase", //字母小写
          //     "scrawl", //涂鸦
          //     //"music", //音乐

          //     //"drafts", // 从草稿箱加载
          //     "charts", // 图表
          //     "help", //帮助
          //   ],

          [
            "fullscreen",
            "source",
            "undo",
            "redo",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "removeformat",
            "formatmatch",
            "autotypeset",
            "blockquote",
            "pasteplain",
            "forecolor",
            "backcolor",
            "justifyleft",
            "justifycenter",
            "justifyright",
            "justifyjustify",
            "insertorderedlist",
            "insertunorderedlist",
            "selectall",
            "cleardoc",
            "rowspacingtop",
            "rowspacingbottom",
            "lineheight",
          ],
          [
            "paragraph",
            "fontfamily",
            "fontsize",
            "directionalityltr",
            "directionalityrtl",
            "indent",
            "link",
            "unlink",
            "anchor",
            "imagenone",
            "imageleft",
            "imageright",
            "imagecenter",
            //"simpleupload",
            //"insertimage",
            "emotion",
            //"insertvideo",
            //"music",
            //"attachment",
            //"map",
            "template",
            "horizontal",
            "spechars",
            "inserttable",
            "preview",
            "searchreplace",
            //"drafts",
          ],
        ],
      },
    };
  },
  watch: {
    inicontent: {
      immediate: true, // 这句重要
      handler(val) {
        this.content = val;
      },
    },
    content(n, o) {
      this.$emit("change", n);
    },
  },
  created() {},
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
    ueReady(u) {
      UE = u;
      //console.info(UE);
    },
    isSource() {
      return UE.queryCommandState("source") == 1;
    },
    parentImg(url) {
      UE.execCommand(
        "insertHTML",
        '<img src="' + url + '" style="max-width: 100%;">'
      );
      //this.imgTK = false;
    },
    parentVideo(url, poster) {
      UE.execCommand(
        "insertHTML",
        '<video width="100%" webkit-playsinline playsinline duration x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="false" x5-video-orientation="portraint" src="' +
          url +
          '" poster="' +
          poster +
          '" controls="controls"></video>'
      );
      //this.imgTK = false;
    },
  },
};
</script>
<style>
/* @import url("http://files.ddhi.cn/css/ios.css"); */
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.preview-box {
  width: 441px;
  height: 736px;
  overflow: auto;
}

.night .content input,
.night .content textarea,
.night .content button,
.night .content select,
.night .content pre,
.night .content xmp,
.night .content tt,
.night .content code,
.night .content kbd,
.night .content samp {
  line-height: 1.5;
  /*font-family:tahoma,arial,"Hiragino Sans GB",simsun,sans-serif*/
}

.night {
  margin: 0;
  padding: 0;
  background-color: #0a0a0a !important;
}

.night .content ul,
.night .content ol,
.night .content dl,
.night .content dd,
.night .content h1,
.night .content h2,
.night .content h3,
.night .content h4,
.night .content h5,
.night .content h6,
.night .content figure,
.night .content form,
.night .content fieldset,
.night .content legend,
.night .content input,
.night .content textarea,
.night .content button,
.night .content p,
.night .content blockquote,
.night .content th,
.night .content td,
.night .content pre,
.night .content xmp {
  margin: 0;
  padding: 0;
}

.night > .content {
  padding: 0;
  color: #b8b8b8;
  font-size: 18px;
  line-height: 2rem;
}

.night > .content img {
  max-width: 100%;
  margin: 6px auto;
}

.night .content p,
.night .content div,
.night .content span,
.night .content table,
.night .content tr,
.night .content td,
.night .content h1,
.night .content h2,
.night .content h3,
.night .content h4,
.night .content h5,
.night .content h6,
.night .content ul,
.night .content li,
.night .content dl,
.night .content dd,
.night .content ol,
.night .content text,
.night .content em,
.night .content i,
.night .content b,
.night .content strong,
.night .content a {
  font-size: 18px;
  line-height: 2rem;
}

.night > .content p {
  padding: 0 0 20px 0;
}

.night > .content tr {
  font-weight: bold;
}

.night > .content a:active,
.night > .content a:hover,
.night > .content a:visited {
  color: #81a0ec !important;
  text-decoration: none;
}

.night > .content a {
  text-decoration: none;
  color: #81a0ec !important;
}

.night > .content video {
  width: 100%;
}

.night > .content h2,
.night > .content h3,
.night > .content h4,
.night > .content h5,
.night > .content h6 {
  padding: 0 10px;
  margin: 10px 0 20px 0;
  border-left: 5px solid #ffbe11;
}

.night > .content ol {
  padding-left: 40px;
}
.night > .content ol li {
  list-style-type: decimal;
}
.night > .content ul,
.night dl {
  padding-left: 30px;
}
.night > .content ul li {
  list-style-type: disc;
}
</style>