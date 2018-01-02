<template>
  <div class="role-manage">
    <div class="title">角色管理</div>
    <div class="select-form">
      <div class="form-left">
        <div class="form-item">
          <span>角色名称：</span>
          <el-input placeholder="请输入角色名称" class="input" v-model="selectOption.roleName"></el-input>
        </div>
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
      </div>
      <div class="form-right">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加角色</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search" @click.stop="select">检索</el-button>
      </div>
    </div>
    <q-table :tableHeader="tableHeader"
             :tableData="tableData"
             :showOperation="true"
             @deleteAll="deleteAll"
    ></q-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="loadPage"
        :page-size="this.selectOption.pageSize"
        :page-count="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import qTable from '@/component/table.vue'
  import Api from '@/api/api'
  export default{
    components: {
      qTable
    },
    data(){
      return {
        tableData: [],
        tableHeader: [
          {
            label: '角色名称',
            prop: 'roleName'
          },
          {
            label: '创建账号',
            prop: 'createUser'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          }
        ],
        operation: [
          {
            label: '修改',
            color: '#20a7fe',
            handle: this.editHanld,
          },
          {
            label: '删除',
            color: '#ff3c3c',
            handle(index, item){
              console.log(index, item)
            },
          }
        ],
        selectOption: {
          roleName: '',
          startTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 20
        },
        pageCount: 1,
        total: 1
      }
    },
    created(){
      this.init()
    },
    methods: {
      loadPage(currentPage){ // 点击分页器
        console.log(currentPage)
      },
      goAdd(){
        this.$router.push({
          name: 'addRole'
        })
      },
      deleteAll(val){
        console.log(val)
      },
      async getAllRole(){
        let data = await Api.getAllRole(this.selectOption)
        data = data.data
        this.total = data.allCount
        this.pageCount = data.totalPage
        let list = data.list
        list.forEach(item => {
          item.operation = this.operation
        })
        return list
      },
      async init(){
        let list = await this.getAllRole()
        this.tableData = list
      },
      async select(){
        this.selectOption.pageNum = 1
        let list = await this.getAllRole()
        this.tableData = list
      },
      editHanld(index, item){
        this.$router.push({
          name: 'addRole',
          params: {
            id: item.id
          }
        })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .role-manage {
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
        .form-item {
          display: flex;
          align-items: center;
          .input {
            width: 200px;
            margin-left: 12px;
          }
        }
        .date-picker {
          margin-top: 12px;
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
