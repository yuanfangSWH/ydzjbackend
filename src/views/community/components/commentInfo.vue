<template>
  <div class="commentInfo">
    <el-row>
      <el-col :span="4">
        <div style="text-align: right;height: 40px;line-height: 40px;">发布用户：</div>
      </el-col>
      <el-col :span="18">
        <div style="display: flex">
          <div class="avatar"
               :style="{background:'url(' + data.user.avatar +') center no-repeat'}"></div>
          <div class="userInfo">
            <p>{{data.user&&data.user.nickname}} （<span v-if="data.user.gender == 1">男</span><span v-else>女</span>/{{ data.user.age }}岁）</p>
            <p>ID：{{data.user&&data.user.user_id}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div style="text-align: right;">标题：</div>
      </el-col>
      <el-col :span="18">
        <p>
          {{data.title}}
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div style="text-align: right;">图片/视频：</div>
      </el-col>
      <el-col :span="18">
        <div class="videoBox"
             v-if="data.video"
             @click="playFun()">
          <video :poster="data.cover"
                 width="150"
                 height="150"
                 :src="data.video[0].file_url"></video>
          <i class="playIcon el-icon-video-play"></i>
        </div>
        <div v-if="data.album"
             style="width: 465px;">
          <span v-for="(item, index) in data.album"
                :key="index"
                @click="showImglist(data.album, index)">
            <el-image fit="cover"
                      style="width: 150px; height: 150px; margin-right: 5px"
                      :src="item.album_path"></el-image>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div style="text-align: right;">动态内容：</div>
      </el-col>
      <el-col :span="18">
        <p>
          {{data.content}}
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div style="text-align: right;">访问量：</div>
      </el-col>
      <el-col :span="2">
        <p>
          {{data.view_count}}
        </p>
      </el-col>
      <el-col :span="3">
        <p>
          评论： {{data.comment_count}}
        </p>
      </el-col>
      </el-col>
      <el-col :span="3">
        <p>
          点赞： {{data.like_count}}
        </p>
      </el-col>
      </el-col>
      <el-col :span="3">
        <p>
          分享： {{data.share_count}}
        </p>
      </el-col>
    </el-row>
    <div>
      <el-button class="dartBtn"
                 type="primary"
                 @click="handleCloseText">
        返回
      </el-button>
    </div>
    <el-dialog title="大图预览"
               :visible.sync="dialogVisible"
               width="50%">
      <template v-if="dialogVisible">
        <el-carousel :autoplay="false"
                     indicator-position="none"
                     arrow="always"
                     height="700px"
                     :initial-index="imgIndex">
          <el-carousel-item v-for="(item, index) in picData"
                            :key="index">
            <div class="imgbox"
                 v-if="index<=8">
              <el-image style="height: 700px; width: auto"
                        fit="contain"
                        :src="item.album_path"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <el-dialog :title="videoData.title"
               :visible.sync="dialogVisibleVideo"
               :before-close="handleClose"
               width="50%">
      <div id="v-box"
           style="width: 80%; margin: 0 auto; display: flex; align-items: center">
        <video id="videos"
               class="videoHeight"
               :poster="data.cover"
               controls="controls"
               loop="loop"
               width="100%"
               :src="data.video&&data.video[0].file_url"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'commentInfo',
  data () {
    return {
      dialogVisible: false,
      dialogVisibleVideo: false,
      videoData: false,
      picData: [],
      data: {
        user: {}
      }
    }
  },
  props: {
    thread_id: {
      require: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.api.community.threaddetail({ thread_id: this.thread_id }).then(res => {
        const { code, data } = res.data;
        if (code == 0) {
          this.data = JSON.parse(JSON.stringify(data))
        }
      })
    },
    showImglist (row, index) {
      console.log(row, index);
      setTimeout(() => {
        document.querySelector('body div.v-modal').style['z-index'] = 1000
      })
      // document.getElementsByClassName('v-modal')[0].style['display'] = 'none'
      // console.log(document.getElementsByClassName('v-modal')[0].style['z-index']);
      this.dialogVisible = true;
      this.picData = row;
      this.imgIndex = index;
    },
    playFun () {
      this.dialogVisibleVideo = true;
      // this.videoData = true;
      setTimeout(() => {
        this.itemPlay();
      });
    },
    itemPlay () {
      var ele = document.getElementById('videos');
      document.getElementsByClassName('v-modal')[0].style['z-index'] = 1000
      // ele.setAttribute("class", "videoHeight");
      var h1 = document.body.clientHeight;
      var box = document.getElementById("v-box");
      box.style.height = h1 - 400 + "px";
      ele.play();
    },
    handleClose () {
      var ele = document.getElementById('videos');
      ele.pause();
      this.dialogVisibleVideo = false;
    },
    handleCloseText () {
      this.$emit('handleClose', true)
    }
  }
}
</script>

<style lang="scss">
.commentInfo {
  color: #000;
  overflow: hidden;
  p {
    margin: 0;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-size: contain !important;
    margin-right: 10px;
  }
  .userInfo {
    p:first-child {
      margin-bottom: 8px !important;
    }
  }
  .el-row {
    margin-bottom: 40px;
  }
  .playIcon {
    font-size: 26px;
    position: absolute;
    left: 60px;
    top: 60px;
    color: #fff;
  }
  .videoBox {
    position: relative;
    .playIcon {
      font-size: 26px;
      position: absolute;
      left: 60px;
      top: 60px;
      color: #fff;
    }
  }
  .imgbox {
    width: 100%;
    text-align: center;
    display: inline-block;
  }
  .videoHeight {
    max-height: 100%;
  }
  .dartBtn {
    background-color: #000;
    color: #fff;
    border: 1px solid #000;
    width: 180px;
    float: right;
    margin-right: 100px;
  }
}
</style>