<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button class="b-btn"
                 type="danger"
                 @click="batchDelete">删除</el-button>
      <el-button class="b-btn"
                 type="success"
                 @click="insertItemtk">新增</el-button>
      <el-button class="b-btn"
                 type="warning"
                 @click="returnF">返回</el-button>
      <el-input class="searchInput"
                placeholder="请输入要搜索的名称"
                prefix-icon="el-icon-search"
                v-model="searchValue"
                @change="searchDatas"></el-input>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selectItem"
              @filter-change="filterTagTable">
      <el-table-column type="selection"
                       width="50" />
      <el-table-column label="全选/角色ID"
                       width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="角色名称"
                       width="200" />
      <el-table-column prop="memo"
                       label="角色描述"
                       width="300" />
      <el-table-column column-key="status"
                       :filters="[
          { text: '停用', value: 0 },
          { text: '启用', value: 1 },
        ]"
                       :filter-multiple="false"
                       label="状态"
                       width="150">
        <template slot-scope="scope">
          <span v-show="scope.row.status == 0">停用</span>
          <span v-show="scope.row.status == 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column align="right"
                       label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="
              openUpdateDialog(
                scope.$index,
                JSON.parse(JSON.stringify(scope.row)),
                'type'
              )
            ">修改</el-button>
          <el-button size="mini"
                     type="text"
                     @click="openDelDialog(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     layout="prev, pager, next"
                     :total="total"></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="新增"
               :visible.sync="insertDialog">
      <el-form :model="addItem"
               :rules="rules"
               ref="formName1"
               label-width="80px"
               class="updateArea">
        <el-form-item label="角色名称"
                      prop="name">
          <el-input v-model="addItem.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addItem.memo" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addItem.status"
                     placeholder="请选择">
            <el-option label="停用"
                       :value="0"></el-option>
            <el-option label="启用"
                       :value="1"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="this.menuData.length">
          <el-form-item label="权限设置">
            <el-tree :data="menuData"
                     show-checkbox
                     node-key="id"
                     :default-expand-all="true"
                     ref="tree"
                     style="width: 500px;"
                     :props="defaultProps">
              <span class="custom-tree-node"
                    slot-scope="{ node, data }">
                <div style="display:flex;justify-content: space-between;width: 400px;">
                  <span>{{ node.label }}</span>
                  <div>
                    <el-checkbox-group v-model="selectData[data.id]"
                                       :style="{'margin-right':data.has_children?'20px':null}"
                                       :max="1">
                      <el-checkbox v-for="city in cities"
                                   :label="city"
                                   @change="()=>{selectTreeItem(node,data)}"
                                   :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </span>
            </el-tree>
          </el-form-item>
        </template>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation('formName1')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog :title="'修改'"
               :visible.sync="updateDialog">
      <el-form :model="currenItem"
               :rules="rules"
               ref="formName2"
               label-width="80px"
               class="updateArea">
        <el-form-item label="角色名称"
                      prop="name">
          <el-input v-model="currenItem.name" />
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="memo">
          <el-input v-model="currenItem.memo" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currenItem.status"
                     placeholder="请选择">
            <el-option label="停用"
                       :value="0"></el-option>
            <el-option label="启用"
                       :value="1"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="this.menuData.length">
          <el-form-item label="权限设置">
            <el-tree :data="menuData"
                     show-checkbox
                     node-key="id"
                     :default-expand-all="true"
                     ref="tree"
                     style="width: 500px;"
                     :props="defaultProps">
              <span class="custom-tree-node"
                    slot-scope="{ node, data }">
                <div style="display:flex;justify-content: space-between;width: 400px;">
                  <span>{{ node.label }}</span>
                  <div>
                    <el-checkbox-group v-model="selectData[data.id]"
                                       :style="{'margin-right':data.has_children?'20px':null}"
                                       :max="1">
                      <el-checkbox v-for="city in cities"
                                   :label="city"
                                   @change="()=>{selectTreeItem(node,data)}"
                                   :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </span>
            </el-tree>
          </el-form-item>
        </template>
        <!-- <template v-if="this.menuData.length">
          <el-form-item label="权限设置">
            <el-tree :data="menuData"
                     show-checkbox
                     node-key="id"
                     :default-expand-all="true"
                     ref="tree"
                     style="width: 500px;"
                     :props="defaultProps">
              <div class="custom-tree-node"
                   slot-scope="{ node, data }">
                <div style="display:flex;justify-content: space-between;width: 400px;">
                  <span>{{ node.label }}</span>
                  <div>
                    <el-checkbox-group v-model="selectData[data.id]"
                                       :style="{'margin-right':data.has_children?'40px':null}"
                                       :max="1">
                      <el-checkbox v-for="city in cities"
                                   :label="city"
                                   @change="()=>{selectTreeItem(node,data)}"
                                   :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-tree>
          </el-form-item>
        </template> -->
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation('formName2')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除单个内容 -->
    <el-dialog :title="'删除-' + currenDeleteRow.name"
               :visible.sync="deleteDialog"
               width="30%">
      <span>确定要删除此项吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除"
               :visible.sync="mutilDeleteDialog"
               width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name"
           v-for="(item, index) in nameArr"
           :key="index">
        {{ item }}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "currenPage",
  data () {
    return {
      checkedCities: [],
      cities: ['只读', '读写'],
      //状态
      status: "",
      //是否全选权限
      allQL: false,
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1, //删除框的标题
      total: 13, //删除框的标题
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      tableListData: [], //页面表单的内容
      //添加
      addItem: {
        name: "",
        status: 1,
        menu_ids: [],
      },
      //修改
      currenItem: {},
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      searchValue: "", //搜索的值
      //树形菜单配置
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectData: {},// 树形图选择ID 用于更新视图
      treeBDData: {}, // 树形图绑定ID 用于重置数据
      setTreeData: [], //权限菜单选择数据
      selectStatus: null, // 选中的状态： 只读&读写
      parentData: {},
      //权限菜单数据
      menuData: [],
      updateQ: [],
      //要过滤掉的ID
      filterID: "",
    };
  },
  created () {
    this.getTableList();
    this.menuAllTree();
  },
  watch: {
    // 每次打开弹框更新权限选中数据
    insertDialog () {
      this.selectData = JSON.parse(JSON.stringify(this.treeBDData))
    },
    // 每次打开弹框更新权限选中数据
    updateDialog () {
      this.selectData = JSON.parse(JSON.stringify(this.treeBDData))
    },
    // parentData () {
    //   console.log(this.parentData);
    //   this.checkAll()
    // }
  },
  methods: {
    selectTreeItem (node, data) {
      // console.log(node);
      // console.log(data);
      if (this.selectData[data.id][0] === '只读') {
        this.selectStatus = '只读'
      } else if (this.selectData[data.id][0] === '读写') {
        this.selectStatus = '读写'
      } else {
        this.selectStatus = null
      }
      this.findParentData(this.menuData, data.id)
      this.farmatSelectTreeId(data)
    },
    //统一验证方法
    validation (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "formName1") {
            this.insertItem();
          } else {
            this.multiUpdate();
          }
        } else {
          return false;
        }
      });
    },
    //返回
    returnF () {
      this.$router.go(-1);
    },
    //筛选
    filterTagTable (data) {
      if (data.status != "") {
        this.status = Number(data.status[0]);
      } else {
        this.status = "";
      }
      this.getTableList();
    },
    getCheckedNodes () {
      //返回目前被选中的节点的 key 所组成的数组
      var arr1 = this.$refs.tree.getCheckedKeys();
      var arr2 = this.$refs.tree.getHalfCheckedKeys();
      if (arr2 != "") {
        return arr1.concat(arr2);
      } else {
        return arr1;
      }
    },
    /* 获取表单内容 */
    getTableList () {
      let data = {
        status: this.status,
        page: this.curPage,
        name: this.searchValue,
      };
      this.api.adminvip.roleData(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取权限菜单树型内容 */
    menuAllTree () {
      this.api.adminvip.menuAllTree().then((res) => {
        this.menuData = JSON.parse(JSON.stringify(res.data.data));
        // this.farmatMuenData(res.data.data)
        this.$set(this.menuData, 0, res.data.data[0])
        this.menuData.forEach(items => {
          items.children.forEach((item, index) => {
            this.$set(this.menuData[0].children, index, item)
          })
        })
        this.farmatTreeId(this.menuData)
        this.filterID = res.data.data[0].id;
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1;
      this.getTableList();
    },
    //打开添加弹框
    insertItemtk () {
      this.insertDialog = true;
    },
    /* 新增 */
    insertItem () {
      var data = this.addItem;
      data.menu_ids = JSON.parse(JSON.stringify(this.setTreeData));
      // console.log(data);
      this.api.adminvip.roleInsert(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.insertDialog = false;
        this.$refs["formName1"].resetFields();
        this.getTableList();
      });
    },

    /* 打开修改窗口 */
    openUpdateDialog (index, row) {
      this.updateDialog = true;
      this.currenItem = row;
      this.permissionsID(this.currenItem.id);
    },
    //查询角色所拥有的权限菜单树型
    permissionsID (id) {
      var data = {
        role_id: id,
      };
      this.api.adminvip.RoleMenuIDList(data).then((res) => {
        var group = JSON.parse(JSON.stringify(res.data.data))
        this.setTreeData = group
        group.forEach(item => {
          if (item.status) {
            this.selectStatus = '读写'
            // this.$set(this.selectData[item.id], 0, '读写')
            this.selectData[item.id]=['读写']
          } else {
            this.selectStatus = '只读'
            // this.$set(this.selectData[item.id], 0, '只读')
            this.selectData[item.id]=['只读']
          }
          
          this.findParentData(this.menuData, item.id)
          this.checkAll()
        })
        // for (let i of group) {
        //   if (i.status == 1) {
        //     this.selectData[i.id] = ["读写"];
        //   } else {
        //     this.selectData[i.id] = ["只读"];
        //   }
        //   this.findParentData(this.menuData, item.id)
        //   this.checkAll()
        // }
        
        // console.log(this.selectData);
        //遍历删除掉1
        // for (var i = 0; i < group.length; i++) {
        //   if (group[i] == this.filterID) {
        //     group.splice(i, 1);
        //     break;
        //   }
        // }
        // this.updateQ = group;
        // this.farmatData(this.menuData)
        // console.log("处理：" + JSON.stringify(this.updateQ));
      });
    },
    // 处理数据
    /* 修改 */
    multiUpdate () {
      var data = this.currenItem;
      // this.UpdateQ(data.id);
      data.menu_ids = JSON.parse(JSON.stringify(this.setTreeData));
      // roleUpdate
      // this.api.adminvip.roleQXUpdate(data).then((res) => {

      // });
      const p1 = Promise.resolve(this.api.adminvip.roleQXUpdate(data))
      const p2 = Promise.resolve(this.api.adminvip.roleUpdate(data))
      Promise.all([p1, p2]).then((res) => {
        this.getTableList();
        this.updateDialog = false;
      })
    },
    //修改保存角色的权限菜单
    UpdateQ (id) {
      var data = {
        role_id: id,
        menu_ids: this.getCheckedNodes(),
      };
      this.api.adminvip.setRoleMenu(data).then((res) => { });
    },
    /* 打开批量删除框 */
    batchDelete () {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning",
        });
      }
    },
    /* 打开删除框 */
    openDelDialog (row) {
      this.currenDeleteRow = row;
      this.deleteDialog = true;
    },
    /* 删除选项 */
    deleteItem (type) {
      var id = [];
      if (type == "one") {
        //单删除
        id[0] = this.currenDeleteRow.id;
      } else if (type == "mutil") {
        //多选删除
        id = this.multipleSelection;
      }
      var data = {
        id: id,
        // merchant_id: this.merchants.merchant_id,
        // shop_id: this.merchants.shop_id,
      };
      this.api.adminvip.roleDelete(data).then((res) => {
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.id);
        this.nameArr.push(item.name);
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
    // 判断子集是否全选 子集全选更新父级状态
    checkAll () {
      let status = 0
      // console.log(this.parentData);
      this.parentData.children.forEach(item => {
        if (this.selectData[item.id][0] == this.selectStatus) {
          ++status
        }
      })
      // console.log(status, this.parentData.children.length);
      if (status == this.parentData.children.length) {
        // this.selectData[this.parentData.id][0] = this.selectStatus
        this.$set(this.selectData[this.parentData.id], 0, this.selectStatus)
        // 判断是不是最顶级节点 不是则继续往上寻找
        if (this.parentData.id !== 1) {
          this.findParentData(this.menuData, this.parentData.id)
        }
      } else {
        this.selectData[this.parentData.id] = []
      }
    },
    // 通过子集寻找父级 用于更新父级状态
    findParentData (data, id) {
      data.forEach(item => {
        if (item.id == id) {
          this.parentData = item;
          return false;
        } else {
          item.children && item.children.forEach(it => {
            if (it.id == id) {
              this.parentData = item;
              this.checkAll()
              return false;
            } else {
              if (it.has_children) {
                this.findParentData(item.children, id)
              }
            }
          })
        }
      })
    },
    // 递归处理选中数据
    farmatSelectTreeId (data) {
      // 跟新自身状态
      if (this.selectStatus === '只读') {
        this.$set(this.selectData[data.id], 0, '只读')
      } else if (this.selectStatus === '读写') {
        this.$set(this.selectData[data.id], 0, '读写')
      } else {
        this.selectData[data.id] = []
      }
      // 判断有子集 有子集就继续递归 无子集就将选中数据更新到setTreeData；并通过selectData更新视图
      if (data.has_children) {
        // 遍历子集
        data.children.forEach(item => {
          // 删除子集在setTreeData中的数据，以免重复添加
          if (this.setTreeData.findIndex(it => { return it.id == item.id }) !== -1) {
            const index = this.setTreeData.findIndex(it => { return it.id == item.id })
            this.setTreeData.splice(index, 1)
          }
          //再次递归
          this.farmatSelectTreeId(item)
        })
      } else {
        let status = null
        if (!this.selectStatus) {
          this.selectData[data.id] = []
          this.selectData[1] = []
          if (this.parentData) {
            this.selectData[this.parentData.id] = []
          }
          if (this.setTreeData.findIndex(item => { return item.id == data.id }) !== -1) {
            const index = this.setTreeData.findIndex(item => { return item.id == data.id })
            this.setTreeData.splice(index, 1)
          }
        } else if (this.selectStatus === '只读') {
          this.$set(this.selectData[data.id], 0, '只读')
          status = 0
          let obj = {
            id: data.id,
            status
          }
          // this.setTreeData.push(obj)
          this.$set(this.setTreeData, this.setTreeData.length, obj)
        } else if (this.selectStatus === '读写') {
          this.$set(this.selectData[data.id], 0, '读写')
          status = 1
          let obj = {
            id: data.id,
            status
          }
          this.$set(this.setTreeData, this.setTreeData.length, obj)
        }
        // }
      }
    },
    // 递归遍历所有ID
    farmatTreeId (children) {
      children.forEach(item => {
        this.$set(this.selectData, item.id, [])
        this.$set(this.treeBDData, item.id, [])
        if (item.has_children) {
          this.farmatTreeId(item.children)
        } else {
          return false
        }
      })
    },
    // 递归去除父节点id
    // farmatData (children) {
    //   children.forEach(item => {
    //     if (item.has_children) {
    //       this.updateQ = this.updateQ.filter(i => {
    //         return i !== item.id
    //       })
    //       this.farmatData(item.children)
    //     } else {
    //       return false
    //     }
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
.b-btn {
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
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
    width: 50% !important;
    .el-input {
      min-width: 400px !important;
      width: 50% !important;
    }
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
    ::v-deep .el-tree-node__content > label.el-checkbox {
      display: none !important;
    }
  }
}
</style>
