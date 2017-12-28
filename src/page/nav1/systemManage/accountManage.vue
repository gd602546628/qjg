<template>
  <div class="account-manage">
    <div class="title">账号管理</div>
    <div class="select-form" label-width="80px">
      <div class="form-left">
        <div class="top">
          <div class="form-item">
            <span>账号：</span>
            <el-input placeholder="请输入账号" class="input" v-model="account"></el-input>
          </div>
          <div class="form-item">
            <span>姓名：</span>
            <el-input placeholder="请输入姓名" class="input" v-model="name"></el-input>
          </div>
          <div class="form-item">
            <span>角色：</span>
            <el-input placeholder="请输入角色" class="input" v-model="role"></el-input>
          </div>
        </div>
        <div class="bottom">
          <div class="form-item date-picker">
            <div class="wrap">
              <span>创建时间：</span>
              <el-date-picker
                v-model="startTime"
                type="datetime"
                placeholder="选择开始时间"
                class="picker"
              >
              </el-date-picker>
              <span class="line"></span>
              <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="选择结束时间"
                class="picker"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="form-item">
            <span>账号状态：</span>
            <el-select placeholder="请选择账号状态">
              <el-option
                :label="11"
                :value="1">
              </el-option>
              <el-option
                :label="11"
                :value="1">
              </el-option>
              <el-option
                :label="11"
                :value="1">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="form-right">
        <el-button type="primary" class="add-btn" icon="el-icon-plus">添加账号</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search">检索</el-button>
      </div>
    </div>
    <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true"></q-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import qTable from '@/component/table.vue'
  export default{
    components: {
      qTable
    },
    data(){
      return {
        account: '',
        startTime: '',
        endTime: '',
        name: '',
        role: '',
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
            label: '创建账号',
            prop: 'create'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
          {
            label: '账号状态',
            prop: 'accountStatus'
          },
          {
            label: '登录次数',
            prop: 'loginTimes'
          },
          {
            label: '最后登录时间',
            prop: 'lastTime'
          }
        ],
        tableData: [{
          account: 'dance flow',
          name: '王菲',
          create: '系统管理员',
          createTime: '2017-11-23',
          accountStatus: '启用',
          loginTimes: '10',
          lastTime: '2017-09-18 13:23:89'
        }],
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
            handle: this.edit,
          },
          {
            label: '删除',
            color: '#ff5656',
            handle: this.edit,
          }
        ]
      }
    },
    created(){
      this.tableData[0].operation = this.operationStop
    },
    methods: {
      loadPage(currentPage){ // 点击分页器
        console.log(currentPage)
      },
      edit(index, item){
      },
      stop(index, item){
      },
      resetPassword(index, item){
      },
      delete(index, item){
      },
      start(index, item){
      }
    },
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .account-manage {
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
  }
</style>
