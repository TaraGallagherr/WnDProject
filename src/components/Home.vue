<!-- displays best sellers - can go to products details from here and can also add to cart><-->

<template>
  <div class="font-roboto max-w-6xl mx-auto px-4 py-8">
    <h1 class=" pt-8 text-6xl font-bold text-center mb-8">Home Page</h1>
    <h2 class="text-2xl font-semibold mb-6">BestSellers - Highest Rated ! </h2>

<!-- the card displaying for each product><-->
    <div class=" top-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in bestSellingProducts" :key="product.id" class=" product-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <!-- Image container with responsive and aspect ratio classes -- trying to make !! -->
        <div class="w-full h-48 overflow-hidden">
          <img :src="product.thumbnail" alt="Product image" class="object-contain w-full h-full">
        </div>
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ product.brand }}</h2>
          <p class="text-gray-700">{{ product.description }}</p>
          <p class="font-bold mt-2">Price: ${{ product.price }}</p>
          <RatingDisplay  :initialRating="product.rating" />
          <div class="mt-4 flex justify-between items-center">
            <ElButton type="primary" @click="goToProductPage(product.id)" class=" button-product-details mr-2">View Product</ElButton>
            <ElButton @click="addToCart(product.id)" class="button-add-to-cart">Add to Cart</ElButton>
          </div>
          <div v-if="findUserByProductId(product.id)" class="mt-4 flex items-center">

            <img :src="findUserByProductId(product.id)?.image" alt="Seller's image" class="w-14 h-16 rounded-full mr-4 border-4 border-amber-950">
            <div>
              <p class="text-sm font-semibold">Product Seller:</p>
              <p>{{ findUserByProductId(product.id)?.firstName }}</p>
            </div>
          </div>
          <div v-else>
            <p class="mt-4">Product Seller: Unknown</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'Home',

});
</script>

<script setup lang="ts">
//import {onMounted} from "@vue/runtime-dom";
import { onMounted } from 'vue';
import {useProductsStore} from '../stores/products';
import {usersStore} from '../stores/users';
import {useRouter} from "vue-router";
import {ElButton, ElPopover} from "element-plus";
import {computed, ref} from 'vue';
import { useCartStore } from '../stores/cart';
import {useNotificationStore} from "../stores/notificationStore.ts";
import RatingDisplay from "./RatingDisplay.vue";

const store = useProductsStore()
const userStore = usersStore()
const router = useRouter()
const cartStore = useCartStore();
const cart = computed(() => cartStore.cartList);


onMounted(async () => {
  await store.fetchProductsFromDB()
  await userStore.fetchUsersFromDB()
  //console.log("working")
})

//computed property for users
const usersList = computed(() => userStore.usersList);


// Computed property for products with a rating over 4.8 --> just how im doing bestsellers atm
const bestSellingProducts = computed(() => {
  return store.productsList.filter(product => product.rating > 4.8);
});


//method to jump to product details page when the item is clicked
const goToProductPage = (id: number) => {
  router.push({name: 'ProductView', params: {id} })
}

//matching a seller (user) to a product by use of id
const findUserByProductId = (id: number) => {
  return usersList.value.find(user => user.id === Number(id));
};
function addToCart(productId: number) {
  cartStore.addItem(productId, 1); // This should now work correctly
  useNotificationStore().addedToCartNotification('Item added to cart!');
}
</script>


<style scoped>

.top-border{
  border-top: 2px solid brown;
  padding-top: 25px;
}

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


.button-product-details{
  background-color: var(--color-accent2);
}

.button-product-details:hover{
  background-color: var(--color-accent-hover);
}

.button-add-to-cart {
  background-color: var(--color-accent);
}

.button-add-to-cart:hover {
  background-color: var(--color-accent-hover);
}

.seller-details:hover {
  box-shadow: 0 6px 8px rgba(0.1,0.1,0.1,0.4);
}

</style>