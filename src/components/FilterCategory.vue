<!-- used in catalogue.vue - displays the dropdown list to filter by category. ><-->

<template>
  <div class="flex flex-wrap items-center pb-4">
    <!-- Add label for Categories -->
    <label for="categories-dropdown"  class="mr-2 font-bold text-brown ">Categories:</label>
    <el-dropdown @command ="handleCommand"  >
      <el-button  >
        {{ selectedCategory === '' ? 'All Categories' : selectedCategory }} <el-icon  ><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu >
          <el-dropdown-item class="el-dropdown" command="">All Categories</el-dropdown-item>
          <el-dropdown-item v-for="category in categoriesList" :key="category"  :command="category">
            {{category }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { defineEmits } from 'vue';
import {useProductsStore} from '../stores/products';
import { ArrowDown } from '@element-plus/icons-vue'
import 'element-plus/es/components/dropdown/style/css';
import 'element-plus/theme-chalk/el-icon.css';

const store = useProductsStore();
const emits = defineEmits(['category']);


onMounted(async () => {
  await store.fetchAllCategories();
})


const selectedCategory = ref(' ');
const categoriesList = computed(() => store.categoriesList as string[]);

const handleCommand = (command: string) => {
  selectedCategory.value = command; // Updates the selected category
  emits('category', command); // Emits the selected category to the parent component
};

</script>
<style scoped>

 .el-dropdown  {
  margin-left: 15px;

}





.filter-button{
  background-color: rgba(81, 142, 217, 0.56);
  text-decoration-color: white;
}

.filter-button:hover{

  background-color: rgba(81, 142, 217, 0.56);
  text-decoration-color: white;

}

.el-dropdown:hover{
  background-color: cadetblue;
}


</style>


