<template>
  <header class="text-5xl header-default tracking-wide">
    <nav class="nav-container ">
      <ul class="Navigation">
        <li>
          <router-link to="/" exact-active-class="active-link">Home</router-link>
        </li>
        <li>
          <router-link to="/Catalogue" exact-active-class="active-link">Catalogue</router-link>
        </li>
      </ul>
    </nav>
    <div class="cart-container pr-10">
      <router-link to="/Cart" exact-active-class="active-link ">
        <img src="/public/cart.png" alt="Cart" class=" w-16 h-16 ">
      </router-link>
    </div>
  </header>
</template>


  <script setup lang="ts">
import {useRouter} from "vue-router";
import {useProductsStore} from "../stores/products.ts";

const router = useRouter()
const store = useProductsStore()
</script>


<script lang="ts">
import {computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'Header',
  cartIcon: ('@/assets/cart.png'),
});

</script>


  <style scoped>
  .header-default {
    color:brown;

    border-bottom: 2px solid brown; /* Brown line under the header */
    font-family: 'Bebas Neue', cursive; /* Using Bebas N*/
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 20px;
    display: flex;
    list-style: none;
    margin: 0; /* Remove default margin */
  }

  .Navigation {
    display: flex;
    align-items: center;
    list-style: none;
    padding-left: 0; /* Remove default padding */
  }

  .Navigation li {
    margin-right: 20px; /* Space between menu items */
    align-items: center;
  }


  .nav-link, .router-link-exact-active {
    color: var(--color-accent-dark);

    text-decoration: none;
    border-radius: 5px; /* Rounded corners for active link background */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }

  .active-link, .router-link-exact-active {
    background-color: var(--color-background-hover-light); /* Lighter background for active link */
    padding: 16px 8px;
  }


  .nav-link:hover, .router-link-exact-active:hover {
    color: var(--color-accent-hover-dark);
  }
  </style>
