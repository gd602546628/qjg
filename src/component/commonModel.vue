<template>
  <div class="common-model" v-if="show">
    <div class="wrap">
      <div class="box">
        <div class="header">
          <p>{{title}}</p>
          <span class="el-icon-close" @click.stop="close"></span>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      title: String,
      show: Boolean
    },
    created(){
    },
    methods: {
      close(){
        this.$emit('closeModel')
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .common-model {
    z-index: 1000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    .wrap{
      margin-top: 288px;
      .box {
        min-width: 620px;
        background: #ffffff;
        border-radius: 0 0 6px 6px;
        padding-bottom: 30px;
        .header {
          height: 44px;
          background: #20a7fe;
          padding: 0 20px;
          display: flex;
          align-items: center;
          color: #ffffff;
          p {
            flex: 1;
          }
          span {
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
