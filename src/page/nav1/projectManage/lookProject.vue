<template>
  <div class="lookProject-wrap">
    <div class="lookProject" v-show="!showViewer">
      <!--<div class="page-title">项目管理</div>-->
      <common-box title="项目管理" :showBack="true">
        <div class="project-image">
          <div class="item-wrap" v-for="(item,index) in imgList" :key="item.id">
            <div class="item" :style="{backgroundImage:backgroundImgFormat(item)}">
              <div class="label">{{item.name}}</div>
              <div class="hover">
                <div class="hover-wrap">
                  <div class="edit" @click.stop="edit(item)">
                    <span class="el-icon-edit"></span>
                  </div>
                  <div class="delete" @click.stop="deleteItem(item,index)">
                    <span class="el-icon-delete"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-wrap" @click.stop="openAddModel">
            <div class="item-upload">
              <p class="el-icon-plus icon"></p>
            </div>
          </div>
        </div>
      </common-box>
      <common-model title="添加全景图" :show="showAddModel" @closeModel="closeModel" class="add-model">
        <el-form class="add-image-form" :model="addImgData" :rules="rules" ref="uploadForm" label-width="100px">

          <el-form-item label="名称：" prop="name">
            <el-input v-model="addImgData.name" placeholder="请填写图片名称">

            </el-input>
          </el-form-item>

          <el-form-item label="描述：" prop="content">
            <el-input v-model="addImgData.content" placeholder="请填写图片描述">
            </el-input>
          </el-form-item>

          <el-form-item label="背景音乐：" class="upload-form-item">
            <div class="upload-box">
              <el-upload
                class="avatar-uploader"
                :action="source_Upload_sound"
                :show-file-list="false"
                :on-success="bgmUploadSuccess"
                :before-upload="beforeBgmUpload"
              >
                <span class="el-icon-plus avatar-uploader-icon"></span>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="项目图片：" prop="url" class="upload-form-item">
            <div class="upload-box">
              <el-upload
                class="avatar-uploader"
                :action="source_Upload"
                :show-file-list="false"
                :on-success="imgUploadSuccess"
                :before-upload="beforeImgUpload"
              >
                <img v-if="addImgData.url" :src="addImgData.url" class="avatar">
                <span v-if="!addImgData.url" class="el-icon-plus avatar-uploader-icon"></span>
              </el-upload>
            </div>
          </el-form-item>

        </el-form>
        <div class="btn-group">
          <div class="q-btn-confirm" @click.stip="uploadImgConfirm">确定</div>
          <div class="q-btn-cancel" @click="closeModel()">取消</div>
        </div>
      </common-model>
    </div>
    <panoramas v-if="showViewer" :sourceId="currentSource.id" :img="currentSource.url" @out="outHanld"></panoramas>
  </div>
</template>


<script>
  import commonBox from '@/component/commonBox.vue'
  import Api from '@/api/api'
  import commonModel from '@/component/commonModel.vue'
  import{mapGetters} from 'vuex'
  import {filePre, code} from '@/config/config'
  import panoramas from '@/component/panoramas.vue'
  export default{
    data(){
      return {
        imageUrl: '',
        showAddModel: false,
        imgList: [],
        currentObject: null,
        addImgData: {
          bgsnd: '',
          content: '',
          name: '',
          url: ''
        },
        rules: {
          content: [{required: true, message: '请输入描述', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          url: [{required: true, message: '请上传图片', trigger: 'blur'}]
        },
        showViewer: false,
        currentSource: {},
        uploadImgList: [],
        loading: null
      }
    },
    computed: {
      ...mapGetters(['source_Upload', 'source_Upload_sound'])
    },
    components: {
      commonBox,
      commonModel,
      panoramas
    },
    created(){
      this.init()
    },
    methods: {
      bgmUploadSuccess(data){
        this.loading.close()
        this.addImgData.bgsnd = data.data
      },
      imgUploadSuccess(data){
        this.loading.close()
        this.addImgData.url = filePre + data.data
      },
      openAddModel(){
        this.showAddModel = true
        this.addImgData = {
          bgsnd: '',
          content: '',
          name: '',
          url: ''
        }
      },
      async getImgList(){
        let data = await Api.source.getList({
          objectId: this.$route.params.id
        })
        this.imgList = data.data
      },
      async getObject(){
        let data = await Api.sourceObject.getById({
          id: this.$route.params.id
        })
        this.currentObject = data.data
      },
      init(){
        this.getImgList()
        this.getObject()
      },
      closeModel(){
        this.showAddModel = false
      },
      uploadImgConfirm(){
        this.$refs.uploadForm.validate(async validate => {
          if (validate) {
            let data = await Api.source.add({
              bgsnd: this.addImgData.bgsnd,
              content: this.addImgData.content,
              name: this.addImgData.name,
              url: this.addImgData.url.split(filePre)[1],
              objectId: this.$route.params.id
            })
            if (data.code === code.SUCCESS) {
              this.$message.success('添加成功')
              this.closeModel()
              this.imgList.push(data.data)
            } else {
              this.$message.error(data.error)
            }
          }
        })
      },
      beforeBgmUpload(data){
        let test = /.mp3$/g
        let flag = test.test(data.name)
        if (!flag) {
          this.$message.error('只能上传mp3格式')
        } else {
          this.loading = this.$loading({
            lock: true,
            text: '正在上传背景音乐',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }
        return flag
      },
      beforeImgUpload(data){
        let test = /.[jepg|png|jpg]$/g
        let flag = test.test(data.name)
        if (!flag) {
          this.$message.error('只能上传jepg,jpg,png格式')
        } else {
          this.loading = this.$loading({
            lock: true,
            text: '正在上传图片',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }
        return flag
      },
      edit(item){
        this.currentSource = item
        this.showViewer = true
        console.log(item)
      },
      async deleteItem(item, index){
        let data = await Api.source.deleteById({
          id: item.id
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('删除成功')
          this.imgList.splice(index, 1)
        } else {
          this.$message.error(data.mesg)
        }
      },
      backgroundImgFormat(item){
        return `url(${filePre + item.url})`
      },
      outHanld(){
        this.showViewer = false
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .lookProject-wrap {
    width: 100%;
    height: 100%;
    .lookProject {
      padding: 20px;
      .page-title {
        font-weight: 600;
        font-size: 16px;
      }
      .project-image {
        padding: 18px;
        font-size: 0;
        .item-wrap {
          display: inline-block;
          width: 25%;
          text-align: center;
          margin-top: 10px;
          vertical-align: top;
          overflow: hidden;
          box-sizing: border-box;
          .item {
            width: 96%;
            padding-bottom: 64%;
            position: relative;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            overflow: hidden;
            &:hover {
              .hover {
                transform: translateY(0);
              }
            }
            .label {
              position: absolute;
              bottom: 0;
              height: 30px;
              line-height: 30px;
              color: #ffffff;
              font-weight: bold;
              text-align: left;
              padding-left: 10px;
              background: rgba(0, 0, 0, 0.8);
              width: 100%;
              font-size: 16px;
            }
            .hover {
              height: 100%;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background: rgba(0, 0, 0, 0.5);
              transform: translateY(100%);
              transition: all 0.2s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              .hover-wrap {
                display: flex;
                align-items: center;
                justify-content: center;
                .edit, .delete {
                  height: 60px;
                  width: 60px;
                  background: #07c362;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  span {
                    color: #ffffff;
                    font-size: 30px;
                  }
                }
                .delete {
                  background: #ff3c3c;
                  margin-left: 30px;
                }
              }
            }
          }
          .item-upload {
            width: 96%;
            padding-bottom: 64%;
            cursor: pointer;
            border: 1px dashed #d9d9d9;
            position: relative;
            &:hover {
              border: 1px dashed #20a7fe;
            }
            .icon {
              color: #8c939d;
              width: 30px;
              height: 30px;
              font-size: 30px;
              position: absolute;
              left: 50%;
              top: 40%;
              margin-left: -15px;

            }
          }
        }
      }

      .add-model {
        .btn-group {
          display: flex;
          justify-content: center;
          border-top: 1px solid #d9d9d9;
          padding-top: 30px;
        }
        .add-image-form {
          width: 70%;
          margin: 0 auto;
          .el-form-item {
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 20px;
            .el-form-item__content {
              flex: 1;
              margin-left: 0 !important;
            }
          }
          .upload-form-item {
            justify-content: flex-start;
            .upload-box {
              .pro-image {
                font-size: 14px;
                color: #606266;
                margin-right: 12px;
              }
              .avatar-uploader {
                width: 178px;
                height: 178px;
                display: flex;
                align-items: center;
                justify-content: center;
                .avatar {
                  width: 100%;
                  height: 100%;
                }
                .el-upload {
                  border: 1px dashed #d9d9d9;
                  border-radius: 6px;
                  cursor: pointer;
                  position: relative;
                  overflow: hidden;
                  display: flex;
                  align-items: center;
                  justify-content: center;
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
              }
            }
          }
        }

      }
    }
  }
</style>
