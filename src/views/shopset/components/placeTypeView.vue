<!--
 * @Author: 朱强
 * @Date: 2021-01-15 14:42:49
 * @LastEditTime: 2021-02-04 18:38:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\placeTypeView.vue
-->
<template>
  <el-form :model="typeForm" ref="typeForm" label-width="80px" class="addType">
    <el-form-item label="类型名称" prop="name">
      <el-input v-if="isEdit" v-model="typeForm.name" />
      <span v-else>{{ typeForm.name }}</span>
    </el-form-item>
    <el-form-item label="最少人数" prop="min_people_num">
      <el-input v-if="isEdit" v-model.number="typeForm.min_people_num" />
      <span v-else>{{ typeForm.min_people_num }}</span>
    </el-form-item>
    <el-form-item label="最多人数" prop="max_people_num">
      <el-input v-if="isEdit" v-model.number="typeForm.max_people_num" />
      <span v-else>{{ typeForm.max_people_num }}</span>
    </el-form-item>
    <el-form-item label="低消" prop="basic_price">
      <el-input v-if="isEdit" v-model.number="typeForm.basic_price" />
      <span v-else>{{ typeForm.basic_price }}</span>
    </el-form-item>
    <el-form-item label="订金" prop="deposit">
      <el-input v-if="isEdit" v-model.number="typeForm.deposit" />
      <span v-else>{{ typeForm.deposit }}</span>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-if="isEdit" v-model.number="typeForm.sort" />
      <span v-else>{{ typeForm.sort }}</span>
    </el-form-item>
    <el-form-item label="是否启用">
      <el-switch
        v-if="isEdit"
        v-model="typeForm.status"
        :active-value="1"
        :inactive-value="0"
      >
      </el-switch>
      <span v-if="!isEdit && typeForm.status == 0">未启用</span>
      <span v-if="!isEdit && typeForm.status == 1">启用</span>
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <img
        v-if="typeForm.icon != ''"
        class="d-img"
        :src="typeForm.icon"
        alt=""
      />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "placeTypeView",
  props: {
    typeForm: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.d-img {
  width: 146px;
  height: 146px;
  display: inline-block;
  border: 1px solid #eeeeee;
  border-radius: 6px;
}
</style>
