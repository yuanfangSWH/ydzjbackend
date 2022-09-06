<template>
    <div class="appBox">
        <div class="page-title">{{this._getVuex('pageTitle')}}</div>
        <div class="add-box">
            <div class="btn-nav" v-if="!isRecycle">
                <el-button type="danger" @click="moreDeleteFun(0)">删除</el-button>
                <el-button type="danger" @click="toAdd">新增</el-button>
                <!-- <el-button type="danger" @click="toAdds">新增</el-button> -->
                <el-button type="primary" @click="toRecycle">回收站</el-button>
            </div>
            <div class="btn-nav" v-else>
                <el-button type="danger" @click="moreDeleteFun(1)">还原</el-button>
                <el-button type="danger" @click="moreDeleteFun(2)">彻底删除</el-button>
                <el-button type="primary" @click="goBack">返回</el-button>
            </div>
            <div class="so-nav">
                <el-input class="so-ipt"
                placeholder="请输入导航标题"
                suffix-icon="el-icon-search"
                v-model="soVal"
                @change="seachFun">
                </el-input>
                <el-button class="sosuo" type="primary" @click="seachFun">搜索</el-button>
            </div>
        </div>
        <div>
            <button-table :dataOptions="dataOptions" :status="status" @childrenFun="parentFun"></button-table>
        </div>
        <div class="pagebox">
            <el-pagination
            :hide-on-single-page="value"
            background
            layout="prev, pager, next"
            :total="count"
            :current-page='page'
            @current-change="pageChange"
            >
            </el-pagination>
        </div>
        <!-- 删除单条 -->
        <el-dialog
            title="删除"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确定要删除这条数据吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteFun">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除多个 -->
        <el-dialog
            title="删除"
            :visible.sync="dialogMore"
            width="30%">
            <span>确定要删除以下数据吗？</span>
            <div style="margin-top:30px">
                <span v-for="(item,index) in nameArr" :key="index">{{item}}，</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogMore = false">取 消</el-button>
                <el-button type="primary" @click="deleteFun">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog
            title="新增导航菜单"
            :visible.sync="addDialogVisible"
            width="30%">
            <span>确定要删除这条数据吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteFun">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import buttonTable from './components/buttonTable'
export default {
    name:"buttonList",
    components:{
        buttonTable
    },
    data() {
        return {
            addDialogVisible:false,
            soVal:'',
            dataOptions:[],
            page:1,
            count:0,
            value:true,
            pageSign:0,
            filterVal:'',
            sortVal:'',
            order:'',
            id:'',
            multipleSelection:[],
            nameArr:[],
            deleteStatus:0,
            dialogVisible: false,
            dialogMore:false,
            isRecycle:false,
            status:1
        }
    },
    created() {
        this.dataFun()
    },
    watch: {
        pageSign(newVal, oldVal){
            this.page = 1
        }
    },
    methods:{
        // 
        dataFun() {
            this.pageSign = 0
            let data = {
                page:this.page,
                status: this.status
            }
            this.api.appmanage.buttonListData(data).then((res) => {
                this.dataOptions = res.data.data
                this.count = res.data.count
            });
        },
        parentFun(key, value, n) {
            if(n==1){
                if(key=='status' && value){
                    this.filterVal = value
                    this.filterGetStatusList()
                }else{
                    this.dataFun()
                }
            }else if(n==2){
                this.sortVal = key
                this.order = value
                this.sortDataFun()
            }else if(n==3){
                this.id = key
                this.$router.push({path:'/editbutton?id='+this.id})
            }else if(n==4){
                this.deleteStatus = n
                this.id = key
                this.dialogVisible =true
            }else if(n==5){
                this.deleteStatus = n
                this.multipleSelection = key
                this.nameArr = value
            }else if(n==6){
                this.deleteStatus = n
                this.huanyuanFun(key)
            }else if(n==7){
                this.deleteStatus = n
                this.realDeleteFun(key)
            }
            
        },
        // 彻底删除
        realDeleteFun(id){
            let data ={}
            if(this.deleteStatus == 7){
                data ={
                    id: [id]
                }
            }else{
                data ={
                    id: id
                }
            }
            this.api.appmanage.realDeleteButton(data).then((res) => {
                this.$message({
                    message: ''+res.data.msg,
                    type: 'success'
                });
                this.$router.push('/buttonList')
                this.isRecycle = true
                this.status = 0
                this.dataFun()
            });
        },
        // 还原
        huanyuanFun(id){
            let data ={}
            if(this.deleteStatus == 6){
                data ={
                    id: [id]
                }
            }else{
                data ={
                    id: id
                }
            }
            this.api.appmanage.recoveryButton(data).then((res) => {
                this.$message({
                    message: ''+res.data.msg,
                    type: 'success'
                });
                this.$router.push('/buttonList')
                this.isRecycle = false
                this.status = 1
                this.dataFun()
            });
        },
        //根据状态筛选
        filterGetStatusList() {
            this.pageSign = 1
            let data = {'page': this.page, status: this.filterVal,status: this.status}
            this.api.appmanage.buttonListData(data).then((res) => {
                this.dataOptions = res.data.data
                this.count = res.data.count
            });
        },
        // 排序
        sortDataFun() {
            this.pageSign = 2
            let data = {page: this.page, sort: this.sortVal, order:this.order,status: this.status}
             this.api.appmanage.buttonListData(data).then((res) => {
                this.dataOptions = res.data.data
                this.count = res.data.count
            });
        },
        seachFun() {
            this.pageSign = 3
            let data = {page: this.page, keyword: this.soVal,status: this.status}
             this.api.appmanage.buttonListData(data).then((res) => {
                this.dataOptions = res.data.data
                this.count = res.data.count
            });
        },
        pageChange(val) {
            this.page = val
            if(this.pageSign==0){
                this.dataFun()
            }else if(this.pageSign==1){
                this.filterGetStatusList()
            }else if(this.pageSign==2){
                this.sortDataFun()
            }else if(this.pageSign==3){
                this.seachFun()
            }
        },
        toAdd() {
            this.$router.push({path:'/addbutton'})
        },
        moreDeleteFun(n) {
            if(this.status == 1){//批量删除
                if(this.multipleSelection == ''){
                    this.$message({
                        message: '请先勾选要删除的数据',
                        type: 'warning'
                    });
                }else{
                this.dialogMore =true
                }
            }else{//批量还原/彻底删除
                if(this.multipleSelection == ''){
                    this.$message({
                        message: '请先勾选要操作的数据',
                        type: 'warning'
                    });
                }else if(n == 2){
                    this.realDeleteFun(this.multipleSelection)//彻底删除
                }else if(n == 1){
                    this.huanyuanFun(this.multipleSelection)//还原
                }
            }
        },
        deleteFun(){
            let data = {}
            if(this.deleteStatus == 4){
                data = {
                    id:[this.id]
                }
            }else{
                data = {
                    id:this.multipleSelection
                }
            }
            this.api.appmanage.deleteButton(data).then((res) => {
                this.dialogVisible = false
                this.dialogMore = false
                this.$message({
                    message: ''+res.data.msg,
                    type: 'success'
                });
                this.multipleSelection = []
                this.nameArr = []
                this.dataFun()
            });
        },
        toRecycle() {
            this.isRecycle = true
            this.status = 0
            this.dataFun()
        },
        goBack() {
            this.isRecycle = false
            this.status = 1
            this.dataFun()
        }
    }
}
</script>

<style lang="scss" scoped>
.appBox {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .add-box{ margin: 10px 0; display: flex;}
  .s-title{ font-size: 14px; font-weight: bold;}
  .gz-name{ padding-top: 10px;}
  .btn-nav{ flex: 1; display: flex;}
  .so-nav{ width: 350px; display: flex;}
  .sosuo{ margin-left: 10px;}
  .so-ipt{ border-color: #CECECE;}
  .el-input__suffix{ color: #000 !important; font-weight: bold;}
  .pagebox{ width: 100%; text-align: center; margin-top: 30px;}
  //   
  .el-button--danger{ background-color: #2e2e2e !important;border-color: #2e2e2e !important;}
  .el-button--primary{ color: #000; background-color: #fff6df !important;border-color: #ffbe11 !important;}
.appBox >>> .is-active{ color: #000 !important;}
.appBox >>> .el-button--text{color: #000 !important;}
}
</style>