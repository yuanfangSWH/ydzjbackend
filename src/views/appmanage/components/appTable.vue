<template>
    <div>
        <!-- @filter-change="filterTagTable" -->
        <el-table
        ref="multipleTable"
        :data="dataOptions"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sortFilterFun">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="60"
                sortable="custom">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="version"
                label="版本号"
                width="120"
                sortable="custom">
            </el-table-column>
            <el-table-column
                prop="summary"
                label="更新内容">
            </el-table-column>
            <el-table-column
                prop="down_count"
                label="下载量"
                width="100"
                sortable="custom">
            </el-table-column>
            <el-table-column
                prop="coerce_update"
                label="强制更新"
                width="140"
                sortable="custom">
                <template slot-scope="scope">
                    <span v-if="scope.row.coerce_update == 0">否</span>
                    <span v-if="scope.row.coerce_update == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="prompt_update"
                label="提示更新"
                width="140"
                sortable="custom">
                <template slot-scope="scope">
                    <span v-if="scope.row.prompt_update == 0">否</span>
                    <span v-if="scope.row.prompt_update == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="platform == 'IOS'"
                prop="in_review"
                label="审核中"
                width="140">
                <template slot-scope="scope">
                    <span v-if="scope.row.in_review == 0">否</span>
                    <span v-if="scope.row.in_review == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="发布时间"
                width="180"
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
                    <span v-if="scope.row.status == 0">禁用</span>
                    <span v-if="scope.row.status == 1">启用</span>
                </template>
            </el-table-column> -->
            <el-table-column
                fixed="right"
                label="操作" align='right'>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row, status)" type="text" size="small">编辑</el-button>
                    <el-button v-if="status == 1" @click="delClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button v-if="status == 0" @click="restoreFun(scope.row)" type="text" size="small">还原</el-button>
                    <el-button v-if="status == 0" @click="realDeleteFun(scope.row)" type="text" size="small">彻底删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'',
    props:{
        dataOptions:Array,
        status:Number,
        platform:String
    },
    data() {
        return {
            multipleSelection:[],
            nameArr:[],
            statusArr:[{text:'禁用', value:'0'},{text:'启用', value:'1'}],
            sortVal:'',
            sortStatus:false,
            order:'desc'
        }
    },
    methods:{
        handleSelectionChange(val) {
            // console.log('val====',val)
        var arr=[]
        this.nameArr = []
        for(var i=0; i<val.length; i++){
            arr.push(val[i].id)
            this.nameArr.push(val[i].name)
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
        handleClick(row, status) {
            this.$emit('childrenFun', row.id, '', 3, status)
        },
        delClick(row) {
            this.$emit('childrenFun', row.id, '',4)
        },
        // 还原
        restoreFun(row) {
            this.$emit('childrenFun', row.id, '',6)
        },
        // 彻底删除
        realDeleteFun(row) {
            this.$emit('childrenFun', row.id, '',7)
        }
    }
}
</script>

<style scoped>

</style>