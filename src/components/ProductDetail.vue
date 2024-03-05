<!-- detailed view of selected product - can show more attribute ...
can also add to cart from here><-->

<template>
  <div class="pt-20 max-w-4xl mx-auto p-6 product-card">
    <h1 class="text-2xl font-bold font-roboto text-gray-800 mb-6">Product Details</h1>
    <div v-if="selectedProduct" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:shrink-0 max-w-xs md:max-w-sm lg:max-w-md mx-auto">
          <img :src="selectedProduct.thumbnail" alt="Product Image" class="max-w-full max-h-full object-contain mx-auto">
        </div>
        <div class="p-8">
          <h2 class="block mt-1 text-lg leading-tight font-medium text-black">{{ selectedProduct.title }}</h2>
          <p class="mt-2 text-gray-500">{{ selectedProduct.description }}</p>
          <div class="mt-4 mb-4">
            <span class="text-gray-700 font-bold">Brand:</span> {{ selectedProduct.brand }}
          </div>
          <div class="flex items-center mt-2 mb-4">
            <span class="text-xl font-semibold text-gray-900">${{ selectedProduct.price }}</span>

          </div>
          <RatingDisplay  :initialRating="selectedProduct.rating" />
          <div v-if="matchedUser" class="flex items-center mt-4">
            <img :src="matchedUser.image" alt="" class="h-16 w-14 rounded-full mr-4 border-4 border-amber-950">
            <div class="items-center justify-center text-1xl font-bold">
            <p >Contact the seller, {{matchedUser.firstName }} : </p>
            <p class="p"> {{matchedUser.email}}</p>
            </div>
          </div>
          <div v-else class="mt-4">
            <p class="text-gray-700">Product Seller: Unknown</p>
          </div>
          <el-button class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addToCart(selectedProduct.id)">Add to Cart</el-button>
        </div>
      </div>
    </div>
    <div v-else class="text-center p-4">
      <p class="text-gray-700">The product is undefined.</p>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent} from 'vue';
import {ElButton, ElCard} from "element-plus";

export default defineComponent({
  name: 'ProductDetail',
  components :{
    ElButton,
    ElCard,
  }

});

</script>

<script setup lang="ts">

import {computed, ref} from "vue";
import {useProductsStore} from "../stores/products";
import {usersStore} from '../stores/users';
import {useRoute} from "vue-router";
import {useCartStore} from "../stores/cart.ts";
import {useNotificationStore} from "../stores/notificationStore.ts";
import 'element-plus/dist/index.css'
import RatingDisplay from "./RatingDisplay.vue";


const usersList = computed(() => userStore.usersList);
const store = useProductsStore();
const cartStore = useCartStore();
const route = useRoute();
//const useNotificationStore = useNotificationStore();
const cart = computed(() => cartStore.cartList);

const userStore = usersStore()
const selectedProduct= computed(() => {
const productId = Number(route.params.id);
return store.productsList.find((product) => product.id === productId);

});

const matchedUser = computed(() => userStore.findUserByProductId(selectedProduct.value?.id));


function addToCart(productId: number) {
  cartStore.addItem(productId, 1);
  useNotificationStore().addedToCartNotification('Item added to cart!');
}

</script>


<style>
.product-card{
  background-color: var(--color-background);
  color: var(--color-text-primary);
  border-block-style: solid;
  border-color: #1a416b;
  box-shadow: 0 6px 8px rgba(0.0,0.0,0.0,0.2);

}

.product-card:hover{
  box-shadow: 0 6px 8px rgba(0.1,0.1,0.1,0.4);
}

.product-card:hover {
  border-color: var(--color-accent-hover);
}

.p:hover{
    text-decoration: underline;
}
</style>