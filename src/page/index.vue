<template>
  <div class="index" ref="index">
    <div class="index-nav">
      <div class="title">示例文字</div>
      <div class="nav">
        <!--  <p class="nav-item active">导航一</p>-->
        <div class="date">2017年12月01日</div>
      </div>
      <div class="user-info">
        <p>Super</p>
        <p>修改信息</p>
        <p>退出</p>
      </div>
    </div>
    <router-view class="index-page"/>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created(){
    },
    mounted(){
      this.$refs.index.style.height = document.documentElement.clientHeight + 'px'
    },
    methods: {}
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .index {
    display: flex;
    flex-direction: column;
    .index-nav {
      display: flex;
      background: #161824;
      height: 62px;
      .nav {
        flex: 1;
        display: flex;
        .nav-item {
          width: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          &.active {
            background: #07c362;
          }
        }
        .date {
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
        }
      }
      .title {
        height: 60px;
        background: #161824;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        font-weight: bold;
        font-size: 32px;
        box-sizing: border-box;
      }
      .user-info {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        p {
          color: #fff;
          margin-right: 16px;
          &:nth-child(2) {
            border-left: 1px solid #fff;
            padding-left: 10px;
          }
          &:nth-child(3) {
            border-left: 1px solid #fff;
            padding-left: 10px;
          }
        }
      }
    }
    .index-page {
      flex: 1;
    }
  }

</style>
