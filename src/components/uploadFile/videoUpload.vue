<template>
  <div class="videoBox">
    <el-upload action="/api/file/uploads"
               :show-file-list="false"
               :on-success="handleVideoSuccess"
               :before-upload="beforeUploadVideo"
               :on-progress="uploadVideoProcess"
               :on-change="handleChange"
               :http-request="uploadImg">
      <video v-if="videoForm.Video !='' && videoFlag == false"
             :src="videoForm.Video"
             class="avatar"
             controls="controls">您的浏览器不支持视频播放</video>
      <i v-else-if="videoForm.Video =='' && videoFlag == false"
         class="el-icon-plus"></i>
      <el-progress v-if="videoFlag == true"
                   type="circle"
                   :percentage="videoUploadPercent"
                   style="margin-top:30px;"></el-progress>
    </el-upload>
    <P class="text">请保证视频格式正确，且不超过10M</P>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth' // get token from cookie
export default {
  props: {
    shop: Boolean
  },
  data () {
    return {
      videoForm: {
        Video: ''
      },
      videoFlag: false,
      videoUploadPercent: 0,
      fileLists: []
    }
  },
  created () {

  },
  methods: {
    // 验证方法：验证视频格式和视频大小
    beforeUploadVideo (file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -1) {
        this.$message.error('请上传正确的视频格式');
        return false;
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过10MB哦!');
        return false;
      }
    },
    // 上传进度显示：
    uploadVideoProcess (event, file, fileList) {
      // this.videoFlag = true;
      // this.videoUploadPercent = file.percentage.toFixed(0);

      // console.log(event.percent, file, fileList)
      this.videoFlag = true
      // this.videoUploadPercent = file.percentage.toFixed(0)
      // this.videoUploadPercent = event.percent.toFixed(0)
      this.videoUploadPercent = Math.floor(event.percent)
    },
    // 上传成功：
    handleVideoSuccess (res, file) {                               //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 200) {
        this.videoForm.videoUploadId = res.data.uploadId;
        this.videoForm.Video = res.data.uploadUrl;
      } else {
        this.$message.error('视频上传失败，请重新上传！');
      }
    },
    handleChange (file, fileList) {
      // console.log('change',fileList)
      this.fileLists.push(file.raw)
    },
    /* 上传文件 */
    uploadImg (option) {
      // console.log('option',option)
      var upData = new FormData()
      this.fileLists.forEach(function (file) { // 因为要上传多个文件，所以需要遍历
        upData.append('file[]', file, file.name)
        upData.append('root', 'shop')
      })
      this.$ajax.defaults.headers.common["token"] = getToken();
      this.$ajax.post('/api/file/uploads', upData, this.header).then((res) => {
        let path = res.data.data.url_path //上传多张
        // let singlePath = path[path.length-1] //只可以上传一张
        if (this.shop) {
          this.$emit('childrenFun', path, '1')
        }

        // if(this.limit == 1){
        // this.$emit('childrenFun', singlePath)
        // }else{
        // this.$emit('childrenFun', path)
        // }

      })
    },
  }
}
</script>

<style scoped>
.videoBox >>> .el-upload--text {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
}
.videoBox >>> .el-upload--text i {
  font-size: 28px;
  color: #8c939d;
}
.videoBox .text {
  font-size: 14px;
  color: #8c939d;
}
</style>