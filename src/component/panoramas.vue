<template>
  <div class="panorama-wrap">
    <div class="panorama-content" ref="panorama"></div>
    <div class="btn-wrap">
      <div class="btn-out">退出</div>
      <div class="btn-save">保存</div>
    </div>
  </div>
</template>


<script>
  import PhotoSphereViewer from '../plug/panoramas/index'
  import a from '../assets/test.jpg'
  export default{
    props: {},
    data(){
      return {
        viewer: null
      }
    },
    created(){
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        this.viewer = PhotoSphereViewer({
          container: this.$refs.panorama,
          panorama: a,
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
          gyroscope: true,
        })
        console.log(this.viewer)
        this.viewer.on('click', (a) => {
          console.log(a)
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
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
  }
</style>
