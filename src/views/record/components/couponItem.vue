<template>
<div class="add-box">
    <div class="f-box1">
        <div class="so-nav">
            <div class="zx-box1" style="display:flex">
                <span class="queue-s01">优惠券</span>
                <el-input v-model="keyword" placeholder="搜索优惠券名称" type="text"></el-input>
            </div>
        </div>
        <div class="so-nav">
            <div class="zx-box1" style="margin-left:20px">
                <span class="queue-s01">领取/使用</span>
                <el-select class="se-nav" v-model="type" filterable placeholder="请选择">
                    <el-option
                        v-for="item in typeArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="zx-box1" style="margin-left:20px">
                <span class="queue-s01">状态</span>
                <el-select class="se-nav" v-model="status" filterable placeholder="请选择">
                    <el-option
                        v-for="item in statusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="timeBox">
            <div style="display:flex; margin-top:20px">
                <span class="s01">时间</span>
                <div style="margin-left:10px">
                    <el-radio-group v-model="charts_type" @change="filtrateFun(2)">
                        <el-radio :label="1">24小时</el-radio>
                        <el-radio :label="2">7天</el-radio>
                        <el-radio :label="3">30天</el-radio>
                        <el-radio :label="4">自定义时间</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="so-box1" style="display:flex" v-show="charts_type == 4">
                <span class="s01">自定义时间</span>
                <div style="flex:1">
                    <el-date-picker class="datePicker"
                        v-model="value2"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        @change="dateChange">
                    </el-date-picker>
                </div>
            </div>
        </div>
        
    </div>
    <div class="btnBox">
        <span><el-button class="sosuo" type="primary" @click="filtrateFun(0)">筛选</el-button></span>
        <span style="margin-left:10px"><el-button class="sosuo" type="primary" @click="clearFun(0)">清空条件</el-button></span>
        <!-- <span style="margin-left:10px"><el-button class="sosuo" type="primary" @click="filtrateFun(1)">导出Excle</el-button></span> -->
    </div>        
</div>
</template>

<script>
export default {
    name:"filterItem",
    props:{
        pickerOptions: Object,
        activeName:String
    },
    data() {
        return{
            keyword:'',
            value2: '',
            start:'',
            end:'',
            status:null,
            charts_type:1,
            type:null,
            typeArr:[{
                value:null,
                label:'全部'
            },{
                value: 1,
                label:'领取'
            },{
                value: 2,
                label:'使用'
            }],
            statusArr:[{
                value:null,
                label:'全部'
            },{
                value:1,
                label:'未使用'
            },{
                value:2,
                label:'已使用'
            },{
                value:3,
                label:'已失效'
            }]
        }
    },
    mounted(){
        // this.getShopType()
    },
    methods:{
        //日期选择
        dateChange(val) {
          this.start = val[0]
          this.end = val[1]
          this.filtrateFun(3)
        },
        //类别筛选
        showClass(val) {
            // console.log(this.bill_status)
        },
        filtrateFun(n) {
            if(n!=2){
                this.$emit('filtrateFun', this.keyword, this.type, this.status, this.start, this.end, this.charts_type, n)
            }else{
                if(this.charts_type != 4){
                    this.$emit('filtrateFun', this.keyword, this.type, this.status, this.start, this.end, this.charts_type, n)
                }
            }
        },
        clearFun(n) {
            this.keyword = ''
            this.type = ''
            this.start = ''
            this.end = ''
            this.status = ''
            this.charts_type = 1
            this.value2 = ''
            this.$emit('filtrateFun', this.keyword, this.type, this.status, this.start, this.end, this.charts_type, n)
        },
        getShopType() {
          let data = {page_size: 10000}
            this.api.shop.getShopType(data).then((res) => {
                let itemArr = [];
                res.data.data.map(item => {
                    itemArr.push({
                        value: item.type_id,
                        label: item.type_name
                    });
                });
                this.shoptypeArr = itemArr
                this.shoptypeArr = this.shoptypeArr.slice()
                this.shoptypeArr.unshift({
                    value:'',
                    label:'全部'
                })
                // console.log(res.data)
            });
        },
    }
}
</script>
<style lang="scss" scoped>
 .add-box{ display: flex; margin: 10px 0; align-items: center;
    .selectBox{ 
    float: left; 
    margin: 15px 0 15px 20px; 
    width: 400px;
    .se-nav{ 
        margin: 0 8px; 
        width: 334px;
    }
    }
    .zx-box1{
        align-items: center;
        .queue-s01{
            width: 110px;
            text-align: right;
            margin-right: 8px;
        }
    }
    .btnBox{ 
        margin-left: 20px;
        .sosuo{
            float: left;
            background-color: #F4F4F4 !important; 
            border: 1px solid #CECECE;
            color: #0A0A0A;
            width: 90px; margin-right: 10px;
        }
    }
}
.so-nav{ 
    display: flex;
    margin-bottom: 15px;
}
.so-box1{
    display: flex;
    position: relative;
    margin: 10px 0 0;
    .s01{
        
        line-height: 40px;
        text-align: right;
        margin-right: 8px;
    }
    .sosuo{ margin-left: 10px;float: left;
        background-color: #F4F4F4 !important; 
        border: 1px solid #CECECE;
        color: #0A0A0A;
        width: 90px;
        }
    .so-ipt{ border-color: #CECECE;float: left; width: 327px;}
    .el-input__suffix{ color: #000 !important; font-weight: bold;}
    .datePicker{
        width: 426px;
    }
}
</style>