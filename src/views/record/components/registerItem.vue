<template>
<div class="add-box">
    <div class="f-box1">
        <div class="so-nav">
            <div class="zx-box1">
                <span class="queue-s01">城市</span>
                <div class="se-nav"><citySelectex ref="citySelect" :isArea='isArea' :isAll="isAll" @setCityAreaName="setCityAreaName" /></div>
                
            </div>
        </div>
        <div class="so-nav">
            <div class="zx-box1">
                <span class="queue-s01">渠道</span>
                <el-select class="se-nav" v-model="channel" filterable placeholder="请选择" @change="channelChange">
                <el-option
                    v-for="item in channelArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
            </div>
            <div class="zx-box1" style="margin-left:20px">
                <span class="queue-s01">版本</span>
                <el-select class="se-nav" v-model="app_version" filterable placeholder="请选择">
                    <el-option
                        v-for="item in versionArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="zx-box1" style="margin-left:20px">
                <span class="queue-s01">平台</span>
                <el-select class="se-nav" v-model="os" filterable placeholder="请选择">
                    <el-option
                        v-for="item in osArr"
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
        <div class="so-nav">
            <div class="zx-box1">
                <span class="queue-s01">是否裂变</span>
                <div style="margin-left:10px">
                    <el-radio-group v-model="is_children" @change="filtrateFun(3)">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
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
import citySelectex from "@/components/citySelectEX";
export default {
    components:{citySelectex},
    name:"registerItem",
    props:{
        pickerOptions: Object,
        activeName:String
    },
    data() {
        return{
            isAll:true,
            isArea:false,
            charts_type: 1,
            value2: '',
            start:'',
            end:'',
            province_id:0,
            city_id:0,
            app_version:'',
            os:'',
            is_children:1,
            channel:'',
            osArr:[{
                value:'',
                label:'全部'
            },{
                value:'IOS',
                label:'IOS'
            },{
                value:'ANDROID',
                label:'ANDROID'
            }],
            versionArr:[],
            channelArr:[{
                value:'',
                label:'全部'
            },{
                value:'AppStore',
                label:'AppStore'
            },{
                value:'应用宝',
                label:'应用宝'
            },{
                value:'华为',
                label:'华为'
            },{
                value:'OPPO',
                label:'OPPO'
            },{
                value:'VIVO',
                label:'VIVO'
            },{
                value:'小米',
                label:'小米'
            },{
                value:'360',
                label:'360'
            },{
                value:'夜店之家',
                label:'夜店之家'
            },{
                value:'ydzj',
                label:'ydzj'
            }]
        }
    },
    created(){
        this.versionList()
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
        channelChange() {
            
        },
        filtrateFun(n) {
            if(n!=2){
                this.$emit('filtrateFun',this.province_id, this.city_id, this.app_version, this.os, this.is_children, this.channel, this.start, this.end, this.charts_type, n)
            }else{
                if(this.charts_type != 4){
                    this.$emit('filtrateFun', this.province_id, this.city_id, this.app_version, this.os, this.is_children, this.channel, this.start, this.end, this.charts_type, n)
                }
            }
        },
        clearFun(n) {
            this.start = ''
            this.end = ''
            this.charts_type = 1
            this.province_id=0
            this.city_id=0
            this.app_version=''
            this.os=''
            this.is_children=1
            this.channel=''
            this.value2 = ''
            this.$emit('filtrateFun', this.province_id, this.city_id, this.app_version, this.os, this.is_children, this.channel, this.start, this.end, this.charts_type, n)
            this.$refs.citySelect.cancelFun();//清空城市选择
        },
        // 获取子组件返回的ID
        setCityAreaName(areaName) {
            console.info(areaName);
            this.province_id = areaName.province;
            this.city_id = areaName.city;
            // if (!this.updateDialog) {
            //   this.mapKeyword = areaName.mapKeyword;
            // }
        },
        versionList() {
          let data = {page_size: 10000, status:1, platform:'IOS'}
            this.api.appmanage.appListData(data).then((res) => {
                let itemArr = [];
                res.data.data.map(item => {
                    itemArr.push({
                        value: item.ver,
                        label: item.ver
                    });
                });
                this.versionArr = itemArr
                this.versionArr = this.versionArr.slice()
                this.versionArr.unshift({
                    value:'',
                    label:'全部'
                })
                // console.log(itemArr)
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
        align-items: center; display: flex;
        .queue-s01{
            // width: 110px;
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
.timeBox{ margin-bottom: 20px;}
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