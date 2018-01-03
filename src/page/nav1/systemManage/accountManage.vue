<template>
  <div class="account-manage">
    <div class="title">账号管理</div>
    <div class="select-form" label-width="80px">
      <div class="form-left">
        <div class="top">
          <div class="form-item">
            <span>账号：</span>
            <el-input placeholder="请输入账号" class="input" v-model="selectOption.account"></el-input>
          </div>
          <div class="form-item">
            <span>姓名：</span>
            <el-input placeholder="请输入姓名" class="input" v-model="selectOption.name"></el-input>
          </div>
          <div class="form-item">
            <span>角色：</span>
            <el-input placeholder="请输入角色" class="input" v-model="selectOption.roleName"></el-input>
          </div>
        </div>
        <div class="bottom">
          <div class="form-item date-picker">
            <div class="wrap">
              <span>创建时间：</span>
              <el-date-picker
                v-model="selectOption.startTime"
                type="datetime"
                placeholder="选择开始时间"
                class="picker"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
              <span class="line"></span>
              <el-date-picker
                v-model="selectOption.endTime"
                type="datetime"
                placeholder="选择结束时间"
                class="picker"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="form-item">
            <span>账号状态：</span>
            <el-select placeholder="请选择账号状态" v-model="selectOption.status">
              <el-option
                label="全部"
                :value="null">
              </el-option>
              <el-option
                label="启用"
                :value="0">
              </el-option>
              <el-option
                label="停用"
                :value="1">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="form-right">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加账号</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search" @click="select">检索</el-button>
      </div>
    </div>
    <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true" @deleteAll="deleteAll"></q-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="this.selectOption.pageSize"
        :page-count="pageCount"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
    <common-model :show="showUpdateModel"
                  @closeModel="closeModel"
                  title="修改用户"
                  class="update-model"
    >
      <div class="update-user" v-if="currentUser">
        <el-form :model="updateFormData" :rules="updateRule" ref="form1">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="updateFormData.name" :placeholder="currentUser.name"></el-input>
          </el-form-item>
          <el-form-item label="选择角色：" prop="role" class="check-wrap">
            <el-radio-group v-model="updateFormData.role">
              <el-radio :label="(item,index)" name="role" v-for="item in roleList" :key="index">{{item.roleName}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="btn-group">
          <div class="q-btn-confirm" @click.stop="updateUser">确定</div>
          <div class="q-btn-cancel" @click="closeModel">取消</div>
        </div>
      </div>
    </common-model>
    <common-model :show="showResetPasswordModel"
                  title="重置密码"
                  @closeModel="closeModel"
                  class="reset-password-model"
    >
      <el-form :model="resetPassWordFormData" :rules="resetRule">
        <el-form-item label="新密码：" prop="password">
          <el-input v-model="resetPassWordFormData.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm" @click.stop="updateUserPassword">确定</div>
        <div class="q-btn-cancel" @click="closeModel">取消</div>
      </div>
    </common-model>
  </div>
</template>
<script>
  import qTable from '@/component/table.vue'
  import Api from '@/api/api'
  import {code} from '@/config/config'
  import commonModel from '@/component/commonModel.vue'
  export default{
    components: {
      qTable,
      commonModel
    },
    data(){
      return {
        updateRule: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}],
          role: [{required: true, message: '请至少选择一个角色', trigger: 'change'}]
        },
        resetRule: {
          password: [{required: true, message: '请输入新密码', trigger: 'blur'}]
        },
        selectOption: {
          account: '',
          startTime: '',
          endTime: '',
          name: '',
          status: '',
          roleName: '',
          pageNum: 1,
          pageSize: 20
        },
        tableHeader: [
          {
            label: '账号',
            prop: 'account'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '角色',
            prop: 'roleName'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
          {
            label: '账号状态',
            prop: 'statusLabel'
          },
          {
            label: '登录次数',
            prop: 'loginNum'
          },
          {
            label: '最后登录时间',
            prop: 'lastLoginTime'
          }
        ],
        tableData: [],
        operationStop: [
          {
            label: '修改',
            color: '#20a7fe',
            handle: this.edit,
          },
          {
            label: '停用',
            color: '#f6781d',
            handle: this.stop,
          },
          {
            label: '重置密码',
            color: '#07c362',
            handle: this.resetPassword,
          },
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          }
        ],
        operationStart: [
          {
            label: '修改',
            color: '#20a7fe',
            handle: this.edit,
          },
          {
            label: '启用',
            color: '#20a7fe',
            handle: this.start,
          },
          {
            label: '重置密码',
            color: '#07c362',
            handle: this.resetPassword,
          },
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          }
        ],
        total: 1,
        pageCount: 1,
        showUpdateModel: false,
        showResetPasswordModel: false,
        currentUser: null,
        roleList: [],
        updateFormData: {
          name: '',
          role: ''
        },
        resetPassWordFormData: {
          password: ''
        },
      }
    },
    created(){
      this.init()
      this.getRoleList()
    },
    methods: {
      async getRoleList(){
        let data = await Api.getAllRole()
        this.roleList = data.data.list
      },
      loadPage(currentPage){ // 点击分页器
        this.selectOption.pageNum = currentPage
        this.init()
      },
      edit(index, item){
        this.showUpdateModel = true
        this.currentUser = item
        this.roleList.forEach(role => {
          if (item.roleId == role.id) {
            this.updateFormData.role = role
          }
        })
      },
      async stop(index, item){
        let data = await Api.updateStatus({
          id: item.id,
          status: 1
        })
        if (data.code === code.SUCCESS) {
          item.status = 1
          item.operation = this.operationStart
        }
      },
      async start(index, item){
        let data = await Api.updateStatus({
          id: item.id,
          status: 0
        })
        if (data.code === code.SUCCESS) {
          item.status = 0
          item.operation = this.operationStop
        }
      },
      resetPassword(index, item){
        this.showResetPasswordModel = true
        this.currentUser = item
      },
      async delete(index, item){
        let data = await Api.deleteUser({
          ids: [item.id]
        })
        if (data.code === code.SUCCESS) {
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      },
      goAdd(){
        this.$router.push({
          name: 'addAccount'
        })
      },
      async select(){ // 筛选
        this.selectOption.pageNum = 1
        this.init()
      },
      async getUserList(){
        let data = await Api.getUserList(this.selectOption)
        data = data.data
        this.total = data.allCount
        this.pageCount = data.totalPage
        let list = data.list
        list.forEach(item => {
          item.statusLabel = item.status === 0 ? '启用' : '停用'
          if (item.status === 0) {
            item.operation = this.operationStop
          } else {
            item.operation = this.operationStart
          }
        })
        return list
      },
      async init(){
        let list = await this.getUserList()
        this.tableData = list
      },
      closeModel(){
        this.showUpdateModel = false
        this.showResetPasswordModel = false
      },
      async updateUser(){
        console.log(this.updateFormData)
        let data = await Api.updateUser({
          id: this.currentUser.id,
          name: this.updateFormData.name,
          roleId: this.updateFormData.role.id,
          roleName: this.updateFormData.role.roleName
        })
        if (data.code === code.SUCCESS) {
          this.currentUser.roleName = this.updateFormData.role.roleName
          this.currentUser.name = this.updateFormData.name
          this.$message.success('更新成功')
          this.closeModel()
        } else {
          this.$message.error('更新失败')
        }
      },
      async updateUserPassword(){
        let data = await Api.updateUserPassword({
          id: this.currentUser.id,
          newPassword: this.resetPassWordFormData.password
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('密码重置成功')
          this.closeModel()
        } else {
          this.$message.error('密码重置失败')
        }
      },
      async deleteAll(arr){ // 批量删除
        let result = [] //选中的id
        let left = [] //没被选中的元素
        this.tableData.forEach(item => {
          if (arr.indexOf(item) >= 0) {
            result.push(item.id)
          } else {
            left.push(item)
          }
        })
        let data = await Api.deleteUser({
          ids: result
        })
        if (data.code === code.SUCCESS) {
          this.tableData = left
          this.$message.success('删除成功')
        } else {
          this.$message.success('删除失败')
        }
      }
    },
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .account-manage {
    padding: 20px;
    .title {
      color: #525252;
    }
    .select-form {
      background: #e7ecf2;
      border-radius: 6px;
      padding: 16px;
      margin: 20px 0;
      display: flex;
      .form-left {
        flex: 1;
        .top {
          display: flex;
        }
        .bottom {
          margin-top: 12px;
          display: flex;
        }
        .form-item {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .input {
            width: 186px;
            margin-left: 12px;
          }
        }
        .date-picker {
          .wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            .picker {
              margin-left: 10px;
              width: 200px;
            }
            .line {
              width: 18px;
              height: 2px;
              background: #cacbd0;
              margin-left: 10px;
            }
          }
        }
      }
      .form-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .add-btn {
          background: #fe842b;
          border: none;
          width: 150px;
        }
        .select-btn {
          background: #07c362;
          margin: 12px 0 0 0;
          border: none;
          width: 150px;
        }
      }
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
    .update-model {
      .update-user {
        .el-form {
          padding: 40px 40px 0 40px;
          .el-form-item {
            display: flex;
            width: 100%;
            .el-form-item__content {
              flex: 1;
            }
          }
        }
        .btn-group {
          display: flex;
          justify-content: center;
          border-top: 1px solid #d9d9d9;
          padding-top: 30px;
        }
      }
    }
    .reset-password-model {
      .el-form {
        padding: 40px 40px 0 40px;
        .el-form-item {
          display: flex;
          width: 100%;
          .el-form-item__content {
            flex: 1;
          }
        }
      }
      .btn-group {
        display: flex;
        justify-content: center;
        border-top: 1px solid #d9d9d9;
        padding-top: 30px;
      }
    }
  }
</style>
