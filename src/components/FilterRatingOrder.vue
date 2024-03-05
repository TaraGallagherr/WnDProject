<template>
  <div class="p-6">

    <!-- Sorting Buttons -->
    <div class="mb-4">

      <div class="mb-4 ">
        <el-button
            @click="emitSortOrder('asc')"
            :type="selectedRatingOrder === 'asc' ? 'success' : 'primary'">
          Lowest Rating First
        </el-button>
        <el-button
            @click="emitSortOrder('desc')"
            :type="selectedRatingOrder === 'desc' ? 'success' : 'primary'">
          Highest Rating First
        </el-button>

    </div>

  </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import 'element-plus/theme-chalk/el-button.css';
import { defineEmits, ref } from 'vue';

const emits = defineEmits(['updateSortOrder']);
const selectedRatingOrder = ref(''); // Default sort order - no order


function emitSortOrder(order: 'asc' | 'desc') {

  selectedRatingOrder.value = selectedRatingOrder.value === order ? '' : order;
  console.log(selectedRatingOrder.value);
  emits('updateSortOrder', selectedRatingOrder.value);
}


</script>

<style scoped>

.text-color{
  color: #34190e;
}

.el-button--success{

}

/*.el-button {
  background: rgba(42, 145, 168, 0.7);
  border-color: #2A91A8B2;
}

.el-button:hover{
background-color: rgba(192, 146, 21, 0.82);
  border-color: rgba(157, 120, 17, 0.82);
}



.el-button:focus{
  background-color: #C09215D1 ;
}


.el-button--success {
  --el-button-text-color: var(--el-color-white);
  --el-button-bg-color: var(--el-color-success);
  --el-button-border-color: var(--el-color-success);
  --el-button-outline-color: var(--el-color-success-light-5);
  --el-button-active-color: var(--el-color-success-dark-2);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-link-text-color: var(--el-color-success-light-5);
  --el-button-hover-bg-color: var(--el-color-success-light-3);
  --el-button-hover-border-color: var(--el-color-success-light-3);
  --el-button-active-bg-color: var(--el-color-success-dark-2);
  --el-button-active-border-color: var(--el-color-success-dark-2);
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: var(--el-color-success-light-5);
  --el-button-disabled-border-color: var(--el-color-success-light-5);
}*/





</style>