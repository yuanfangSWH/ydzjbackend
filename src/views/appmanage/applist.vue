<template>
    <div class="appBox">
        <div class="page-title">{{t_title}}</div>
        <el-tabs type="border-card" @tab-click="tabsFun" v-model="activeName">
            <el-tab-pane name="first" label="IOS">
                <div class="add-box">
                    <div class="btn-nav" v-if="!isRecycle">
                        <el-button type="danger" @click="moreDeleteFun(0)">删除</el-button>
                        <el-button type="danger" @click="toAdd('IOS')">新增</el-button>
                        <el-button type="primary" @click="toRecycle">回收站</el-button>
                    </div>
                    <div class="btn-nav" v-else>
                        <el-button type="danger" @click="moreDeleteFun(1)">还原</el-button>
                        <el-button type="danger" @click="moreDeleteFun(2)">彻底删除</el-button>
                        <el-button type="primary" @click="goBack">返回</el-button>
                    </div>
                    <div class="so-nav">
                        <el-input class="so-ipt"
                        placeholder="请输入名称"
                        clearable
                        v-model="soVal"
                        @change="seachFun">
                        </el-input>
                        <el-button class="sosuo" type="danger" @click="seachFun">搜索</el-button>
                    </div>
                </div>
                <app-table :dataOptions="dataOptions" :status="status" :platform="platform" @childrenFun="parentFun"></app-table>
            </el-tab-pane>
            <el-tab-pane name="second" label="安卓">
                <div class="add-box">
                    <div class="btn-nav" v-if="!isRecycle">
                        <el-button type="danger" @click="moreDeleteFun(0)">删除</el-button>
                        <el-button type="danger" @click="toAdd('ANDROID')">新增</el-button>
                        <el-button type="primary" @click="toRecycle">回收站</el-button>
                    </div>
                    <div class="btn-nav" v-else>
                        <el-button type="danger" @click="moreDeleteFun(1)">还原</el-button>
                        <el-button type="danger" @click="moreDeleteFun(2)">彻底删除</el-button>
                        <el-button type="primary" @click="goBack">返回</el-button>
                    </div>
                    <div class="so-nav">
                        <el-input class="so-ipt"
                        placeholder="请输入名称"
                        clearable
                        v-model="soVal"
                        @change="seachFun">
                        </el-input>
                        <el-button class="sosuo" type="primary" @click="seachFun">搜索</el-button>
                    </div>
                </div>
                <app-table :dataOptions="dataOptions" :status="status" :platform="platform" @childrenFun="parentFun"></app-table>
            </el-tab-pane>
        </el-tabs>
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
    </div>
</template>

<script>
import appTable from './components/appTable'
export default {
    name:"appList",
    components:{
        appTable
    },
    data() {
        return {
            t_title:'APP版本',
            soVal:'',
            dataOptions:[],
            page:1,
            count:0,
            value:true,
            pageSign:0,
            platform:'IOS',
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
            status:1,
            activeName:'first'
        }
    },
    created() {
    
        // var obj = {
        //     isRecycle: this.isRecycle,
        //     status: this.status
        // }
        // localStorage.setItem('appStorage',JSON.stringify(obj))
        if(this.$route.query.type){
            if(this.$route.query.type == 'IOS'){
                this.activeName = 'first'
                this.t_title = 'APP版本'
                this.platform = 'IOS'
                this.page = 1
            }else{
                this.activeName = 'second'
                this.t_title = 'Android版本'
                this.platform = 'ANDROID'
                this.page = 1
            }
            this.status = this.$route.query.status
            this.isRecycle = this.status == 0 ? true:false
        }
        var obj = JSON.parse(localStorage.getItem('appStorage'))
        if(obj.platform == 'IOS'){
            this.activeName = 'first'
            this.t_title = 'APP版本'
            this.platform = 'IOS'
        }else{
            this.activeName = 'second'
            this.t_title = 'Android版本'
            this.platform = 'ANDROID'
        }
        if(obj.isRecycle){
            this.status = 0
        }else{
            this.status = 1
            var obj = {
                isRecycle: this.isRecycle,
                status: this.status,
                platform:this.platform
            }
            localStorage.setItem('appStorage',JSON.stringify(obj))
        }
        if(obj){
            this.status = obj.status
            this.isRecycle = obj.isRecycle
        }
        this.dataFun()
    },
    watch: {
        pageSign(newVal, oldVal){
            this.page = 1
        }
    },
    methods:{
        tabsFun(e) {
            if(e.index == '0'){
                this.t_title = 'APP版本'
                this.platform = 'IOS'
                this.page = 1
                this.dataFun()
            }else{
                this.t_title = 'Android版本'
                this.platform = 'ANDROID'
                this.page = 1
                this.dataFun()
            }
            var obj = {
                isRecycle: this.isRecycle,
                status: this.status,
                platform:this.platform
            }
            localStorage.setItem('appStorage',JSON.stringify(obj))
        },
        // 
        dataFun() {
            this.pageSign = 0
            let data = {
                page:this.page,
                platform:this.platform,
                status: this.status
            }
            this.api.appmanage.appListData(data).then((res) => {
                this.dataOptions = res.data.data
                this.count = res.data.count
            });
        },
        parentFun(key, value, n, s) {
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
            }else if(n==3){//编辑
                this.id = key
                this.$router.push({path:'/editapp?id='+this.id+'&platform='+this.platform+'&status='+s})
                var obj = {
                    isRecycle: this.isRecycle,
                    status: this.status,
                    platform:this.platform
                }
                localStorage.setItem('appStorage',JSON.stringify(obj))
            }else if(n==4){//删除
                this.deleteStatus = n
                this.id = key
                this.dialogVisible =true
                // this.deleteFun()
            }else if(n==5){
                this.deleteStatus = n
                this.multipleSelection = key
                this.nameArr = value
            }else if(n==6){//还原
                this.deleteStatus = n
                this.huanyuanFun(key)
            }else if(n==7){//彻底删除
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
            this.api.appmanage.realDeleteApp(data).then((res) => {
                this.$message({
                    message: ''+res.data.msg,
                    type: 'success'
                });
                this.$router.push('/appList')
                this.isRecycle = true
                this.status = 0
                if(this.platform == 'IOS'){
                    this.activeName = 'first'
                }else{
                    this.activeName = 'second'
                }
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
            this.api.appmanage.recoveryApp(data).then((res) => {
                this.$message({
                    message: ''+res.data.msg,
                    type: 'success'
                });
                this.$router.push('/appList')
                this.isRecycle = true
                this.status = 0
                if(this.platform == 'IOS'){
                    this.activeName = 'first'
                }else{
                    this.activeName = 'second'
                }
                this.dataFun()
            });
        },
        //根据状态筛选
        filterGetStatusList() {
            this.pageSign = 1
            let data = {'page': this.page, status: this.filterVal, platform:this.platform}
            this.api.appmanage.appListData(data).then((res) => {
                this.dataOptions = res.data.data
                this.count = res.data.count
            });
        },
        // 排序
        sortDataFun() {
            this.pageSign = 2
            let data = {page: this.page, platform:this.platform, sort: this.sortVal, order:this.order,status: this.status}
             this.api.appmanage.appListData(data).then((res) => {
                this.dataOptions = res.data.data
                this.count = res.data.count
            });
        },
        seachFun() {
            this.pageSign = 3
            let data = {page: this.page, keyword: this.soVal,platform:this.platform,status: this.status}
             this.api.appmanage.appListData(data).then((res) => {
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
        toAdd(n) {
            this.$router.push({path:'/addapp?platform='+n})
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
            }else{//批量还原
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
            this.api.appmanage.deleteApp(data).then((res) => {
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
            var obj = {
                isRecycle: this.isRecycle,
                status: this.status,
                platform:this.platform
            }
            localStorage.setItem('appStorage',JSON.stringify(obj))
            this.dataFun()
        },
        goBack() {
            this.isRecycle = false
            this.status = 1
            var obj = {
                isRecycle: this.isRecycle,
                status: this.status,
                platform:this.platform
            }
            localStorage.setItem('appStorage',JSON.stringify(obj))
            if(this.platform == 'IOS'){
                this.activeName = 'first'
            }else{
                this.activeName = 'second'
            }
            this.dataFun()
        }
    },
    destroyed() {
        var path = window.location.href
        // console.log('www', this.platform)
        // console.log('rrr', path)
        if(!(path.indexOf("editapp") != -1)){
            var obj = {
                isRecycle: false,
                status: 1,
                platform:'IOS'
            }
            localStorage.setItem('appStorage',JSON.stringify(obj))
            // console.log(8888888)
        }else{
            return false;
        }
        if(!(path.indexOf("addapp") != -1)){
            var obj = {
                isRecycle: false,
                status: 1,
                platform:'IOS'
            }
            localStorage.setItem('appStorage',JSON.stringify(obj))
            // console.log(9999)
        }else{
            return false;
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
  .add-box{ margin: 0 0 14px; display: flex;}
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