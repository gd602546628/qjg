<template>
  <div class="panorama-wrap">
    <div class="panorama-content" ref="panorama"></div>
    <div class="btn-wrap">
      <div class="btn-out" @click.stop="out">退出</div>
      <div class="btn-save" @click.stop="save">保存</div>
    </div>
    <common-model :show="showModel" title="添加热点" class="model" @closeModel="closeModel">
      <div class="select-category" v-show="currentType==-1">
        <el-form class="form" :model="formData" :rules="rules" ref="addForm">

          <el-form-item label="热点名称：" prop="title">
            <el-input v-model="formData.title" placeholder="请输入热点名称"></el-input>
          </el-form-item>

          <el-form-item label="热点类型：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择热点类型" @change="typeChange">
              <el-option label="文字" :value="0"></el-option>
              <el-option label="链接" :value="1"></el-option>
              <el-option label="场景" :value="2"></el-option>
              <el-option label="图片" :value="3"></el-option>
              <el-option label="视频" :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="指示图标：" prop="icon">
            <el-upload
              class="upload-demo"
              :action="this.source_Upload_icon"
              :limit="1"
              :file-list="iconList"
              :on-success="iconUploadSuccess"
              :before-upload="beforeIconUpload"
              :on-remove="removeFileList"
            >
              <el-button size="small" type="primary">添加自定义图标</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="">
            <div class="sysIcon-wrap">
              <el-radio v-model="selectSysIcon" :label="item" v-for="item in sysIconList" :key="item.id">
                <img :src="addFilePre(item.url)" style="height: 20px; width: 20px">
              </el-radio>
            </div>
          </el-form-item>
        </el-form>
        <div class="btn-group">
          <div class="q-btn-confirm" @click.stip="nextStep">下一步</div>
          <div class="q-btn-cancel" @click="closeModel()">取消</div>
        </div>
      </div>

      <div class="add-text add" v-show="currentType==0">
        <div class="wrap">
          <el-input
            type="textarea"
            :rows="6"
          >
          </el-input>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
      <div class="add-link add" v-show="currentType==1">
        <div class="wrap">
          <el-form :model="formData">
            <el-form-item label="链接地址">
              <el-input v-model="formData.url"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
      <div class="add-cj add" v-show="currentType==2">

      </div>
      <div class="add-image add" v-show="currentType==3">
        <div class="wrap">
          <el-upload
            class="upload-demo"
            :action="this.source_Upload_img"
            :limit="1"
            :file-list="imgList"
            :on-success="imgUploadSuccess"
            :before-upload="beforeImgUpload"
            :on-remove="removeFileList"
          >
            <el-button size="medium" type="primary">添加图片</el-button>
          </el-upload>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
      <div class="add-video add" v-show="currentType==4">
        <div class="wrap">
          <el-upload
            class="upload-demo"
            :action="this.source_Upload_video"
            :limit="1"
            :file-list="imgList"
            :on-success="videoUploadSuccess"
            :before-upload="beforeVideoUpload"
            :on-remove="removeFileList"
          >
            <el-button size="medium" type="primary">添加视频</el-button>
          </el-upload>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
    </common-model>
  </div>
</template>


<script>
  import PhotoSphereViewer from '../plug/panoramas/index'
  import commonModel from '@/component/commonModel.vue'
  import util from '@/service/util'
  import {filePre, code} from '@/config/config'
  import Api from '@/api/api'
  import {mapGetters} from 'vuex'
  export default{
    props: {
      sourceId: Number,
      img: String
    },
    components: {
      commonModel
    },
    computed: {
      ...mapGetters(['source_Upload_icon', 'source_Upload_img', 'source_Upload_video'])
    },
    data(){
      return {
        viewer: null,
        showModel: false,
        formData: {
          ath: '',
          atv: '',
          icon: '',
          image: '',
          latitude: '',
          longitude: '',
          sceneId: '',
          sourceId: '',
          title: '',
          type: '',
          url: '',
          video: ''
        },
        rules: {
          title: [{required: true, message: '请输入热点名称', trigger: 'blur'}],
          type: [{required: true, message: '请选择热点类型', trigger: 'blur'}],
          icon: [{required: true, message: '请选择图标', trigger: 'blur'}]
        },
        iconList: [],
        imgList: [],
        videoList: [],
        currentType: -1,
        saveFlag: false,
        sysIconList: [], // 服务器icon列表
        selectSysIcon: null,
        addPointList: [], // 已添加的热点
        deletePointIds: [] // 要删除的热点id
      }
    },
    created(){
    },
    mounted(){
      this.init()
    },
    destroyed(){
      this.destroyViewer()
    },
    methods: {
      async init(){
        let markList = await this.hotGetList()
        this.saveFlag = false
        this.sourceId = this.sourceId
        this.viewer = PhotoSphereViewer({
          container: this.$refs.panorama,
          panorama: filePre + this.img,
          markers: markList,
          default_fov: 90,
          fisheye: false,
          max_fov: 75,
          time_anim: false,
          navbar: [
            'autorotate',
            'zoom',
            'download',
            // 'markers',
            'spacer-1',
            'caption',
            'gyroscope',
            'fullscreen'
          ],
          lang: {
            autorotate: 'Automatic rotation',
            zoom: 'Zoom',
            zoomOut: 'Zoom out',
            zoomIn: 'Zoom in',
            download: 'Download',
            fullscreen: 'Fullscreen',
            markers: 'Markers',
            gyroscope: 'Gyroscope'
          },
          gyroscope: true
        })
        this.viewer.on('click', (a) => {
          this.viewerClick(a)
        })
        this.viewer.on('select-marker', async (marker, dbclick) => {
          if (!dbclick) return
          await this.$confirm('确定删除热点吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          if (marker.data.flag) { // 新添加的点
            let indexFlag = -1
            this.addPointList.forEach((item, index) => {
              if (item.flag == marker.data.flag) {
                indexFlag = index
              }
            })
            if (indexFlag >= 0) {
              this.addPointList.splice(indexFlag, 1)
            }
          } else {
            this.deletePointIds.push(marker.data.id)
          }
          this.viewer.removeMarker(marker)
        })
      },
      closeModel(){
        this.showModel = false
        this.currentType = -1
        this.formData = {
          ath: '',
          atv: '',
          icon: '',
          image: '',
          latitude: '',
          longitude: '',
          sceneId: '',
          sourceId: '',
          title: '',
          type: '',
          url: '',
          video: ''
        }
        this.sysIconList = []
        this.selectSysIcon = null
      },
      nextStep(){ //下一步
        console.log(this.formData)
        if (!this.formData.icon && this.selectSysIcon) {
          this.formData.icon = this.selectSysIcon.url
        }
        this.$refs.addForm.validate(async validate => {
          if (validate) {
            console.log(this.formData)
            if (this.formData.type == 0) {
              this.done()
            } else {
              this.currentType = this.formData.type
            }
          }
        })
      },
      preStep(){
        this.currentType = -1
      },
      done(){
        this.formData.sourceId = this.sourceId
        this.formData.flag = util.getRandomString()
        this.addPointList.push(Object.create(this.formData))
        this.addMarker()
        this.closeModel()
      },
      viewerClick(a){ // 场景点击
        this.showModel = true
        this.formData.longitude = a.longitude
        this.formData.latitude = a.latitude
        this.formData.ath = util.getLongitude(a.longitude)
        this.formData.atv = util.getLatitude(a.latitude)
      },
      destroyViewer(){
        if (this.viewer) {
          this.viewer.destroy()
          this.viewer = null
        }
      },
      async out(){
        if (!this.saveFlag) {
          await this.$confirm('您还未保存，是否退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.saveFlag = false
          this.$emit('out')
          this.destroyViewer()
        } else {
          this.saveFlag = false
          this.$emit('out')
          this.destroyViewer()
        }
      },
      async save(){
        let params = []
        this.addPointList.forEach(item => {
          let obj = {}
          for (let key in item) {
            obj[key] = item[key]
          }
          params.push(obj)
        })
        Api.source.hotDelete({ids: this.deletePointIds})
        let data = await Api.source.hotAdd(params)
        if (data.code === code.SUCCESS) {
          this.$message.success('保存成功')
          this.saveFlag = true
        } else {
          this.$message.error(data.mesg)
        }
      },
      async hotGetList(){
        let data = await Api.source.hotGetList({
          sourceId: this.sourceId
        })
        let result = []
        data.data.forEach(item => {
          result.push({
            id: util.getRandomString(),
            html: `<div style="background: black;color: white;text-align: center;">
<b>${item.title}</b></div>
<div></div>
<img src="${filePre + item.icon}" width="50px" height="50px">`,
            longitude: item.longitude,
            latitude: item.latitude,
            data: item
          })
        })
        return result
      },
      videoUploadSuccess(data){
        this.formData.video = data.data
        console.log(data)
      },
      beforeVideoUpload(data){
        return this.uploadCheck(/.mp4$/g, '只能上传MP4格式的音频', data)
      },
      iconUploadSuccess(data){
        this.formData.icon = data.data
        console.log(data)
      },
      beforeIconUpload(data){
        return this.uploadCheck(/.[jepg|png|jpg]$/g, '只能上传jepg,jpg,png格式', data)
      },
      imgUploadSuccess(data){
        this.formData.image = data.data
        console.log(data)
      },
      beforeImgUpload(data){
        return this.uploadCheck(/.[jepg|png|jpg]$/g, '只能上传jepg,jpg,png格式', data)
      },
      removeFileList(){ // 每个上传组件，移除文件列表  0 icon 1 img 2video
        let type = this.currentType
        if (type === 0) {
          this.formData.icon = ''
        } else if (type === 3) {
          this.formData.image = ''
        } else if (type === 4) {
          this.formData.video = ''
        }
      },
      async typeChange(value){ // 类型选择选项更改，变换图标
        let data = await Api.source.iconGetList({
          type: value
        })
        this.sysIconList = data.data
      },
      addFilePre(value){
        return filePre + value
      },
      addMarker(){ // 绘制
        let option = {
          id: util.getRandomString(),
          html: `<div style="background: black;color: white;text-align: center;">
<b>${this.formData.title}</b></div>
<div></div>
<img src="${filePre + this.formData.icon}" width="50px" height="50px">`,
          longitude: this.formData.longitude,
          latitude: this.formData.latitude,
          data: this.formData
        }
        this.viewer.addMarker(option)
      },
      uploadCheck(reg, errMessage, data){
        // let test = /.mp3$/g
        let test = reg
        let flag = test.test(data.name)
        if (!flag) {
          this.$message.error(errMessage)
        }
        return flag
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .panorama-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .panorama-content {
      width: 100%;
      height: 100%;
    }
    .btn-wrap {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      z-index: 10;
      div {
        width: 76px;
        height: 34px;
        border-radius: 4px;
        text-align: center;
        line-height: 34px;
        color: #FFFFFF;
        margin-left: 20px;
        margin-top: 20px;
        cursor: pointer;
      }
      .btn-save {
        background: #146498;
      }
      .btn-out {
        background: #9a2424;
      }
    }
    .model {
      .select-category {
        .form {
          width: 70%;
          margin: 0 auto;
          padding-top: 20px;
          .el-form-item {
            display: flex;
            .el-form-item__content {
              flex: 1;
              .el-select {
                width: 100%;
              }
            }
          }
        }
        .btn-group {
          display: flex;
          justify-content: center;
          border-top: 1px solid #d9d9d9;
          padding-top: 30px;
        }
        .sysIcon-wrap {
          margin-left: 90px;
        }
      }
      .add {
        padding-top: 20px;
        .wrap {
          width: 70%;
          margin: 0 auto;
          padding-bottom: 20px;
        }
        .btn-group {
          display: flex;
          justify-content: center;
          border-top: 1px solid #d9d9d9;
          padding-top: 30px;
        }
      }
      .add-image, .add-video {
        .wrap {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
