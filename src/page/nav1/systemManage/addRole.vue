<template>
  <div class="add-role">
    <div class="return" @click="goBack">返回</div>
    <div class="form">
      <div class="title">添加角色</div>
      <div class="middle">
        <div class="middle-input">
          <div class="label">
            <span>*</span>
            <p>角色名称：</p>
          </div>
          <div class="input">
            <el-input v-model="input" placeholder="名称为1-20位汉子、字母、数字、特殊字符"></el-input>
          </div>
        </div>
        <div class="middle-checkbox">
          <div class="label">
            <span>*</span>
            <p>权限配置：</p>
          </div>
          <div class="checkbox-group">
            <el-checkbox v-model="checked" class="box">广告管理</el-checkbox>
            <el-checkbox v-model="checked" class="box">区域管理</el-checkbox>
            <el-checkbox v-model="checked" class="box">项目管理</el-checkbox>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-item">
          <el-checkbox v-model="checked" class="box">系统设置</el-checkbox>
        </div>
        <div class="bottom-item">
          <el-checkbox v-model="checked" class="box">角色管理</el-checkbox>
          <el-checkbox v-model="checked" class="box">账号管理</el-checkbox>
          <el-checkbox v-model="checked" class="box">分类管理</el-checkbox>
        </div>
      </div>
    </div>
    <div class="confirm-btn">
      <div class="q-btn-confirm">确定</div>
      <div class="q-btn-cancel">取消</div>
    </div>
  </div>
</template>


<script>
  export default{
    data(){
      return {
        checked: false,
        input: ''
      }
    },
    methods:{
        goBack(){
            this.$router.back()
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .add-role {
    .return {
      background: #fe842b;
      color: #ffffff;
      height: 28px;
      width: 56px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
    }
    .form {
      border: 1px dashed #d9d9d9;
      border-top: none;
      margin-top: 16px;
      .label {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        span {
          color: red;
          margin-right: 6px;
        }
      }
      .title {
        background: #f8e8dd;
        color: #ff6c00;
        padding-left: 20px;
        height: 46px;
        line-height: 46px;
      }
      .middle {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 26px;
        border-bottom: 1px dashed #d9d9d9;
        .middle-input {
          display: flex;
          width: 600px;
          margin-top: 36px;
          .input {
            flex: 1;
          }
        }
        .middle-checkbox {
          display: flex;
          width: 600px;
          margin-top: 26px;
          .label {
            align-items: flex-start;
          }
          .checkbox-group {
            flex: 1;
            display: flex;
            flex-direction: column;
            .box {
              margin: 0 0 20px 0;
            }
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 26px;
        padding-left: 208px;
        .bottom-item {
          width: 600px;
          display: flex;
          margin-bottom: 26px;
          .box {
            flex: 1;
          }
        }
      }
    }
    .confirm-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 64px;
    }
  }
</style>
