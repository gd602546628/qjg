<template>
  <div class="role-manage">
    <div class="title">角色管理</div>
    <div class="select-form">
      <div class="form-left">
        <div class="form-item">
          <span>角色名称：</span>
          <el-input placeholder="请输入角色名称" class="input" v-model="name"></el-input>
        </div>
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
      </div>
      <div class="form-right">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加角色</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search">检索</el-button>
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
        tableData: [],
        tableHeader: [
          {
            label: '角色名称',
            prop: 'name'
          },
          {
            label: '创建账号',
            prop: 'account'
          },
          {
            label: '创建时间',
            prop: 'time'
          }
        ],
        operation: [
          {
            label: '修改',
            color: '#20a7fe',
            handle(index, item){
              console.log(index, item)
            },
          },
          {
            label: '删除',
            color: '#ff3c3c',
            handle(index, item){
              console.log(index, item)
            },
          }
        ],
        name: '',
        startTime: '',
        endTime: ''
      }
    },
    created(){
      for (let i = 0; i < 20; i++) {
        this.tableData.push({name: 'dance flow', account: '系统管理员', time: '2017-11-23', operation: this.operation})
      }
    },
    methods: {
      loadPage(currentPage){ // 点击分页器
        console.log(currentPage)
      },
      goAdd(){
          this.$router.push({
            name:'addRole'
          })
      },
      deleteAll(val){
          console.log(val)
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
