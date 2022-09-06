<template>
    <div>
        <el-table
        ref="multipleTable"
        :data="dataOptions"
        stripe
        style="width: 100%"
        @filter-change="filterTagTable"
        @selection-change="handleSelectionChange"
        @sort-change="sortFilterFun">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="feedback_id"
                label="ID"
                width="60"
                sortable="custom">
            </el-table-column>
            <el-table-column prop=""
                       label="反馈者"
                       width="280">
                <template slot-scope="scope">
                    <div v-if="scope.row.user"
                        style="display: flex; align-items: center"
                        @click="userInformation(scope.row)">
                        <el-image style="width: 30px; height: 30px; border-radius: 100%"
                                fit="fill"
                                :src="scope.row.user.avatar"></el-image>
                        <div style="flex: 1; margin-left: 5px">
                        {{ scope.row.user.nickname }}（<span v-if="scope.row.user.gender == 1">男</span><span v-else>女</span>/{{ scope.row.user.age }}岁）
                        <div style="color:rgb(88, 156, 241)">ID: {{scope.row.user.user_id}}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="desc"
                label="反馈描述"
                width="350">
                <template slot-scope="scope">
                <div style="display: flex; align-items: center">
                    <div>
                    <el-tooltip class="item"
                                effect="dark"
                                :content="scope.row.desc"
                                placement="bottom"
                                :disabled="getShow(scope.row.desc)">
                        <div :title="getAgent(scope.row.desc)">
                        {{ getAgent(scope.row.desc) }}
                        </div>
                    </el-tooltip>
                    </div>
                </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="icon"
                label="反馈图片"
                width="350">
                <template slot-scope="scope">
                    <div style="display: flex; align-items: center">
                        <div>
                        <span v-for="(item, index) in scope.row.pics"
                                :key="index"
                                @click="showImglist(scope.row.pics, index)">
                            <el-image style="width: 76px; height: 76px; margin-left: 10px"
                                    fit="cover"
                                    :src="item.pic_path"></el-image>
                        </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间"
                width="200"
                sortable="custom">
            </el-table-column>
            <!-- <el-table-column
                prop="status"
                label="状态"
                :filter-multiple="false"
                :filters="statusArr"
                filter-placement="bottom-end"
                :column-key=" 'status' ">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">未处理</span>
                    <span v-if="scope.row.status == 1">已处理</span>
                </template>
            </el-table-column> -->
            <el-table-column
                fixed="right"
                label="操作" align='right'>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status == 0" @click="handleClick(scope.row)" type="text" size="small">处理</el-button>
                    <el-button v-if="scope.row.status == 1" type="text" size="small" disabled>已处理</el-button>
                    <!-- <el-button v-if="status == 1" @click="delClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button v-if="status == 0" @click="restoreFun(scope.row)" type="text" size="small">还原</el-button>
                    <el-button v-if="status == 0" @click="realDeleteFun(scope.row)" type="text" size="small">彻底删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="大图预览"
               :visible.sync="dialogVisible"
               width="50%">
        <template v-if="dialogVisible">
            <el-carousel :autoplay="false"
                        indicator-position="none"
                        arrow="always"
                        height="600px"
                        :initial-index="imgIndex">
            <el-carousel-item v-for="(item, index) in picData"
                                :key="index">
                <div class="imgbox">
                <el-image style="height: 600px; width: auto"
                            fit="contain"
                            :src="item.pic_path"></el-image>
                </div>
            </el-carousel-item>
            </el-carousel>
        </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'',
    props:{
        dataOptions:Array,
        status:String
    },
    data() {
        return {
            multipleSelection:[],
            nameArr:[],
            statusArr:[{text:'未处理', value:'0'},{text:'已处理', value:'1'}],
            sortVal:'',
            sortStatus:false,
            order:'desc',
            dialogVisible: false,
            picData: [],
            imgIndex: 0
        }
    },
    methods:{
        handleSelectionChange(val) {
        var arr=[]
        this.nameArr = []
        for(var i=0; i<val.length; i++){
            arr.push(val[i].feedback_id)
            this.nameArr.push(val[i].title)
        }
        this.multipleSelection = arr
        // arr = Array.from(new Set(arr))
        this.nameArr = Array.from(new Set(this.nameArr))
        // this.multipleSelection = arr.join(',')
        this.$emit('childrenFun', this.multipleSelection, this.nameArr, 5)
        },
        //table筛选
        filterTagTable(filters){
        // console.log(filters)
        this.filterMethod(filters)
        },
        //table筛选
        filterMethod(val) {
            var key = []
            var value = []
            for (var i in val) {
                key.push(i)
                value.push(val[i])
            }
            key = key.join(',')
            value = value.join(',')
            this.$emit('childrenFun', key, value,1)
        },
        //table排序
        sortMethod(val) {
            this.sortVal = val
            this.sortStatus = !this.sortStatus
            if(this.sortStatus){
                this.order='asc'//正序
            }else{
                this.order='desc'//倒序
            }
            //接口逻辑
            this.$emit('childrenFun', this.sortVal, this.order,2)
        },
        //table排序
        sortFilterFun(column) {
            this.sortMethod(column.prop)
        },
        handleClick(row) {//处理
            this.$emit('childrenFun', row.feedback_id, '',3)
        },
        delClick(row) {
            if(row.status == 1){
                this.$emit('childrenFun', row.feedback_id, '',4)
            }else{
                this.$message({
                    message: '该数据已是禁用状态了！',
                    type: 'warning'
                });
            }
            
        },
        restoreFun(row) {
            this.$emit('childrenFun', row.feedback_id, '',6)
        },
        realDeleteFun(row) {
            this.$emit('childrenFun', row.feedback_id, '',7)
        },
        showImglist (row, index) {
        this.dialogVisible = true;
        this.picData = row;
        this.imgIndex = index;
        },
        // 内容过长，鼠标移入显示全部
        getAgent (v) {
        return v.length > 20 ? v.substring(0, 20) + " ..." : v;
        },
        getShow (v) {
        return v.length > 20 ? false : true;
        },
        userInformation (row) {
        this.$emit("childrenFun", row.user.user_id, "", 8);
        },
    }
}
</script>

<style scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>