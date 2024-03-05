<template>
  <div class="flex items-center space-x-3 pb-4">
    <span class="text-sm text-brown font-bold">Filter Discount: </span>

    <el-radio-group v-model="selectedDiscount" >
      <el-radio :label="'all'">All Products</el-radio>
      <el-radio :label="'10.0'">Over 10%</el-radio>
      <el-radio :label="'15.0'">Over 15%</el-radio>
      <el-radio :label="'none'">No Discount</el-radio>
    </el-radio-group>

  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {ElButton, ElRadio, ElRadioGroup} from 'element-plus'
import 'element-plus/theme-chalk/el-button.css';
import 'element-plus/theme-chalk/el-radio.css';
import { defineEmits } from 'vue';
import {useProductsStore} from '../stores/products';
import 'element-plus/theme-chalk/el-radio.css';

const store = useProductsStore();


const emits = defineEmits(['filterDiscount']);
const selectedDiscount = ref<string | number>('all'); // Default to no discount

watch(selectedDiscount, (newValue) => {
  emits('filterDiscount', newValue);
  console.log('Selected discount:', newValue);
});



// This function can be called if you want to manually trigger filtering, but it's not needed if using watch


</script>

<style scoped>
.discount-radio-group {
  margin-right: 20px;
}

</style>
