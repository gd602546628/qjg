<template>
  <div class="welcome">
    <div class="wrap">
      <div class="chart-item">
        <div class="title">磁盘使用统计</div>
        <div class="content">
          <div class="left">
            <q-circle :total="total" :data="data"></q-circle>
          </div>
          <div class="right"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import qCircle from '@/component/circle.vue'
  export default{
    components: {
      qCircle
    },
    data(){
      return {
        total: 1000,
        data: [{title: '已使用300M', value: 700, style: '#ff8d6c', lineStyle: '#ff7662', textStyle: '#ff7662'},
          {title: '剩余300M', value: 300, style: '#f5f5f9', lineStyle: '#d9d9d9', textStyle: '#333333'},
        ]
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .welcome {
    padding: 22px;
    background: #eaf1f9;
    width: 100%;
    height: 100%;
    .wrap {
      display: flex;
      flex-wrap: wrap;
      .chart-item {
        width: 49%;
        background: #ffffff;
        border-radius: 6px;
        border: 1px solid #d9d9d9;
        display: flex;
        flex-direction: column;
        &:nth-child(odd) {
          margin-right: 1%;
        }
        &:nth-child(even) {
          margin-left: 1%;
        }
        .title {
          height: 54px;
          border-bottom: 1px solid #d9d9d9;
          padding-left: 20px;
          display: flex;
          color: #333333;
          align-items: center;
        }
        .content {
          height: 376px;
          display: flex;
          flex: 1;
          margin: 0;
          .left {
            flex: 1;
            height: 100%;
          }
          .right {
            width: 30%;
          }
        }
      }
    }
  }
</style>
