/*
 * @Author: your name
 * @Date: 2021-03-15 11:52:03
 * @LastEditTime: 2021-03-15 11:55:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\api\media.js
 */
import request from '@/utils/request'
//获得媒体视频上传凭证
function videoUploadAuth(data) {
  return request({
    url: '/file/uploadAuth',
    method: 'post',
    data
  });
}
export default {
  videoUploadAuth
}
