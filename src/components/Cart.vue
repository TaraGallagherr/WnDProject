<!--displays a card with products in cart, has functional remove and add buttons,
 - checkout button will remove everything from cart><-->

<template>
  <div class="max-w-4xl mx-auto p-6 ">
    <h1 class="text-4xl font-semibold text-center mb-6">Your Cart</h1>

    <div v-if="cart && cart.length > 0">
      <div v-for="item in cart" :key="item.id" class="  cart-card mb-4 p-4 rounded-lg shadow-md bg-gray-100">
        <!-- Rest of the card content -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="item.thumbnail" alt="Product Image" class="w-24 h-24 object-contain mr-4 rounded">
            <div>
              <h2 class="text-xl font-medium">{{ item.title }}</h2>
              <p>Quantity: {{ item.quantity }}</p>
            </div>
          </div>
          <div class="text-lg font-semibold">
            ${{ item.price * item.quantity }}
          </div>
        </div>

          <!-- displaying user info ><-->
        <div v-if="findUserByProductId(item.id)" class="mt-4 flex items-center">
          <img :src="findUserByProductId(item.id)?.image" alt="Seller's image" class="w-14 h-16 rounded-full mr-4 border-4 border-amber-950">
          <div>
            <p class="text-sm font-semibold">Product Seller:</p>
            <p>{{ findUserByProductId(item.id)?.firstName }}</p>
          </div>
        </div>

        <div v-else>
          <p class="mt-4">Product Seller: Unknown</p>
        </div>
        <!-- Buttons for cart page><-->
        <div class="p-2 flex items-center gap-2">
        <el-button type="danger" size="small" class="mt-3" @click="removeItem(item.id)">Remove</el-button>
        <el-button type="success" size="small" class="mt-4" @click="addToCart(item.id)">Add Another</el-button>
        <el-button type="primary" size="small" class="mt-3 " @click="goToProductDetails(item.id)">Product Details</el-button>
        </div>
      </div>

      <el-button type="primary" class="mt-4 " @click="goToCatalogue">Add More Items</el-button>
      <!-- Total and Checkout Button -->
      <div class="text-right mt-6">
        <h2 class="text-2xl font-semibold">Total: ${{ cartStore.totalPrice }}</h2>
        <el-button type="success" class="mt-4" @click="checkout">Check-Out</el-button>
      </div>

    </div>
    <div v-else class="text-center text-xl flex flex-col items-center justify-center">
      Your cart is empty.
      <el-button type="primary" class="mt-4 " @click="goToCatalogue">Add More Items</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {ElButton} from "element-plus";
import 'element-plus/dist/index.css'

export default defineComponent({
  name: 'cart',
});
</script>

<script setup lang="ts">
import{computed} from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router';
import {useNotificationStore} from "../stores/notificationStore.ts";
import {usersStore} from "../stores/users.ts";

const router = useRouter();

const userStore = usersStore();
const cartStore = useCartStore();
const cart = computed(() => cartStore.cartList);


//computed property for users

const usersList = computed(() => userStore.usersList);

//using methods from cart.ts
function checkout()  {

  cartStore.checkout(); // Calls the checkout action to clear the cart
}
function removeItem(productId: number){
  cartStore.removeItem(productId);

  useNotificationStore().removedFromCartNotification('Item removed cart!');
}

function goToCatalogue() {
  router.push('/Catalogue');
}

function goToProductDetails(productId: number) {
  router.push(`/product/${productId}`);
}

function addToCart(productId: number) {
  cartStore.addItem(productId, 1);
  useNotificationStore().addedToCartNotification('Item added to cart!');
}

//section that includes user info of products in cart
const findUserByProductId = (id: number) => {
  return usersList.value.find(user => user.id === Number(id));
};




</script>

<style>

.cart-card{
  background-color: var(--color-background);
  color: var(--color-text-primary);
  border-block-style: solid;
  border-color: #1a416b;
  box-shadow: 0 6px 8px rgba(0.0,0.0,0.0,0.2);

}

.cart-card:hover{
  box-shadow: 0 6px 8px rgba(0.1,0.1,0.1,0.4);
}

.cart-card:hover {
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