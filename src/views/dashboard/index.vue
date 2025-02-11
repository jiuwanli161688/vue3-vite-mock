<template>
  <div class="dashboard">
    <h1>欢迎来到 {{ config.title }}</h1>
    <EChart :option="chartOption" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import EChart from '@/components/EChart/index.vue'
import type { EChartsOption } from 'echarts'
import config from '@/utils/config'

const chartOption = ref<EChartsOption>({
  title: {
    text: '示例图表'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 24px;
}
</style>