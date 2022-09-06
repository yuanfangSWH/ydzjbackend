<template>
  <div class="shopSet">
    <div class="page-title">{{this._getVuex('pageTitle')}}</div>
    <div class="add-box">
      <div class="btn-nav">
        <el-button type="danger" @click="batchDelete">删除</el-button>
        <el-button type="primary" @click="addGoodsClassOpen">新增</el-button>
      </div>
      <div class="so-nav">
        <el-input class="so-ipt"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="soVal"
          @change="seachFun">
        </el-input>
        <el-button class="sosuo" type="primary">搜索</el-button>
      </div>
    </div>
    <el-table
    ref="multipleTable"
    :data="options"
    stripe
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="class_id"
        label="全选/ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="class_name"
        label="分类名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="class_sort"
        sortable
        label="排序"
        width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <i v-if="scope.row.status == 1" class="el-icon-check"></i>
          <i v-else class="el-icon-close"></i>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagebox"><el-pagination
    :hide-on-single-page="value"
    background
    layout="prev, pager, next"
    :total="count"
    @current-change="pageChange"
    >
    </el-pagination></div>
    
    <!-- 编辑分类 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
     >
      <el-form :model="classForm" :rules="rules" ref="classForm" label-width="150px" class="demo-classForm">
        <el-form-item label="分类名称" prop="class_name">
          <el-input v-model="classForm.class_name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="class_sort">
          <el-input v-model="classForm.class_sort"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="classForm.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('classForm')">保存</el-button>
          <el-button @click="resetForm('classForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增分类 -->
    <el-dialog
      title="新增商品分类"
      :visible.sync="dialogVisibleAdd"
      width="30%"
     >
      <el-form :model="classFormAdd" :rules="rules" ref="classFormAdd" label-width="150px" class="demo-classForm">
        <el-form-item label="分类名称" prop="class_name">
          <el-input v-model="classFormAdd.class_name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="class_sort">
          <el-input v-model="classFormAdd.class_sort"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-switch v-model="classFormAdd.status"></el-switch>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitFormAdd('classFormAdd')">添加</el-button>
          <el-button @click="resetForm('classFormAdd')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除规则 -->
    <el-dialog
      :title="deltitle"
      :visible.sync="deldialogVisible"
      width="30%"
     >
      <span>确定要删除此分类吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelFun">确定</el-button>
      </span>
    </el-dialog>
     <!-- 批量删除分类 -->
    <el-dialog
      title="批量删除"
      :visible.sync="batchdialogVisible"
      width="30%"
     >
      <span class="s-title">确定要删除以下分类吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">{{item}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelbatch">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ShopSet',
  data() {
    return {
      soVal:'',
      options:[],
      multipleSelection: '',
      value:true,
      page:1,
      count:0,
      detaileData:[],
      dialogVisible: false,
      title:'',
      class_id:0,
      classForm: {
        class_id:0,
        class_name: '',
        class_sort: '',
        status: false
      },
      rules: {
        class_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      deldialogVisible: false,
      deltitle:'',
      dialogVisibleAdd: false,
      classFormAdd: {
        class_name: '',
        class_sort: ''
      },
      batchdialogVisible:false,
      nameArr: []
    }
  },
  created() {
    this.getGoodsClass()
  },
  methods: {
    //查看、修改
    handleClick(row) {
      const datas = row.class_id
      this.$store.dispatch('goods/getGoodsClassDetail', datas).then((res) => {
        this.classForm = res.data
        if(this.classForm.status == 1){
          this.classForm.status = true
        }else{
          this.classForm.status = false
        }
        this.dialogVisible = true
        this.title = '编辑-'+this.classForm.class_name
      })
    },
    //修改提交
    submitForm(formName) {
      //this.dialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.classForm.status == true){
            this.classForm.status = 1
          }else{
            this.classForm.status = 0
          }
          const datas = this.classForm
          this.$store.dispatch('goods/updateGoodsClass', datas).then((res) => {
            this.$message({
              message: '' + res.msg,
              type: 'success'
            });
            this.getGoodsClass()
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除
    delClick(row) {
      this.deldialogVisible = true
      this.class_id = row.class_id
      this.deltitle = '删除-'+row.class_name
    },
    //确认删除
    confirmDelFun() {
      const datas = {
        id: this.class_id
      }
      this.$store.dispatch('goods/deleteGoodsClass', datas).then((res) => {
        this.$message({
          message: '' + res.msg,
          type: 'success'
        });
        this.getGoodsClass()
        this.deldialogVisible = false
      })
    },
    //批量删除
    batchDelete() {
      if(this.multipleSelection){
        this.batchdialogVisible = true
      }else{
        this.$message({
          message: '请先勾选要删除的分类',
          type: 'warning'
        });
      }
    },
    //确认批量删除
    confirmDelbatch() {
      const datas = {
        id: this.multipleSelection
      }
      this.$store.dispatch('goods/deleteGoodsClass', datas).then((res) => {
        this.$message({
          message: '' + res.msg,
          type: 'success'
        });
        this.getGoodsClass()
        this.batchdialogVisible = false
      })
    },
    //新增商品分类弹框
    addGoodsClassOpen() {
      this.dialogVisibleAdd = true
    },
    //新增商品分类
    submitFormAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //this.classFormAdd.allow_special_date = this.classFormAdd.allow_special_date.join(',')
          const datas = this.classFormAdd
          console.log(datas)
          this.$store.dispatch('goods/addGoodsClass', datas).then((res) => {
            this.$message({
              message: '' + res.msg,
              type: 'success'
            });
            this.getGoodsClass()
            this.dialogVisibleAdd = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
     // 获取分类列表
    getGoodsClass() {
      const datas = {
        page: this.page
      }
      this.$store.dispatch('goods/getGoodsClass', datas).then((res) => {
        this.options = res.data
        this.count = res.count
      })
    },
    handleSelectionChange(val) {
      var arr=[]
      for(var i=0; i<val.length; i++){
        arr.push(val[i].class_id)
        this.nameArr.push(val[i].class_name)
      }
      arr = Array.from(new Set(arr))
      this.nameArr = Array.from(new Set(this.nameArr))
      this.multipleSelection = arr.join(',')
    },
    pageChange(val) {
      this.page = val
      this.getGoodsClass()
    },
    seachFun() {
      const datas = {
        page: this.page,
        name: this.soVal
      }
      this.$store.dispatch('goods/getGoodsClass', datas).then((res) => {
        this.options = res.data
        this.count = res.count
      })
    }
  }
}
</script>

<style scoped>
    .shopSet{margin: 15px;background: #ffffff;padding: 15px;border: 1px solid #DFDFDF;}
    .add-box{ margin: 10px 0; display: flex;}
    .s-title{ font-size: 14px; font-weight: bold;}
    .gz-name{ padding-top: 10px;}
    .btn-nav{ flex: 1; display: flex;}
    .so-nav{ width: 350px; display: flex;}
    .sosuo{ margin-left: 10px;}
    .so-ipt{ border-color: #CECECE;}
    .el-input__suffix{ color: #000 !important; font-weight: bold;}
    .pagebox{ width: 100%; text-align: center; margin-top: 30px;}
    .el-button--text{ color:#0A0A0A}
</style>
