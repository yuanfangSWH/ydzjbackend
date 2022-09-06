<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <div>
        <div>
          <span class="t-s01">订单号：</span>
          <el-input style="width: 350px; margin-right: 10px"
                    placeholder="搜索订单号"
                    v-model="order_no"
                    clearable></el-input>
        </div>
        <div style="margin: 10px 0">
          <span class="t-s01">用户：</span>
          <el-input style="width: 350px; margin-right: 10px"
                    placeholder="搜索订用户ID/手机号"
                    v-model="user"
                    clearable></el-input>
        </div>
      </div>
      <div style="display: flex; height: 40px">
        <span class="t-s01 t-s02">提交预约时间：</span>
        <el-date-picker v-model="start_time"
                        type="datetime"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm">
        </el-date-picker>
        <div class="rucwz">-</div>
        <el-date-picker style="margin-right: 10px"
                        v-model="end_time"
                        type="datetime"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm">
        </el-date-picker>
      </div>
      <div>
        <el-button class="sosuo"
                   type="primary"
                   @click="screening">筛选</el-button>
        <el-button class="sosuo"
                   type="info"
                   @click="resetData">清空条件</el-button>
      </div>
    </div>
    <div class="shanxdiv">
      <el-tabs v-model="activeName"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="全部"
                     name="qb"></el-tab-pane>
        <el-tab-pane label="预约中"
                     name="yyz"></el-tab-pane>
        <el-tab-pane label="已预约"
                     name="yyy"></el-tab-pane>
        <el-tab-pane label="已完成"
                     name="ywc"></el-tab-pane>
        <el-tab-pane label="退款中"
                     name="tkz"></el-tab-pane>
        <el-tab-pane label="用户取消"
                     name="yqx"></el-tab-pane>
        <el-tab-pane label="商家取消"
                     name="sjqx"></el-tab-pane>
        <el-tab-pane label="拒绝退款"
                     name="yjj"></el-tab-pane>
      </el-tabs>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%">
      <!-- @filter-change="filterTagTable" -->
      <el-table-column prop="order_no"
                       label="订单号" />
      <el-table-column label="用户"
                       width="240">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               @click="userInformation(scope.row.user_info)">
            <el-image class="ustrimg"
                      :src="scope.row.user_info.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip class="item"
                            effect="dark"
                            :content="scope.row.user_info.nickname"
                            placement="bottom"
                            :disabled="getShow2(scope.row.user_info.nickname)">
                  <div :title="getAgent2(scope.row.user_info.nickname)">
                    {{ getAgent2(scope.row.user_info.nickname) }}（<span v-if="scope.row.user_info.gender == 0">未知</span>
                    <span v-else-if="scope.row.user_info.gender == 1">男</span>
                    <span v-else-if="scope.row.user_info.gender == 2">女</span>/{{ scope.row.user_info.age }}岁）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商家信息"
                       width="240">
        <template slot-scope="scope">
          <el-tooltip class="item"
                      effect="dark"
                      :content="scope.row.shop_info.name"
                      placement="bottom"
                      :disabled="getShow(scope.row.shop_info.name)">
            <div :title="getAgent(scope.row.shop_info.name)">
              {{ getAgent(scope.row.shop_info.name)
              }}<span v-if="scope.row.shop_info.phone">（{{ scope.row.shop_info.phone }}）</span>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="订座信息">
        <template slot-scope="scope">
          {{ scope.row.place_type_info.name }}（{{
            scope.row.place_type_info.min_people_num
          }}-{{ scope.row.place_type_info.max_people_num }}人）
        </template>
      </el-table-column>
      <el-table-column prop="total_deposit"
                       label="预订金额">
        <template slot-scope="scope">
          {{ CalculateData(scope.row.total_deposit, "/") }}
        </template>
      </el-table-column>
      <el-table-column prop="reserve_time"
                       label="预订时间" />
      <el-table-column prop="name"
                       label="预约用户" />
      <el-table-column prop="phone"
                       label="用户电话" />
      <el-table-column prop="create_time"
                       label="提交时间" />
      <el-table-column label="状态">
        <!-- :filter-multiple="false"
      :filters="statusArr"
      filter-placement="bottom-end"
      :column-key="'status'" -->
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">待支付</span>
          <span v-else-if="scope.row.status == 2">用户取消订单</span>
          <span v-else-if="scope.row.status == 3">已支付</span>
          <span v-else-if="scope.row.status == 4">已预订</span>
          <span v-else-if="scope.row.status == 5">商家取消
            <!-- <span style="color: #f25429"
              v-if="scope.row.confirm_cancel == 1"
              >（已确认取消）</span> -->
          </span>
          <span v-else-if="scope.row.status == 6">用户申请退款中</span>
          <span v-else-if="scope.row.status == 7">消费中</span>
          <span v-else-if="scope.row.status == 8">已结账</span>
          <span v-else-if="scope.row.status == 9">退款成功</span>
          <span v-else-if="scope.row.status == 10">用户退款失败</span>
          <span v-else-if="scope.row.status == 11">商家同意退款</span>
          <span v-else-if="scope.row.status == 12">免支付</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="center"
                       label="操作">
        <template slot-scope="scope">
          <div style="width: 80%; display: flex"
               v-show="scope.row.status == 3 || scope.row.status == 12">
            <div class="jump1"
                 @click="yuetkdk(JSON.parse(JSON.stringify(scope.row)))">
              确认订单
            </div>
            <div class="jump2"
                 @click="qxyuF(scope.row.reserve_id)">
              取消订单
            </div>
          </div>
          <div style="width: 80%; display: flex"
               v-show="
              scope.row.status == 2 ||
              scope.row.status == 5 ||
              scope.row.status == 8 ||
              scope.row.status == 10
            ">
            <div class="jump1"
                 @click="xiangqTK(JSON.parse(JSON.stringify(scope.row)))">
              查看详情
            </div>
          </div>
          <div style="width: 80%; display: flex"
               v-show="scope.row.status == 4">
            <div class="jump1"
                 @click="hexiaoOrder(JSON.parse(JSON.stringify(scope.row)))">
              核销订单
            </div>
          </div>
          <div style="width: 80%; display: flex"
               v-show="scope.row.status == 6">
            <div class="jump1"
                 @click="tuishenTK(JSON.parse(JSON.stringify(scope.row)))">
              退款审核
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     :page-sizes="[10, 20, 50, 100]"
                     background
                     layout="sizes,prev, pager, next,jumper"
                     :total="total"></el-pagination>
    </div>
    <!-- 预约确认-->
    <el-dialog title="预约确认"
               :visible.sync="ydxq"
               destroy-on-close
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               width="30%">
      <el-form label-width="160px"
               class="updateArea"
               style="height: 60vh; overflow: auto">
        <el-form-item label="预约状态">
          <span v-if="detailsData.status == 1">待支付</span>
          <span v-else-if="detailsData.status == 2">用户取消订单</span>
          <span v-else-if="detailsData.status == 3">已支付</span>
          <span v-else-if="detailsData.status == 4">已预订</span>
          <span v-else-if="detailsData.status == 5">商家取消</span>
          <span v-else-if="detailsData.status == 6">用户申请退款中</span>
          <span v-else-if="detailsData.status == 7">消费中</span>
          <span v-else-if="detailsData.status == 8">已结账</span>
          <span v-else-if="detailsData.status == 9">退款成功</span>
          <span v-else-if="detailsData.status == 10">用户退款失败</span>
          <span v-else-if="detailsData.status == 11">商家同意退款</span>
          <span v-else-if="detailsData.status == 12">免支付</span>
        </el-form-item>
        <el-form-item label="订单号码">
          {{ detailsData.order_no }}
        </el-form-item>
        <el-form-item label="店铺信息"
                      v-if="detailsData.shop_info">
          {{ detailsData.shop_info.name }}
          <span v-if="detailsData.shop_info.phone">（{{ detailsData.shop_info.phone }}）</span>
        </el-form-item>
        <el-form-item label="店铺地址"
                      v-if="detailsData.shop_info">
          {{ detailsData.shop_info.address }}
        </el-form-item>
        <el-form-item label="订座信息">
          <el-select v-model="currenItem.place_type_id"
                     placeholder="请选择订座">
            <el-option v-for="item in reservationData"
                       :key="item.type_id"
                       :label="
                item.name +
                '（' +
                item.min_people_num +
                '-' +
                item.max_people_num +
                '）'
              "
                       :value="item.type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座位套餐">
          {{ getGroupInfo(detailsData) }}
        </el-form-item>
        <el-form-item label="优惠券">
          {{
            detailsData.coupon && detailsData.coupon.name
              ? detailsData.coupon.name
              : "--"
          }}
        </el-form-item>
        <el-form-item label="预留位置">
          <!-- 莉莉说预留位置改为手动输入 -->
          <!-- <el-input
            v-if="!zhuoweiData || zhuoweiData == ''"
            style="width: 220px"
            placeholder="请输入内容"
            v-model="currenItem.place_name"
            clearable
          >
          </el-input>
          <el-select
            v-else
            v-model="currenItem.place_id"
            placeholder="请选择位置"
          >
            <el-option
              v-for="item in zhuoweiData"
              :key="item.place_id"
              :label="item.place_name"
              :value="item.place_id"
            ></el-option>
          </el-select> -->
          <el-input style="width: 220px"
                    placeholder="请输入座位"
                    v-model="currenItem.place_name"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="最低消费"
                      v-if="detailsData.place_type_info">
          {{ CalculateData(detailsData.place_type_info.basic_price, "/") }}元
        </el-form-item>
        <el-form-item label="预约金额">
          {{ CalculateData(detailsData.total_deposit, "/") }}元
        </el-form-item>
        <el-form-item label="预约时间">
          <el-date-picker v-model="currenItem.reserve_time"
                          type="datetime"
                          placeholder="选择预约时间"
                          value-format="yyyy-MM-dd HH:mm"
                          format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约用户">
          {{ detailsData.name }}
          <span v-if="detailsData.gender == 1">(男)</span>
          <span v-else>(女)</span>
        </el-form-item>
        <el-form-item label="用户电话">
          {{ detailsData.phone }}
        </el-form-item>
        <el-form-item label="提交预约时间">
          {{ detailsData.create_time }}
        </el-form-item>
        <el-form-item label="用户备注">
          {{ detailsData.remark }}
        </el-form-item>
        <el-form-item label="商家备注">
          <el-input type="textarea"
                    autosize
                    placeholder="商家备注内容"
                    v-model="currenItem.merchant_remark">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="qryuF()">确认预约信息</el-button>
        <el-button @click="cancelFun">取 消</el-button>
        <!-- ydxq = false -->
      </span>
    </el-dialog>
    <!-- 核销订单-->
    <el-dialog title="核销订单"
               :visible.sync="hexiao"
               destroy-on-close
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               width="30%">
      <el-form label-width="160px"
               class="updateArea"
               style="height: 60vh; overflow: auto">
        <el-form-item label="预约状态">
          <span v-if="detailsData.status == 1">待支付</span>
          <span v-else-if="detailsData.status == 2">用户取消订单</span>
          <span v-else-if="detailsData.status == 3">已支付</span>
          <span v-else-if="detailsData.status == 4">已预订</span>
          <span v-else-if="detailsData.status == 5">商家取消</span>
          <span v-else-if="detailsData.status == 6">用户申请退款中</span>
          <span v-else-if="detailsData.status == 7">消费中</span>
          <span v-else-if="detailsData.status == 8">已结账</span>
          <span v-else-if="detailsData.status == 9">退款成功</span>
          <span v-else-if="detailsData.status == 10">用户退款失败</span>
          <span v-else-if="detailsData.status == 11">商家同意退款</span>
          <span v-else-if="detailsData.status == 12">免支付</span>
        </el-form-item>
        <el-form-item label="操作人员">
          {{ detailsData.staff_name ? detailsData.staff_name : "--" }}
        </el-form-item>
        <el-form-item label="订单操作时间">
          {{ detailsData.modify_time ? detailsData.modify_time : "--" }}
        </el-form-item>
        <el-form-item label="订单号码">
          {{ detailsData.order_no }}
        </el-form-item>
        <el-form-item label="店铺信息"
                      v-if="detailsData.shop_info">
          {{ detailsData.shop_info.name }}
          <span v-if="detailsData.shop_info.phone">（{{ detailsData.shop_info.phone }}）</span>
        </el-form-item>
        <el-form-item label="店铺地址"
                      v-if="detailsData.shop_info">
          {{ detailsData.shop_info.address }}
        </el-form-item>
        <el-form-item label="订座信息">
          {{
            detailsData.place_type_info.name
              ? detailsData.place_type_info.name
              : "--"
          }}
          {{
            detailsData.place_type_info.min_people_num &&
            detailsData.place_type_info.max_people_num
              ? "(" +
                detailsData.place_type_info.min_people_num +
                "-" +
                detailsData.place_type_info.min_people_num +
                "人)"
              : "--"
          }}
        </el-form-item>
        <el-form-item label="座位套餐">
          {{ getGroupInfo(detailsData) }}
        </el-form-item>
        <el-form-item label="优惠券">
          {{
            detailsData.coupon && detailsData.coupon.name
              ? detailsData.coupon.name
              : "--"
          }}
        </el-form-item>
        <el-form-item label="预留位置">
          {{ detailsData.place_name }}
        </el-form-item>
        <el-form-item label="场地费用"
                      v-if="detailsData.place_type_info">
          {{ CalculateData(detailsData.place_type_info.basic_price, "/") }}元
        </el-form-item>
        <el-form-item label="预约金额">
          {{ CalculateData(detailsData.total_deposit, "/") }}元
        </el-form-item>
        <el-form-item label="预约时间">
          {{ detailsData.reserve_time }}
        </el-form-item>
        <el-form-item label="预约用户">
          {{ detailsData.name }}
          <span v-if="detailsData.gender == 1">(男)</span>
          <span v-else>(女)</span>
        </el-form-item>
        <el-form-item label="用户电话">
          {{ detailsData.phone }}
        </el-form-item>
        <el-form-item label="提交预约时间">
          {{ detailsData.create_time }}
        </el-form-item>
        <el-form-item label="用户备注">
          {{ detailsData.remark }}
        </el-form-item>
        <el-form-item label="商家备注">
          {{ detailsData.merchant_remark }}
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="arrived(1)">已到店</el-button>
        <el-button @click="arrived(0)">未到店</el-button>
        <!-- ydxq = false -->
      </span>
      <div style="color: #888">
        注：确定已到店后，奖励10积分给用户，用户APP端显示已完成且可以评价商家；确定未到店后，没有奖励，用户APP端显示预定失败。
      </div>
    </el-dialog>
    <!-- 预约详情-->
    <el-dialog title="预约详情"
               :visible.sync="xianqin"
               destroy-on-close
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               width="30%">
      <el-form label-width="160px"
               class="updateArea"
               style="height: 60vh; overflow: auto">
        <el-form-item label="预约状态">
          <span v-if="detailsData.status == 1">待支付</span>
          <span v-else-if="detailsData.status == 2">用户取消订单</span>
          <span v-else-if="detailsData.status == 3">已支付</span>
          <span v-else-if="detailsData.status == 4">已预订</span>
          <span v-else-if="detailsData.status == 5">商家取消</span>
          <span v-else-if="detailsData.status == 6">用户申请退款中</span>
          <span v-else-if="detailsData.status == 7">消费中</span>
          <span v-else-if="detailsData.status == 8">已结账</span>
          <span v-else-if="detailsData.status == 9">退款成功</span>
          <span v-else-if="detailsData.status == 10">用户退款失败</span>
          <span v-else-if="detailsData.status == 11">商家同意退款</span>
          <span v-else-if="detailsData.status == 12">免支付</span>
        </el-form-item>
        <el-form-item label="操作人员">
          {{ detailsData.admin_name }}
        </el-form-item>
        <el-form-item label="订单操作时间">
          {{ detailsData.modify_time }}
        </el-form-item>
        <el-form-item label="订单号码">
          {{ detailsData.order_no }}
        </el-form-item>
        <el-form-item label="店铺信息"
                      v-if="detailsData.shop_info">
          {{ detailsData.shop_info.address }}（{{
            detailsData.shop_info.phone
          }}）
        </el-form-item>
        <el-form-item label="订座信息"
                      v-if="detailsData.place_type_info">
          {{ detailsData.place_type_info.name }}（{{
            detailsData.place_type_info.min_people_num
          }}-{{ detailsData.place_type_info.max_people_num }}人）
        </el-form-item>
        <el-form-item label="座位套餐">
          {{ getGroupInfo(detailsData) }}
        </el-form-item>
        <el-form-item label="优惠券">
          {{
            detailsData.coupon && detailsData.coupon.name
              ? detailsData.coupon.name
              : "--"
          }}
        </el-form-item>
        <el-form-item label="预留位置">
          {{ detailsData.place_name }}
        </el-form-item>
        <el-form-item label="最低消费"
                      v-if="detailsData.place_type_info">
          {{ CalculateData(detailsData.place_type_info.basic_price, "/") }}元
        </el-form-item>
        <el-form-item label="预约金额">
          {{ CalculateData(detailsData.total_deposit, "/") }}元
        </el-form-item>
        <el-form-item label="预约时间">
          {{ detailsData.reserve_time }}
        </el-form-item>
        <el-form-item label="预约用户">
          {{ detailsData.name }}
          <span v-if="detailsData.gender == 1">(男)</span>
          <span v-else>(女)</span>
        </el-form-item>
        <el-form-item label="用户电话">
          {{ detailsData.phone }}
        </el-form-item>
        <el-form-item label="提交预约时间">
          {{ detailsData.create_time }}
        </el-form-item>
        <el-form-item label="用户备注">
          {{ detailsData.remark }}
        </el-form-item>
        <el-form-item label="商家备注">
          {{ detailsData.merchant_remark }}
        </el-form-item>
        <el-form-item label="预定失败原因"
                      v-if="status == 5">
          {{ detailsData.cancel_reason }}
        </el-form-item>
        <el-form-item label="退款金额"
                      v-if="status == 2 || status == 10">
          <div v-if="detailsData.refund_order">
            {{ detailsData.refund_order.amount }}元
          </div>
          <div v-else>暂无数据</div>
        </el-form-item>
        <el-form-item label="退款渠道"
                      v-if="status == 2 || status == 10">
          <div v-if="detailsData.refund_order">
            <span v-show="detailsData.refund_order.refund_type == 1">支付宝</span>
            <span v-show="detailsData.refund_order.refund_type == 2">微信</span>
          </div>
          <div v-else>暂无数据</div>
        </el-form-item>
        <el-form-item label="取消原因"
                      v-if="this.activeName == 'yqx'">
          {{ detailsData.cancel_reason }}
        </el-form-item>
      </el-form>
      <!-- <span
        slot="footer"
        class="dialog-footer"
        v-if="this.activeName == 'yqx' && detailsData.confirm_cancel == 0"
      >
        <el-button type="primary" @click="qrqxf()">确认取消</el-button>
      </span> -->
    </el-dialog>
    <!-- 退款审核-->
    <el-dialog title="退款审核"
               :visible.sync="tkshenh"
               destroy-on-close
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               width="30%">
      <el-form label-width="160px"
               class="updateArea"
               style="height: 60vh; overflow: auto">
        <el-form-item label="预约状态">
          <span v-if="detailsData.status == 1">待支付</span>
          <span v-else-if="detailsData.status == 2">用户取消订单</span>
          <span v-else-if="detailsData.status == 3">已支付</span>
          <span v-else-if="detailsData.status == 4">已预订</span>
          <span v-else-if="detailsData.status == 5">商家取消</span>
          <span v-else-if="detailsData.status == 6">用户申请退款中</span>
          <span v-else-if="detailsData.status == 7">消费中</span>
          <span v-else-if="detailsData.status == 8">已结账</span>
          <span v-else-if="detailsData.status == 9">退款成功</span>
          <span v-else-if="detailsData.status == 10">用户退款失败</span>
          <span v-else-if="detailsData.status == 11">商家同意退款</span>
          <span v-else-if="detailsData.status == 12">免支付</span>
        </el-form-item>
        <el-form-item label="操作人员">
          {{ detailsData.admin_name }}
        </el-form-item>
        <el-form-item label="订单操作时间">
          {{ detailsData.modify_time }}
        </el-form-item>
        <el-form-item label="订单号码">
          {{ detailsData.order_no }}
        </el-form-item>
        <el-form-item label="店铺信息"
                      v-if="detailsData.shop_info">
          {{ detailsData.shop_info.address }}（{{
            detailsData.shop_info.phone
          }}）
        </el-form-item>
        <el-form-item label="订座信息"
                      v-if="detailsData.place_type_info">
          {{ detailsData.place_type_info.name }}（{{
            detailsData.place_type_info.min_people_num
          }}-{{ detailsData.place_type_info.max_people_num }}人）
        </el-form-item>
        <el-form-item label="座位套餐">
          {{ getGroupInfo(detailsData) }}
        </el-form-item>
        <el-form-item label="优惠券">
          {{
            detailsData.coupon && detailsData.coupon.name
              ? detailsData.coupon.name
              : "--"
          }}
        </el-form-item>
        <el-form-item label="预留位置">
          {{ detailsData.people_num }}
        </el-form-item>
        <el-form-item label="最低消费"
                      v-if="detailsData.place_type_info">
          {{ CalculateData(detailsData.place_type_info.basic_price, "/") }}元
        </el-form-item>
        <el-form-item label="预约金额">
          {{ CalculateData(detailsData.total_deposit, "/") }}元
        </el-form-item>
        <el-form-item label="预约时间">
          {{ detailsData.reserve_time }}
        </el-form-item>
        <el-form-item label="预约用户">
          {{ detailsData.name }}
        </el-form-item>
        <el-form-item label="用户电话">
          {{ detailsData.phone }}
        </el-form-item>
        <el-form-item label="提交预约时间">
          {{ detailsData.create_time }}
        </el-form-item>
        <el-form-item label="用户备注">
          {{ detailsData.remark }}
        </el-form-item>
        <el-form-item label="商家备注">
          {{ detailsData.merchant_remark }}
        </el-form-item>
        <el-form-item label="退款金额">
          <div v-if="detailsData.refund_order">
            {{ detailsData.refund_order.amount }}元
          </div>
          <div v-else>暂无数据</div>
        </el-form-item>
        <el-form-item label="退款渠道">
          <div v-if="detailsData.refund_order">
            <span v-show="detailsData.refund_order.refund_type == 1">支付宝</span>
            <span v-show="detailsData.refund_order.refund_type == 2">微信</span>
          </div>
          <div v-else>暂无数据</div>
        </el-form-item>
        <el-form-item label="拒绝理由">
          <el-input type="textarea"
                    autosize
                    placeholder="注：拒绝退款时必须填写拒绝理由..."
                    v-model="JuLyData">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="tytkF()">同意退款</el-button>
        <el-button @click="jujtkF()">拒绝退款</el-button>
      </span>
    </el-dialog>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
    <el-backtop target=".main-container"
                :bottom="showBack ? 105 : 40"></el-backtop>
  </div>
</template>

<script>
import changeTime from "../../utils/getdate"; //获取当前时间
export default {
  name: "bookingList",
  data () {
    return {
      merchants: {
        //默认锁定商家信息
        merchant_id: 0,
        shop_id: 0,
      },
      showBack: false,
      //用户详情弹框
      usertx: false,
      ydxq: false,
      xianqin: false,
      tkshenh: false,
      //页码
      curPage: 1,
      //总数
      total: 1,
      //页面表单的内容
      tableListData: [],
      start_time: "",
      end_time: "",
      order_no: "",
      status: null,
      activeName: "qb",
      //详情数据
      detailsData: {
        shop_info: { name: "" },
        coupon: { name: "" },
        place_type_info: {
          name: "",
          max_people_num: null,
          min_people_num: null,
        },
        group_buy: {
          title: "",
        },
      },
      //要修改的数据
      currenItem: {
        place_type_id: "",
        place_id: "",
        place_name: "",
        merchant_remark: "",
        reserve_time: "",
      },
      //订座类型数据
      reservationData: [],
      //座位数据
      zhuoweiData: [],
      //拒绝理由
      JuLyData: "",
      statusArr: [
        { text: "待支付", value: "1" },
        { text: "用户取消订单", value: "2" },
        { text: "已支付", value: "3" },
        { text: "已预订", value: "4" },
        { text: "商家取消", value: "5" },
        { text: "用户申请退款中", value: "6" },
        { text: "消费中", value: "7" },
        { text: "已结账", value: "8" },
        { text: "退款成功", value: "9" },
        { text: "用户退款失败", value: "10" },
        { text: "商家同意退款", value: "11" },
        { text: "免支付", value: "12" },
      ],
      user: "",
      hexiao: false,
      page_size: 10,
    };
  },
  created () {
    this.showBack = this.$route.query.from ? true : false;
    if (this.$route.query.formHome == 6) {
      this.start_time = changeTime() + " 00:00";
      this.end_time = changeTime() + " 23:59";
    }
    if (this.$route.query.merchant_id && this.$route.query.shop_id) {
      this.merchants.merchant_id = Number(this.$route.query.merchant_id);
      this.merchants.shop_id = Number(this.$route.query.shop_id);
    } else {
      this.merchants.merchant_id = 0;
      this.shop_id = 0;
    }
    if (this.$route.query.order_no) {
      this.order_no = this.$route.query.order_no;
    }
    this.getTableList();
  },
  methods: {
    getGroupInfo (obj) {
      //console.info(obj);
      let result = "--";
      if (obj.group_buy) {
        if (obj.group_buy.summary_text) {
          result = obj.group_buy.summary_text;
        } else if (obj.group_buy.summary) {
          result = obj.group_buy.summary;
        } else if (obj.group_buy.goods_detail) {
          result = obj.group_buy.goods_detail;
        }
      }
      return result;
    },
    hexiaoOrder (row) {
      this.hexiao = true;
      this.detailsData = row;
    },
    //核销订单
    arrived (n) {
      var datas = {
        //预订ID
        id: this.detailsData.reserve_id,
        is_arrive: n,
      };
      var tipText = n == 1 ? "确定已到店吗？" : "确定未到店吗？";
      this.$confirm(tipText, "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.api.booking.checkReserver(datas).then((res) => {
            this.hexiao = false;
            if (res.data.code == 0) {
              this.getTableList();
              this.$message({
                message: "核销订单成功",
                type: "success",
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => { });
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    // 内容过长，鼠标移入显示全部
    getAgent2 (v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow2 (v) {
      return v.length > 10 ? false : true;
    },
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow (v) {
      return v.length > 10 ? false : true;
    },
    //TAB
    handleClick () {
      this.curPage = 1;
      if (this.activeName == "qb") {
        this.status = null;
        this.getTableList();
      } else if (this.activeName == "yyz") {
        this.status = 3;
        this.getTableList();
      } else if (this.activeName == "yyy") {
        this.monitoring = false;
        this.status = 4;
        this.getTableList();
      } else if (this.activeName == "ywc") {
        this.monitoring = false;
        this.status = 8;
        this.getTableList();
      } else if (this.activeName == "tkz") {
        this.monitoring = false;
        this.status = 6;
        this.getTableList();
      } else if (this.activeName == "yqx") {
        this.monitoring = false;
        this.status = 2;
        this.getTableList();
      } else if (this.activeName == "sjqx") {
        this.monitoring = false;
        this.status = 5;
        this.getTableList();
      } else if (this.activeName == "yjj") {
        this.monitoring = false;
        this.status = 10;
        this.getTableList();
      }
    },
    //重置
    resetData () {
      this.order_no = "";
      this.start_time = "";
      this.end_time = "";
      this.user = "";
      this.curPage = 1;
      this.merchants = {
        merchant_id: 0,
        shop_id: 0,
      };
      this.getTableList();
    },
    //筛选
    screening () {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取列表内容 */
    getTableList () {
      var data = {
        page_size: this.page_size,
        order_no: this.order_no,
        status: this.status,
        start_time: this.start_time,
        end_time: this.end_time,
        user: this.user,
        page: this.curPage,
        order: "desc",
        sort: this.status === 3 ? "create_time" : "modify_time",
      };
      if (this.merchants.merchant_id > 0 && this.merchants.shop_id > 0) {
        data.merchant_id = this.merchants.merchant_id;
        data.shop_id = this.merchants.shop_id;
      }
      this.api.booking.ReserveList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
    //获取商家座位分类
    getPlaceType (row) {
      const datas = {
        page_size: 1000,
        merchant_id: row.merchant_id,
        shop_id: row.shop_id,
      };
      this.api.shop.getPlaceType(datas).then((res) => {
        var typeArr = res.data.data;
        var arr = [];
        typeArr.forEach((item) => {
          if (item.status == 1) {
            arr.push(item);
          }
          this.reservationData = arr;
        });
      });
    },
    //获取座位
    getAllPlace (row) {
      const datas = {
        type_id: row.place_type_id,
        merchant_id: row.merchant_id,
        shop_id: row.shop_id,
      };
      this.api.shop.placeList(datas).then((res) => {
        this.zhuoweiData = res.data.data;
      });
    },
    //打开弹框|预约中
    yuetkdk (data) {
      this.ydxq = true;
      this.detailsData = data;
      this.currenItem.place_type_id = data.place_type_id;
      if (data.place_id == 0) {
        this.currenItem.place_id = "";
      } else {
        this.currenItem.place_id = data.place_id;
      }
      this.currenItem.reserve_time = data.reserve_time;
      this.currenItem.merchant_remark = data.merchant_remark;
      this.getPlaceType(data);
      this.getAllPlace(data);
    },
    //确认预约
    qryuF () {
      if (this.currenItem.reserve_time == "" || !this.currenItem.reserve_time) {
        this.$message({
          message: "预约时间必填",
          type: "warning",
        });
        return;
      }
      var place_type_name;
      var place_name;
      this.reservationData.forEach((item) => {
        if (item.type_id != this.currenItem.place_type_id) {
          return;
        }
        place_type_name = item.name;
      });
      // 莉莉说预留位置改为手动输入
      // if (!this.zhuoweiData || this.zhuoweiData == "") {
      //   if (this.currenItem.place_name == "") {
      //     this.$message({
      //       message: "请填写座位位置",
      //       type: "warning",
      //     });
      //     return;
      //   } else {
      //     place_name = this.currenItem.place_name;
      //     this.currenItem.place_id = 0;
      //   }
      // } else {
      //   this.zhuoweiData.forEach((item) => {
      //     if (item.place_id != this.currenItem.place_id) {
      //       return;
      //     }
      //     place_name = item.place_name;
      //   });
      // }
      if (this.currenItem.place_name == "") {
        this.$message({
          message: "请填写座位位置",
          type: "warning",
        });
        return;
      } else {
        place_name = this.currenItem.place_name;
        this.currenItem.place_id = 0;
      }
      var datas = {
        //预订ID
        reserve_id: this.detailsData.reserve_id,
        //预订座位类型id
        place_type_id: this.currenItem.place_type_id,
        //预订座位类型名称
        place_type_name: place_type_name,
        //预订座位id
        place_id: this.currenItem.place_id,
        //预订座位名称
        place_name: place_name,
        //商家备注
        merchant_remark: this.currenItem.merchant_remark,
        //预订时间
        reserve_time: this.currenItem.reserve_time,
      };
      this.$confirm("您确认提交该预约信息吗？", "确认预约", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.api.booking.Confirm(datas).then((res) => {
            this.ydxq = false;
            if (res.data.code == 0) {
              this.getTableList();
              this.$message({
                message: "确认预约成功",
                type: "success",
              });
              this.currenItem.place_name = "";
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => { });
    },
    cancelFun () {
      this.currenItem.place_name = "";
      this.ydxq = false;
      this.hexiao = false;
    },
    //取消预约
    qxyuF (reserve_id) {
      var datas = {
        //预订ID
        reserve_id: reserve_id,
      };
      this.$prompt("预订失败原因", "取消预约", {
        confirmButtonText: "确定",
        cancelButtonText: "关闭",
        inputValidator: (value) => {
          return value != undefined;
        },
        inputErrorMessage: "请输入取消原因...",
      })
        .then(({ value }) => {
          datas["cancel_reason"] = value;
          this.api.booking.Cancel(datas).then((res) => {
            if (res.data.code == 0) {
              this.getTableList();
              this.$message({
                message: "取消预约成功",
                type: "success",
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => { });
    },
    //确认取消
    qrqxf () {
      var datas = {
        //预订ID
        reserve_id: this.detailsData.reserve_id,
      };
      this.$confirm("您确认取消该数据吗？", "确认取消", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.api.booking.confirmCancel(datas).then((res) => {
            if (res.data.code == 0) {
              this.xianqin = false;
              this.getTableList();
              this.$message({
                message: "确认取消成功",
                type: "success",
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => { });
    },
    //详情弹框
    xiangqTK (data) {
      this.xianqin = true;
      this.detailsData = data;
    },
    //退款审核弹框
    tuishenTK (data) {
      this.tkshenh = true;
      this.detailsData = data;
    },
    //同意退款
    tytkF () {
      var datas = {
        //预订ID
        reserve_id: this.detailsData.reserve_id,
        status: 3,
      };
      this.$confirm("您确认同意退款吗？", "同意退款", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.api.booking.RefuseAudit(datas).then((res) => {
            if (res.data.code == 0) {
              this.getTableList();
              this.tkshenh = false;
              this.$message({
                message: "同意退款成功",
                type: "success",
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => { });
    },
    //拒绝退款
    jujtkF () {
      if (this.JuLyData == "") {
        this.$message({
          message: "拒绝退款时必须填写拒绝理由!",
          type: "warning",
        });
        return;
      }
      var datas = {
        //预订ID
        reserve_id: this.detailsData.reserve_id,
        status: 4,
        reason: this.JuLyData,
      };
      this.$confirm("您确认拒绝退款吗？", "拒绝退款", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.api.booking.RefuseAudit(datas).then((res) => {
            if (res.data.code == 0) {
              this.getTableList();
              this.tkshenh = false;
              this.$message({
                message: "拒绝退款成功",
                type: "success",
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => { });
    },
    //table筛选
    // filterTagTable(filters) {
    //   this.filterMethod(filters);
    // },
    //table筛选
    // filterMethod(val) {
    //   var key = [];
    //   var value = [];
    //   for (var i in val) {
    //     key.push(i);
    //     value.push(val[i]);
    //   }
    //   key = key.join(",");
    //   value = value.join(",");
    //   console.log(key)
    //   console.log(value)
    //   if(key == 'status'){
    //     this.status = value
    //   }
    //   this.getTableList();
    // },
  },
};
</script>

<style lang="scss" scoped>
.sosuo {
  margin-left: 10px;
  float: left;
  background-color: #f4f4f4 !important;
  border: 1px solid #cecece;
  color: #0a0a0a;
  width: 90px;
}
.t-s01 {
  line-height: 34px;
  font-size: 15px;
}
.t-s02 {
  margin-left: 20px;
}
.qinsrcss {
  text-align: center;
  font-size: 24px;
  padding-top: 50px;
  padding-bottom: 50px;
  color: rgb(175, 172, 172);
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
}
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .pageTitle {
    margin: 10px 0 20px 0;
    font-size: 24px;
    color: #0a0a0a;
  }
  .add-box {
    margin: 10px 0;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .searchInput {
    float: right;
    width: 350px;
  }
  .el-form-item {
    .el-textarea {
      min-width: 200px !important;
      width: 280px !important;
    }
    .el-form-item__label {
      width: 120px !important;
    }
    .el-form-item__content {
      margin-left: 120px !important;
    }
    .el-select,
    .el-textarea,
    .el-cascader,
    .el-date-editor--timerange.el-input__inner {
      min-width: 200px !important;
      width: 50% !important;
    }
  }
}
</style>
