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
          <el-form-item label="密码：" prop="password">
            <el-input v-model="formData1.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom">
        <el-form :model="formData2" :rules="rules2" ref="form2">
          <el-form-item label="选择角色：" prop="role" class="check-wrap">
            <el-radio-group v-model="formData2.role">
              <el-radio :label="item" name="role" v-for="(item,index) in roleList" :key="index">{{item.roleName}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="confirm-btn">
      <div class="q-btn-confirm" @click.stop="submit">确定</div>
      <div class="q-btn-cancel" @click.stop="goBack">取消</div>
    </div>
  </div>
</template>
<script>
  import Api from '@/api/api'
  import {code} from '@/config/config'
  export default{
    data(){
      return {
        formData1: {
          name: '',
          account: '',
          password: ''
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
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ]
        },
        formData2: {
          role: null
        },
        rules2: {
          role: [{required: true, message: '请至少选择一个角色', trigger: 'change'}]
        },
        roleList: [], // 角色列表
      }
    },
    created(){
      this.getRoleList()
    },
    methods: {
      goBack(){
        this.$router.back()
      },
      submit(){
        console.log(this.formData2)
        this.$refs.form1.validate(vali1 => {
          this.$refs.form2.validate(vali2 => {
            if (vali1 && vali2) {
              this.addUser()
            }
          })
        })
      },
      async getRoleList(){
        let data = await Api.getAllRole()
        this.roleList = data.data.list
      },
      async addUser(){
        let params = {
          name: this.formData1.name,
          account: this.formData1.account,
          password: this.formData1.password,
          roleId: this.formData2.role.id,
          roleName: this.formData2.role.roleName
        }
        let data = await Api.addUser(params)
        if (data && data.code == code.SUCCESS) {
          this.$router.back()
        } else {
          this.$message.error(data.mesg)
        }
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .addAccount-page {
    padding: 20px;
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
