<template>
  <div class="file-image">
    <div class="image-wrap">
      <div class="image-item" v-for="(item,index) in imageList" @click.stop="selectItem(item,index)">
        <div class="img">
          <video :src="imgPre(item)" class="video" ref="video" @ended="videoEnd(item)">
          </video>
          <div class="size">{{item.size | fileSize}}</div>
          <div v-if="item.selected&&deleteFlag" class="img-selected">
            <p class="el-icon-circle-check-outline icon"></p>
          </div>
          <div v-if="!deleteFlag&&item.play" class="icon-wrap">
            <p class="icon-zt icon"></p>
          </div>
          <div v-if="!deleteFlag&&!item.play" class="icon-wrap">
            <p class="icon-bf icon"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        :page-count="pageCount"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
    <div class="delete-btn-group" v-if="deleteFlag">
      <div class="confirm btn" @click.stop="deleteImg">删除</div>
      <div class="cancel btn" @click.stop="cancelDelete">取消</div>
    </div>
    <div class="bottom" v-if="!deleteFlag">
      <div class="num">视频数量： {{imgNum}}</div>
      <div class="totalSize">空间占用： {{totalSize | fileSize}}</div>
      <div class="btn-group">
        <el-upload
          class="upload-demo"
          :action="this.upload_file"
          :on-success="imgUploadSuccess"
          :before-upload="beforeImgUpload"
          :show-file-list="false"
          :data="{type:4}"
        >
          <div class="btn-upload">上传视频</div>
        </el-upload>
        <div class="btn-delete" @click.stop="showDelete">批量删除</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Api from '@/api/api'
  import {filePre, code, fileSize} from '@/config/config'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        imageList: [],
        deleteFlag: false,
        params: {
          pageNum: 1,
          pageSize: 10,
          type: 4
        },
        total: 1,
        pageCount: 1,
        imgNum: 0,
        totalSize:0
      }
    },
    computed: {
      ...mapGetters(['upload_file']),
    },
    created(){
      this.init()
    },
    methods: {
      init(){
        this.getSourceFile()
      },
      async getSourceFile(){
        let data = await  Api.source.getSourceFile(this.params)
        data.data.list.forEach(item => {
          item.selected = false
          item.play = false
        })
        this.pageCount = data.data.totalPage
        this.total = data.data.allCount
        this.imgNum = data.data.allCount
        this.totalSize = data.data.other
        this.imageList = data.data.list
      },
      loadPage(currentPage){
        this.params.pageNum = currentPage
        this.getSourceFile()
      },
      imgPre(item){
        return filePre + item.url
      },
      showDelete(){
        this.deleteFlag = true
      },
      selectItem(item, index){
        if (!this.deleteFlag) { //预览模式
          if (this.$refs.video[index].paused) {
            this.$refs.video[index].play()
            item.play = true
          } else {
            this.$refs.video[index].pause()
            item.play = false
          }
        } else { // 删除模式
          item.selected = !item.selected
        }
      },
      videoEnd(item){
        item.play = false
      },
      async deleteImg(){ // 删除按钮点击
        await this.$confirm('使用到这些视频的场景可能会失效，确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let ids = []
        this.imageList.forEach((item, index) => {
          if (item.selected) {
            ids.push(item.id)
          }
        })
        this.imageList = this.imageList.filter(item => {
          return ids.every(id => {
            return item.id !== id
          })
        })
        let data = await Api.source.deleteSourceFileById({ids: ids})
        if (data.code == code.SUCCESS) {
          this.imageList = this.imageList.filter(item => {
            return ids.every(id => {
              return item.id !== id
            })
          })
          this.$message.success('删除成功')
        } else {
          this.$message.error(data.mesg)
        }
      },
      cancelDelete(){
        this.deleteFlag = false
      },
      uploadCheck(reg, errMessage, data){
        let test = reg
        let flag = test.test(data.name)
        if (!flag) {
          this.$message.error(errMessage)
        }
        return flag
      },
      imgUploadSuccess(data){
        this.loading.close()
        if (data.code === code.SUCCESS) {
          this.init()
        } else {
          this.$message.error(data.mesg)
        }
      },
      beforeImgUpload(data){
        let flag = this.uploadCheck(/.[mp4]$/g, '只能上传mp4格式', data)
        if (data.size > fileSize.video) {
          this.$message.error(`上传的视频不能大于${fileSize.video / 1024 / 1024}M`)
          return false
        }
        if (flag) {
          this.loading = this.$loading({
            lock: true,
            text: '正在上传视频',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }
        return flag
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .file-image {
    .pagination {
      text-align: center;
      margin: 20px 0;
    }
    .image-wrap {
      padding: 20px 60px;
      display: flex;
      flex-wrap: wrap;
      .image-item {
        width: 25%;
        margin-bottom: 20px;
        .img {
          position: relative;
          width: 90%;
          padding-bottom: 60%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          .icon-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .icon {
              font-size: 50px;
              color: #ffffff;
            }
          }
          .video {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: fill
          }
          .size {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding-left: 12px;
            color: #ffffff;
            font-weight: bold;
            background: rgba(0, 0, 0, 0.5);
          }
          .img-selected {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
              font-size: 50px;
              color: #ffffff;
            }
          }
        }
      }
    }
    .delete-btn-group {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 26px;
      border-top: 1px solid #d9d9d9;
      .btn {
        width: 76px;
        height: 34px;
        border-radius: 4px;
        color: #ffffff;
        background: #ff3c3c;
        cursor: pointer;
        line-height: 34px;
        text-align: center;
        &.cancel {
          background: #abaaaa;
          margin-left: 20px;
        }
      }
    }
    .bottom {
      height: 56px;
      background: #f5f5f9;
      padding: 0 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      .num {
        margin-right: 42px;
        font-weight: bold;
        color: #333333;
      }
      .totalSize {
        font-weight: bold;
        color: #333333;
      }
      .btn-group {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        .btn-upload {
          width: 90px;
          height: 36px;
          border: 1px solid #ff3c3c;
          color: #ff3c3c;
          text-align: center;
          line-height: 36px;
          border-radius: 4px;
          margin-right: 20px;
          cursor: pointer;
        }
        .btn-delete {
          width: 90px;
          height: 36px;
          border: 1px solid #20a7fe;
          color: #20a7fe;
          text-align: center;
          line-height: 36px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
</style>
