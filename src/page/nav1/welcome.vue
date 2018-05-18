<template>
  <div class="welcome">
    <div class="wrap">
      <div class="chart-item">
        <div class="title">磁盘使用统计</div>
        <div class="content">
          <div class="left" ref="circle">
            <!--  <q-circle :total="total" :data="circleData" v-if="showCircle"></q-circle>-->
          </div>
          <div class="right">
            <div class="data-display">
              <div class="data-item">
                <span></span>
                <p>磁盘总容量：{{total}}MB</p>
              </div>
              <div class="data-item" v-for="item in circleData">
                <span :style="{background:item.style}"></span>
                <p>{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-item">
        <div class="title">核销金额统计</div>
        <div class="money-content">
          <div class="year-picker">
            <el-date-picker
              v-model="moneyFormData"
              type="year"
              placeholder="选择年"
              @change="yearChange"
            >
            </el-date-picker>
          </div>
          <div class="money_img" ref="money_img"></div>
          <div class="money-total">
            <p>历史核销金额：{{moneyData.total}}元</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import qCircle from '@/component/circle.vue'
  import Api from '@/api/api'
  import echarts from 'echarts'
  import 'echarts/lib/component/legend'

  export default {
    components: {
      qCircle
    },
    data() {
      return {
        total: 0,
        showCircle: false,
        circleData: [{title: '已使用0M', value: 0, style: '#ff8d6c', lineStyle: '#ff7662', textStyle: '#ff7662'},
          {title: '剩余0M', value: 0, style: '#f5f5f9', lineStyle: '#d9d9d9', textStyle: '#333333'},
        ],
        moneyFormData: new Date(),
        moneyData: {}
      }
    },
    created() {
    },
    mounted() {
      this.getDoorInfo()
      this.getMoneySum()
    },
    methods: {
      async getDoorInfo() {
        let data = await Api.login.getDoorInfo()
        this.total = data.data.total
        this.circleData[0].title = `已使用${data.data.used}M`
        this.circleData[0].value = data.data.used
        this.circleData[1].title = `剩余${this.total - data.data.used}M`
        this.circleData[1].value = this.total - data.data.used
        let circleData = [
          {
            name: '已使用',
            value: data.data.used,
            itemStyle: {color: '#ff8d6c'},
            labelLine: {
              lineStyle: {
                color: '#ff7662'
              }
            },
            label: {
              color: '#ff7662'
            }
          },
          {
            name: '剩余',
            value: this.total - data.data.used,
            itemStyle: {
              normal: {color: '#f5f5f9'},
              emphasis: {color: '#f5f5f9'},
            },
            labelLine: {
              lineStyle: {
                color: '#d9d9d9'
              }
            },
            label: {
              color: '#333333'
            }
          }
        ]
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          series: [
            {
              name: '姓名',
              type: 'pie',
              center: ['50%', '50%'],
              radius: ['35%', '64%'],
              data: circleData,
              label: {
                formatter: '{b}:{c}M',
                color: '#ffffff'
              },
            }
          ]
        }
        echarts.init(this.$refs.circle).setOption(option)
        this.showCircle = true
      },
      async getMoneySum() {
        let data = await Api.card.getMoneySum({year: this.moneyFormData.getFullYear()})
        let timeList = []
        let moneyList = []
        this.moneyData = data.data
        data.data.cardMoneyMothInfos.forEach(item => {
          timeList.push(item.money)
          moneyList.push(item.month + '月')
        })
        let option = {
          grid: {
            top: 10,
            right: 20,
            bottom: 60,
          },
          tooltip: {
            show: true,
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], 130];
            }
          },
          xAxis: {
            type: 'category',
            data: moneyList,
            axisLabel: {
              color: '#333333',
              rotate: '50',
              showMaxLabel: true
            }
          },
          yAxis: {
            name: '数量',
            nameTextStyle: {
              color: '#333333'
            },
            type: 'value',
            axisLabel: {
              color: '#333333'
            }
          },
          series: [
            {
              data: timeList,
              type: 'bar',
              lintStyle: {
                color: '#333333',
              },
              markLine: {
                lintStyle: {
                  color: '#333333',
                  opacity: 0.1
                },
              },
              itemStyle: {
                normal: {
                  color: '#08c062'
                }
              },
            },
          ]
        }
        echarts.init(this.$refs.money_img).setOption(option)
      },
      yearChange() {
        this.getMoneySum()
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
          padding: 0 60px;
          .left {
            flex: 1;
            height: 100%;
          }
          .right {
            display: flex;
            align-items: center;
            .data-display {
              background: #f2f7fb;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              padding: 20px 20px;
              height: 200px;
              border-radius: 6px;
              width: 260px;
              .data-item {
                display: flex;
                align-items: center;
                width: 100%;
                flex: 1;
                span {
                  background: #2ab8fd;
                  width: 40px;
                  height: 20px;
                  border: 1px solid #d9d9d9;
                  display: block;
                }
                p {
                  flex: 1;
                  margin-left: 12px;
                }
              }
            }
          }
        }
        .money-content {
          height: 376px;
          display: flex;
          flex: 1;
          margin: 0;
          padding: 0 60px;
          flex-direction: column;
          .year-picker {
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .money_img {
            flex: 1;
          }
          .money-total {
            margin-bottom: 10px;
          }
        }
      }
    }

  }
</style>
