<template>
  <div class="category-manage">
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
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加项目</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search">检索</el-button>
      </div>
    </div>
    <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true" :hideDelete="true"></q-table>
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
        name: '',
        startTime: '',
        endTime: '',
        tableHeader: [
          {
            label: '项目名称',
            prop: 'name',
            width:'500'
          },
          {
            label: '全景图片',
            prop: 'img'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          }
        ],
        tableData: [
          {
            name: '横店影视城横店影视城横店影视城横店影视城',
            img: '988',
            createTime: '2017-11-23'
          }
        ],
        operation: [
          {
            label: '查看',
            color: '#20a7fe',
            handle: this.look,
          },
          {
            label: '修改',
            color: '#20a7fe',
            handle: this.edit,
          },
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          }
        ],
      }
    },
    created(){
      this.tableData[0].operation = this.operation
    },
    methods: {
      look(index, item){
      },
      edit(index, item){
      },
      delete(index, item){
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .category-manage {
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
  }
</style>
