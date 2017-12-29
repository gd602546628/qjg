<template>
  <div class="addAccount-page">
    <div class="return" @click="goBack">返回</div>
    <div class="form">
      <div class="title">添加账号</div>
      <div class="middle">
        <el-form :model="formData1" :rules="rules1" ref="form1">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="formData1.name"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="account">
            <el-input v-model="formData1.account"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input type="textarea" v-model="formData1.remarks"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom">
        <el-form :model="formData2" :rules="rules2" ref="form2">
          <el-form-item label="选择角色：" prop="role" class="check-wrap">
            <el-checkbox-group v-model="formData2.role">
              <el-checkbox label="项目管理员" name="role"></el-checkbox>
              <el-checkbox label="区域管理员" name="role"></el-checkbox>
              <el-checkbox label="广告管理员" name="role"></el-checkbox>
              <el-checkbox label="系统管理员" name="role"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="confirm-btn">
      <div class="q-btn-confirm" @click.stop="submit">确定</div>
      <div class="q-btn-cancel">取消</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        formData1: {
          name: '',
          account: '',
          remarks: ''
        },
        rules1: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          remarks: [
            {required: true, message: '请输入备注', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ]
        },
        formData2: {
          role: []
        },
        rules2: {
          role: [{type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change'}]
        }
      }
    },
    methods: {
      goBack(){
        this.$router.back()
      },
      submit(){
        this.$refs.form1.validate(vali1 => {
          this.$refs.form2.validate(vali2 => {
            console.log(vali1 && vali2)
          })
        })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .addAccount-page {
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
        padding-bottom: 40px;
        .el-form {
          width: 570px;
          .el-form-item {
            display: flex;
            margin-top: 26px;
            .el-form-item__content {
              flex: 1;
            }
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 26px;
        .el-form {
          width: 570px;
          .el-checkbox-group {
            display: flex;
            flex-direction: column;
            .el-checkbox {
              margin-left: 0;
            }
          }
        }
      }
    }
    .confirm-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 64px;
    }
  }
</style>
