<template>
  <div class="area-manage-page">
    <div class="title">区域管理</div>
    <div class="select-form" label-width="80px">
      <div class="form-left">
        <div class="top">
          <div class="form-item">
            <span>区域名称：</span>
            <el-input placeholder="搜索区域名称" class="input" v-model="searchOption.name"></el-input>
          </div>
          <div class="form-item">
            <span>所属城市：</span>
            <el-select v-model="searchOption.city" placeholder="请选择区域所属城" class="input">
              <el-option value="1">1 </el-option>
              <el-option value="2"> 1</el-option>
            </el-select>
          </div>
        </div>
        <div class="bottom">
          <div class="form-item date-picker">
            <div class="wrap">
              <span>创建时间：</span>
              <el-date-picker
                v-model="searchOption.startTime"
                type="datetime"
                placeholder="选择开始时间"
                class="picker"
              >
              </el-date-picker>
              <span class="line"></span>
              <el-date-picker
                v-model="searchOption.endTime"
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
    <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true" :hideDelete="true"></q-table>
    <common-model :show="showModel" title="添加区域" @closeModel="closeModel" class="add-model">
      <el-form class="add-form" :model="addOption" :rules="rules">
        <el-form-item label="区域名称：" prop="name">
          <el-input v-model="addOption.name" placeholder="请输入区域名称"></el-input>
        </el-form-item>
        <el-form-item label="所在城市：" prop="area" class="is-required">
          <el-select v-model="addOption.area.province" placeholder="省">

            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select v-model="addOption.area.city" placeholder="市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select v-model="addOption.area.county" placeholder="区/县">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm">确定</div>
        <div class="q-btn-cancel">取消</div>
      </div>
    </common-model>
  </div>

</template>
<script>
  import qTable from '@/component/table.vue'
  import commonModel from '@/component/commonModel.vue'
  export default{
    components: {
      qTable,
      commonModel
    },
    data(){
      return {
        searchOption: {
          name: '',
          city: '',
          startTime: '',
          endTime: ''
        },
        addOption: {
          name: '',
          area: {
            province: '',
            city: '',
            county: ''
          }
        },
        showModel: false,
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
        rules: {
          name: [{required: true, message: '请输入区域名称', trigger: 'blur'},
            {min: 1, max: 20, message: '区域名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}],
          area: [{validator: this.areaCheck, trigger: 'change'}]
        }
      }
    },
    created(){
      this.tableData[0].operation = this.operation
    },
    methods: {
      areaCheck(rule, value, callback){ // 自定义区域规则
        if (!this.addOption.area.province) {
          callback(new Error('请选择省份'))
        } else if (!this.addOption.area.city) {
          callback(new Error('请选择城市'))
        } else if (!this.addOption.area.county) {
          callback(new Error('请选择区县'))
        } else {
          callback()
        }
      },
      goAdd(){ //添加区域点击
        this.showModel = true
      },
      closeModel(){
        this.showModel = false
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
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
    .add-model{
      .add-form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 50px 56px;
        .el-form-item {
          display: flex;
          align-items: center;
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
