<template>
  <div class="file-manage">
    <div class="title">文件管理</div>
    <div class="file-content">
      <div class="tab">
        <div class="tab-item"
             v-for="(item,index) in tabMap"
             @click.stop="tabClick(index)"
             :class="{active:currentIndex==index}"
        >
          {{item}}
        </div>
      </div>
      <div class="file-box">
        <file-image v-show="currentIndex==0"></file-image>
        <file-icon v-show="currentIndex==1"></file-icon>
        <file-video v-show="currentIndex==2"></file-video>
        <file-music v-show="currentIndex==3"></file-music>
        <file-pano v-show="currentIndex==4"></file-pano>
      </div>
    </div>
  </div>
</template>
<script>
  import Api from '@/api/api'
  import fileImage from './fileImage.vue'
  import fileIcon from './fileIcon.vue'
  import fileVideo from './fileVideo.vue'
  import fileMusic from './fileMusic.vue'
  import filePano from './filePanoramas.vue'
  export default{
    components: {
      fileImage,
      fileIcon,
      fileVideo,
      fileMusic,
      filePano
    },
    data(){
      return {
        currentIndex: 0,
        tabMap: ['图片', '图标', '视频', '音频','全景图'],
        imageList: [],
        iconList: [],
        videoList: [],
        musicList: []
      }
    },
    created(){
    },
    methods: {
      tabClick(index){
        this.currentIndex = index
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .file-manage {
    padding: 20px;
    .title {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
    }
    .file-content {
      margin-top: 20px;
      .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        background: #f8e8dd;
        .tab-item {
          display: flex;
          justify-content: center;
          width: 68px;
          height: 100%;
          align-items: center;
          color: #333333;
          cursor: pointer;
          font-weight: bold;
          margin-left: 32px;
          &.active {
            color: #fe842b;
            border-bottom: 4px solid #fe842b;
          }
        }
      }
      .file-box {
        border: 1px dashed #d9d9d9;
        border-top: none;
      }
    }
  }
</style>
