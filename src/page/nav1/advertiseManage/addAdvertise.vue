<template>
  <div class="add-advertise-page">
    <common-box title="添加广告">
      <div class="form">
        <el-form :model="formData" :rules="rules">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="formData.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <div class="upload">
            <span class="label">标题图：</span>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture"
              :on-success="uploadSuccess"
              :multiple="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <span v-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></span>
            </el-upload>
          </div>
          <el-form-item label="内容来源：" prop="link">
            <el-radio-group v-model="formData.link">
              <el-radio label="内部文章"></el-radio>
              <el-radio label="外部url"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div></div>
    </common-box>
    <div class="btn-group">
      <div class="q-btn-confirm">确定</div>
      <div class="q-btn-cancel">取消</div>
    </div>
  </div>
</template>
<script>
  import commonBox from '@/component/commonBox.vue'
  export default{
    components: {
      commonBox
    },
    data(){
      return {
        formData: {
          title: '',
          link: ''
        },
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 20, message: '标题为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}],
          link:[ { required: true, message: '请选择内容来源', trigger: 'change' }]
        },
        imageUrl: ''
      }
    },
    methods: {
      uploadSuccess(){
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .add-advertise-page {
    padding: 20px;
    .form {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .el-form-item {
        display: flex;
        .el-form-item__content {
          width: 720px;
        }
        .el-form-item__label {
          width: 100px;
        }
      }
      .upload {
        display: flex;
        .label {
          width: 100px;
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #606266;
          line-height: 40px;
          padding: 0 12px 0 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .avatar-uploader {
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
      }
    }
    .btn-group {
      display: flex;
      justify-content: center;
      padding-top: 30px;
    }
  }
</style>
