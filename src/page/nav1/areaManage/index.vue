<template>
  <div class="area-manage-page">
    <div class="title">区域管理</div>
    <div class="select-form" label-width="80px">
      <div class="form-left">
        <div class="top">
          <div class="form-item">
            <span>区域名称：</span>
            <el-input placeholder="搜索区域名称" class="input" v-model="name"></el-input>
          </div>
          <div class="form-item">
            <span>所属城市：</span>
            <el-select v-model="city" placeholder="请选择区域所属城市" class="input">
              <el-option>1 </el-option>
              <el-option> 1</el-option>
            </el-select>
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
        </div>
      </div>
      <div class="form-right">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加区域</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search">检索</el-button>
      </div>
    </div>
    <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true"></q-table>
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
        city: '',
        startTime: '',
        endTime: '',
        tableHeader: [
          {
            label: '区域名称',
            prop: 'name'
          },
          {
            label: '所属城市',
            prop: 'city'
          },
          {
            label: '创建时间',
            prop: 'createdTime'
          }
        ],
        tableData: [
          {
            name: '极中心',
            city: '玉溪市',
            createdTime: '2017-11-23'
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
            label: '查看',
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
      }
    },
    created(){
      this.tableData[0].operation = this.operation
    },
    methods: {
      goAdd(){
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .area-manage-page {
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
  }
</style>
