<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

// const animationDuration = 6000

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
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      dataDetail: this.list
    }
  },
  watch: {
    list(val) {
      this.dataDetail = val
      this.setOptions(val.date, val.ip_num, val.product_num)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      const data = ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日']
      const product_num = [150, 232, 201, 154, 190]
      const ip_num = [150, 232, 201, 154, 190]
      this.setOptions(data, product_num, ip_num)
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
      this.setOptions(this.list)
    },
    setOptions(_data, _ip_num, _product_num,) {
      this.chart.setOption({
        color: ['#0097FF', '#CFD7E1'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['IP订单', '商品订单']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: -45,
              textStyle: {
                color: '#B3B5B9'
              }
            },
            data: _data
          }
        ],
        grid: {
          left: 40,
          right: 40,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#B3B5B9'
              }
            }
          }
        ],
        series: [
          {
            name: 'IP订单',
            type: 'bar',
            label: 90,
            data: _ip_num
          },
          {
            name: '商品订单',
            type: 'bar',

            label: 90,
            data: _product_num
          }
        ]
      })
    }
    // initChart() {
    //   this.chart = echarts.init(this.$el, 'macarons')

    //   this.chart.setOption({
    //     color: ['#0097FF', '#E4ECF9'],
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'shadow'
    //       }
    //     },
    //     legend: {
    //       data: ['IP订单', '商品订单']
    //     },
    //     toolbox: {
    //       show: true,
    //       orient: 'vertical',
    //       left: 'right',
    //       top: 'center',
    //       feature: {
    //         mark: { show: true },
    //         dataView: { show: false, readOnly: false },
    //         magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
    //         restore: { show: true },
    //         saveAsImage: { show: true }
    //       }
    //     },
    //     calculable: true,
    //     xAxis: [
    //       {
    //         type: 'category',
    //         axisTick: { show: false },
    //         axisLabel: {
    //           show: true,
    //           textStyle: {
    //             color: '#B3B5B9'
    //           }
    //         },
    //         data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日']
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: 'value',
    //         axisLabel: {
    //           show: true,
    //           textStyle: {
    //             color: '#B3B5B9'
    //           }
    //         }
    //       }
    //     ],
    //     series: [
    //       {
    //         name: 'IP订单',
    //         type: 'bar',
    //         label: '20px',
    //         data: [150, 232, 201, 154, 190]
    //       },
    //       {
    //         name: '商品订单',
    //         type: 'bar',
    //         label: '20px',
    //         data: [98, 77, 101, 99, 40]
    //       }
    //     ]
    //   })
    // }
  }
}
</script>
