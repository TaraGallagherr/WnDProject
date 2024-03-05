<!--using el-rate from element plus to display the rating nicely ><-->

<template>
  <el-rate
      v-model="value"
      disabled
      show-score
  />

</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'

// Use defineProps to receive the rating value as a prop
const props = defineProps({
  initialRating: {
    type: Number,
    required: true
  }
})

const value = ref(props.initialRating)
</script>

<style scoped>

</style>