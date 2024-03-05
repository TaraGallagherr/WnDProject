//read in all products and get max and min value of the products.
//create a slide bar with the max and min values being the parameters
<template>

    <div class="flex items-center space-x-3 pb-4">
      <span class="text-sm text-brown font-bold">Filter Price</span>

      <el-slider v-model="sliderValue" :max="maxPrice" :disabled="isSliderDisabled" class=" slider-custom .el-slider__bar" />
      <el-button @click="emitValue"  class="ml-4">
        Apply
      </el-button>
      <el-button @click="resetSlider" type="info" class="ml-2">
        Reset
      </el-button>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {ElSlider, ElButton} from 'element-plus'
import 'element-plus/theme-chalk/el-slider.css'
import 'element-plus/theme-chalk/el-button.css';
import {computed} from 'vue';
import { defineEmits } from 'vue';
import {useProductsStore} from '../stores/products';


const store = useProductsStore();
const initialValue = 0;
const sliderValue = ref(initialValue);
//const maxPrice = computed(() => Math.max(...store.productsList.map(p => p.price)));
const isSliderDisabled = ref(false);
const emits = defineEmits(['filterPrice']);

// max price shown in slider based on the max price in products list
const maxPrice = computed(() => {
  if (store.productsList.length === 0) {
    return 10000; // Default max price if there are no products
  }
  return Math.max(...store.productsList.map(p => p.price));
});


// funcitonality here
const emitValue = () => {
  emits('filterPrice', sliderValue.value);
  console.log(sliderValue.value);
  isSliderDisabled.value = true; // Disable the slider after applying
};

const resetSlider = () => {
  sliderValue.value = initialValue; // Reset to the initial value
  isSliderDisabled.value = false; // Enable the slider
};
</script>

<style>
.slider-custom .el-slider__bar {
  background-color: black !important;
  width : 100px;
}

.slider-custom .el-slider__button {


}

.slider-custom  {
  flex: 0 0 30%;
}




</style>