<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
.shopInfo .el-upload-list--picture-card .el-upload-list__item {
  display: none !important;
}
.input_pxcss {
  width: 140px;
}
/* 筛选按钮CSS */
.huaib {
  width: 90px;
  height: 26px;
  background-color: #fafafa;
  border: 1px #cdcdcd solid;
  border-bottom: 0px;
  border-radius: 5px 5px 0px 0px;
  margin-left: auto;
  margin-right: auto;
}
.temtub {
  margin-left: 36px;
  margin-top: 5px;
}
/* 按钮CSS结束 */
.el-tooltip__popper {
  max-width: 50% !important;
}
.el-image-viewer__close .el-icon-circle-close {
  color: #ffffff;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
}
.shanxdiv .liwz {
  max-width: 60%;
  margin-right: 50px;
  font-size: 18px;
  color: #8f9297;
}
.shanxdiv .spwz {
  font-weight: bold;
  color: #f9be44;
}
.caozdiv {
  width: 100px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.jump1 {
  flex: 1;
  color: #2b8ef2;
  cursor: pointer;
}
.jump2 {
  flex: 1;
  color: #ed3a26;
  cursor: pointer;
}
.gz-name {
  padding-top: 10px;
  font-size: 16px;
  color: #000;
}
.duio {
  display: flex;
}
.bjgt {
  font-size: 14px;
  line-height: 30px;
}
.ustrimg {
  width: 34px;
  height: 34px;
  display: block;
  border-radius: 70px;
  margin-right: 10px;
}
.rucwz {
  line-height: 36px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  color: #b9b9b9;
}
.rucwz2 {
  line-height: 36px;
  margin-left: 18px;
  margin-right: 18px;
  text-align: center;
  color: #b9b9b9;
}
.muzhicss {
  width: 400px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.muzhicss2 {
  width: 330px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.shiheyf {
  margin-top: 10px;
  margin-right: 10px;
  width: 90px;
  text-align: right;
}
/* 店铺简介CSS */
.nlwsb {
  line-height: 50px;
  font-size: 16px;
  color: #000;
  margin-left: 70px;
}
.shenhai {
  width: 110px;
  height: 40px;
  background-color: #f9be44;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  color: #000;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}
</style>