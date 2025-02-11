<template>
  <div ref="chartRef" :style="{ height, width }" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = withDefaults(defineProps<{
  option: EChartsOption
  height?: string
  width?: string
}>(), {
  height: '300px',
  width: '100%'
})

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.setOption(props.option)
  }
}

const resizeHandler = () => {
  chart?.resize()
}

watch(
  () => props.option,
  (newOption) => {
    chart?.setOption(newOption)
  },
  { deep: true }
)

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', resizeHandler)
})
</script>