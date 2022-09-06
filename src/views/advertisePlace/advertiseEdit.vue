<template>
  <div class="advertiseEdit">
    <div class="title">
      <span>{{ title }} </span>
    </div>
    <div class="formBox">
      <div class="leftForm">
        <el-form
          :model="formData"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="广告名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="别名" placeholder="请输入内容" prop="alias">
            <el-input v-model="formData.alias"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formData.gender">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="加轮播停留时间" prop="stay_time">
            <el-input v-model.number="formData.stay_time"></el-input
            ><span style="color: #aaa; margin-left: 10px">单位：秒</span>
          </el-form-item>
          <el-form-item label="省市区">
            <searchCity
              ref="searchCity"
              :isAll="true"
              :returnValue="true"
              @setCityAreaName="setCityAreaName"
              :showArea="true"
            />
          </el-form-item>
          <!-- <el-form-item label="上传示例图" prop="example_image">
            <div style="display: flex">
              <div id="uploadImage" style="position: relative">
                <el-image
                  alt=""
                  :src="formData.example_image"
                  style="margin-right: 20px"
                >
                </el-image>
                <i class="el-icon-delete" @click="delImage"></i>
              </div>
              <el-upload
                action="/api/file/uploads"
                name="file[]"
                :limit="1"
                list-type="picture-card"
                :headers="{ AccessToken: this._getToken() }"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item> -->
          <el-form-item label="上传示例图" prop="platform">
            <img class="comimg" v-if="imageUrl" :src="imageUrl" />
            <img
              class="comimg"
              v-if="formData.example_image && id && imageUrl == ''"
              :src="formData.example_image"
            />
            <Imgcutter @cutDown="cutDown"></Imgcutter>
          </el-form-item>
          <!-- <el-form-item label="投放平台" prop="platform">
            <el-select v-model="formData.platform" placeholder="请选择">
              <el-option
                v-for="item in platformList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="formData.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input type="Number" v-model="formData.sort" clearable />
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-switch
              v-model="formData.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <!-- <el-form-item label="是否需要登录"
                        prop="need_login">
            <el-switch v-model="formData.need_login"
                       :active-value="1"
                       :inactive-value="0">
            </el-switch>
          </el-form-item> -->
          <el-form-item>
            <el-button @click="submitForm('ruleForm')" type="primary"
              >保存</el-button
            >
            <el-button
              @click="
                () => {
                  this.$emit('handleCloseVisible', false);
                }
              "
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
export default {
  data() {
    return {
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      imageUrl: "",
      title: "",
      formData: {
        name: "",
        alias: "",
        platform: "",
        status: 1,
        // need_login: 1,
        description: "",
        example_image: "",
        width: 100,
        height: 100,
        is_pic: 0,
        is_images: 0,
        pos_id: null,
        sort: 0,
        gender: 0,
        stay_time: 3,
        province_id: "",
        city_id: "",
        area_id: "",
      },
      platformList: [
        { label: "全平台", value: "" },
        { label: "android", value: "ANDROID" },
        { label: "ios", value: "IOS" },
        { label: "小程序", value: "WEAPP" },
        { label: "H5", value: "H5" },
        { label: "WAP", value: "WAP" },
        { label: "PC", value: "PC" },
      ],
      statusList: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
      rules: {
        name: { required: true, message: "请输入广告名称", trigger: "blur" },
        alias: { required: true, message: "请输入别名", trigger: "blur" },
        stay_time: { type: "number", message: "请输入数字", trigger: "blur" },
        example_image: {
          required: true,
          message: "请上传示例图",
          trigger: "change",
        },
        //全平台既是""，因此可以忽略验证———2020年12月12日，朱强注。
        //platform: { required: true, message: "请选择投放平台", trigger: "change" },
        status: { required: true, message: "请选择状态", trigger: "change" },
      },
      dialogVisible: false,
      adTableData: [],
    };
  },
  props: {
    id: {
      default: null,
    },
  },
  watch: {
    id(newVal, oldVal) {
      if (newVal) {
        this.title = "编辑广告位";
      } else {
        this.title = "新增广告位";
      }
      this.id = newVal;
      this.resetParams();
      if (this.id) {
        this.getAdPlaceDetail();
      }
    },
  },
  created() {
    if (this.id) {
      this.title = "编辑广告位";
      this.getAdPlaceDetail();
    } else {
      this.title = "新增广告位";
      this.$nextTick(() => {
        this.$refs.searchCity.getProvince(
          this.formData.province_id,
          this.formData.city_id,
          this.formData.area_id
        );
      });
    }
  },
  components: {
    searchCity,
  },
  // mounted() {
  //   if (!this.id) {
  //     document.getElementById("uploadImage").style.display = "none";
  //   }
  // },
  methods: {
    setCityAreaName(areaName) {
      let { province_id, city_id, area_id } = areaName;
      this.formData.province_id = province_id;
      this.formData.city_id = city_id;
      this.formData.area_id = area_id;
    },
    //剪切后触发方法
    cutDown: function (img) {
      var formData = new FormData();
      formData.append("file[]", img.file);
      formData.append("root", "ads");
      this.$ajax
        .post("/api/file/uploads", formData, this.header)
        .then((res) => {
          if (res.data.code == 0) {
            this.imageUrl = img.dataURL;
            this.formData.example_image = res.data.data.url_path[0];
          } else {
            this.imageUrl = "";
            this.formData.example_image = "";
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        });
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.formData.example_image = file.url;
      this.dialogVisible = true;
    },
    handleExceed() {
      this.$message.error("超出最大上传数量！");
    },
    // delImage() {
    //   document.getElementById("uploadImage").style.transform =
    //     "translateY(-10px)";
    //   document.getElementById("uploadImage").style.opacity = 0;
    //   setTimeout(() => {
    //     document.getElementById("uploadImage").style.display = "none";
    //     this.formData.example_image = null;
    //   }, 300);
    // },
    // 上传成功
    // handleSuccess(res) {
    //   document.getElementById("uploadImage").style.display = "none";
    //   this.formData.example_image = res.data ? res.data.url_path[0] : res;
    // },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            this.editAdPlace();
          } else {
            this.addAdPlace();
          }
        } else {
          return false;
        }
      });
    },
    // 新增
    addAdPlace() {
      this.formData.sort = Number(this.formData.sort);
      this.formData.province_id =
        this.formData.province_id == "" ? 0 : this.formData.province_id;
      this.formData.city_id =
        this.formData.city_id == "" ? 0 : this.formData.city_id;
      this.formData.area_id =
        this.formData.area_id == "" ? 0 : this.formData.area_id;
      this.api.advertisePlace.addAdPlace(this.formData).then((res) => {
        this.$message.success("新增成功！");
        // this.$router.push({ path: '/advertisePlace' })
        this.$emit("handleCloseVisible", false, "success");
      });
    },
    // 编辑
    editAdPlace() {
      this.formData.sort = Number(this.formData.sort);
      this.formData.province_id =
        this.formData.province_id == "" ? 0 : this.formData.province_id;
      this.formData.city_id =
        this.formData.city_id == "" ? 0 : this.formData.city_id;
      this.formData.area_id =
        this.formData.area_id == "" ? 0 : this.formData.area_id;
      this.api.advertisePlace.editAdPlace(this.formData).then((res) => {
        this.$message.success("编辑成功！");
        this.$emit("handleCloseVisible", false, "success");
      });
    },
    // 获取详情
    getAdPlaceDetail() {
      this.api.advertisePlace.adPlaceDetail({ pos_id: this.id }).then((res) => {
        let {
          pos_id,
          name,
          alias,
          platform,
          status,
          example_image,
          description,
          sort,
          gender,
          stay_time,
          province_id,
          city_id,
          area_id,
        } = res.data.data;
        let obj = {
          name,
          alias,
          platform,
          status,
          example_image,
          description,
          pos_id,
          sort,
          gender,
          stay_time,
          province_id,
          city_id,
          area_id,
        };
        this.formData = Object.assign({}, this.formData, obj);
        if (document.querySelector(".el-upload-list__item>img")) {
          document
            .querySelector(".el-upload-list__item>img")
            .setAttribute("src", example_image);
        }
        this.$nextTick(() => {
          this.$refs.searchCity.getProvince(
            this.formData.province_id,
            this.formData.city_id,
            this.formData.area_id
          );
        });
      });
    },
    resetParams() {
      this.formData = {
        name: "",
        alias: "",
        platform: "",
        status: null,
        // need_login: null,
        description: "",
        example_image: "",
        width: 100,
        height: 100,
        is_pic: 0,
        is_images: 0,
        pos_id: null,
        sort: 0,
        gender: 0,
        stay_time: 3,
        province_id: 0,
        city_id: 0,
        area_id: 0,
      };
    },
  },
};
</script>

<style lang="scss">
.comimg {
  width: 200px;
  height: 200px;
  display: block;
  margin-bottom: 10px;
  border: 1px #d4dadd solid;
  border-radius: 5px;
}
div.advertiseEdit {
  background-color: #fff;
  margin: 20px;
  margin-top: 0px;
  padding-bottom: 40px;
  .title {
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    > span {
      margin-left: 10px;
      font-size: 22px;
    }
    .el-button {
      float: right;
      margin-right: 20px;
      width: 100px;
    }
  }
  .el-input,
  .el-input__inner,
  .el-input--suffix,
  .el-textarea__inner {
    width: 240px;
  }
  #uploadImage {
    position: relative;
    width: 148px;
    height: 148px;
    margin-right: 20px;
    border-radius: 10px;
    transition: transform 0.3s, opacity 0.3s;
    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      color: #fff;
      font-size: 18px;
      display: none;
      cursor: pointer;
    }
  }
  #uploadImage:hover i {
    display: inline-block;
  }
}
</style>
