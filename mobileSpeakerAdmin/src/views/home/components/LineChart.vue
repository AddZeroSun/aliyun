<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      dataList: {
        dataX: ['12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19'],
        actualData: [100, 120, 161, 134, 105, 160, 165]
      },
      lineChartData: {
        // expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [100, 120, 161, 134, 105, 160, 165]
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.dataList.dataX = val.date
        this.lineChartData.actualData = val.total_num
        this.setOptions(this.lineChartData)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.setOptions(this.lineChartData)
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.dataList.dataX,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0,
            rotate: -45,
            textStyle: {
              color: '#B3B5B9'
            }
          }
        },
        grid: {
          left: 40,
          right: 40,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#B3B5B9'
            }
          }
        },
        legend: {
          data: ['七日注册量']
        },
        series: [
        //   {
        //   name: 'expected', itemStyle: {
        //     normal: {
        //       color: '#FF005A',
        //       lineStyle: {
        //         color: '#FF005A',
        //         width: 2
        //       }
        //     }
        //   },
        //   smooth: true,
        //   type: 'line',
        //   data: expectedData,
        //   animationDuration: 2800,
        //   animationEasing: 'cubicInOut'
        // },
          {
            name: '七日注册量',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#6777EF',
                lineStyle: {
                  color: '#6777EF',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }]
      })
    }
  }
}
</script>
