<template>
  <div class="lookProject">
    <!--<div class="page-title">项目管理</div>-->
    <common-box title="项目管理" :showBack="true">
      <div class="project-image">
        <div class="item-wrap" v-for="item in new Array(20)">
          <div class="item">
            <div class="label">次卧</div>
            <div class="hover">
              <div class="hover-wrap">
                <div class="edit">
                  <span class="el-icon-edit"></span>
                </div>
                <div class="delete">
                  <span class="el-icon-delete"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </common-box>
  </div>
</template>


<script>
  import commonBox from '@/component/commonBox.vue'
  export default{
    components: {
      commonBox
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .lookProject {
    padding: 20px;
    .page-title {
      font-weight: 600;
      font-size: 16px;
    }
    .project-image {
      padding: 18px 0 18px 18px;
      .item-wrap {
        display: inline-block;
        width: 25%;
        text-align: center;
        margin-top: 10px;
        .item {
          width: 96%;
          padding-bottom: 64%;
          position: relative;
          background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514642295006&di=27a3b80602b8aa0754a4e462ec7bb510&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110716%2F0016027999788422_b.jpg');
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
                span{
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
      }
    }
  }
</style>
