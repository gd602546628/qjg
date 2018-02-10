<template>
  <div class="page-wrap">
    <div class="category-manage-box">
      <el-scrollbar class="scroll-bar">
        <div class="scroll-content">
          <div class="title">分类管理</div>
          <div class="add-category">
            <span class="el-icon-plus"></span>
            <div>添加分类</div>
          </div>
          <ul class="category-list">
            <li>极中心</li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
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
          <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="addProject">添加项目</el-button>
          <el-button type="primary" class="select-btn" icon="el-icon-search">检索</el-button>
        </div>
      </div>
      <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true" :hideDelete="true"></q-table>
    </div>
    <common-model title="添加项目" :show="showModel" @closeModel="closeModel" class="model-form">
      <el-form class="form" :model="formData" :rules="rules">

        <el-form-item label="项目名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>

        <el-form-item label="项目分类：" prop="category">
          <el-select v-model="formData.category" placeholder="请选择项目分类">
            <el-option label="分类一" value="shanghai"></el-option>
            <el-option label="分类二" value="beijing"></el-option>
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
        name: '',
        startTime: '',
        endTime: '',
        showModel: false,
        tableHeader: [
          {
            label: '项目名称',
            prop: 'name'
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
        formData: {
          name: '',
          category: ''
        },
        rules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}],
          category: [{required: true, message: '请选择一个分类', trigger: 'change'}]
        }
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
      },
      addProject(){ // 添加项目
        this.showModel = true
      },
      closeModel(){
        this.showModel = false
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .page-wrap {
    display: flex;
    height: 100%;
    .category-manage {
      flex: 1;
      padding: 20px;
      .select-form {
        background: #e7ecf2;
        border-radius: 6px;
        padding: 16px;
        display: flex;
        margin-bottom: 20px;
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
    .category-manage-box {
      overflow: hidden;
      background-image: url("../../../assets/image/xmgl_bg.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      min-width: 210px;
      border-top: 1px solid #434552;
      height: 100%;
      .scroll-bar{
        height: 100%;
        position: relative;
        bottom: -17px;
        .scroll-content{
          padding: 20px;
          .title {
            color: #ffffff;
            font-weight: 600;
          }
          .add-category {
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            color: #20a7fe;
            margin: 20px 0 14px 0;
            cursor: pointer;
            span {
              margin-right: 6px;
            }
          }
          .category-list {
            li {
              padding-left: 20px;
              color: #ffffff;
              height: 22px;
              margin-top: 6px;
              &:hover {
                background: #443f45;
                color: #20a7fe;
              }
            }
          }
        }
      }
    }
    .model-form {
      .form {
        //height: 196px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .el-form-item {
          display: flex;
          .el-select {
            width: 100%;
          }
          .el-form-item__content {
            width: 320px;
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
