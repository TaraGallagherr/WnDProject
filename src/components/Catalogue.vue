<!-- displays all products => has functional filters to display certain products,
can see more details and add to cart from here as well ><-->

<template>
  <div class=" pt-12 max-w-6xl mx-auto px-4 py-4">
    <h1 class="text-6xl font-bold pb-4 text-center">Catalogue</h1>

    <!-- Filters Section -->
    <div class="flex flex-wrap justify-center gap-4 mb-6 ">
      <FilterPrice class="pr-6 " :maxPrice="chosenPrice" @filterPrice="selectedPriceRange = $event" />
      <FilterRatingOrder @updateSortOrder="selectedRatingOrder = $event" />
      <FilterCategory :items="categoriesList" @category="selectedCategory = $event" />
      <FilterDiscount @filterDiscount = "selectedDiscount = $event" />
    </div>

    <!-- Product Information Display with user info in enrichedProducts-->
    <div v-if="enrichedProducts && enrichedProducts.length" class=" top-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in enrichedProducts" :key="product.id" class=" product-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div class="h-64 overflow-hidden">
          <img :src="product.thumbnail" alt="Product Image" class="object-contain w-full h-full">
        </div>
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ product.brand }}</h2>
          <p class="text-gray-700">{{ product.description }}</p>
          <p class="font-bold mt-2">Price: ${{ product.price }}</p>
          <RatingDisplay  :initialRating="product.rating" />
          <p class="text-2xl font-bebas font-bold">Discount: {{ product.discountPercentage }} % </p>
          <div class="mt-4">
            <ElButton  @click="goToProductPage(product.id)" class=" button-product-details mr-2 ">View Product</ElButton>
            <ElButton @click="addToCart(product.id)" class="button-add-to-cart">Add to Cart</ElButton>
          </div>
          <div v-if="product.user" class="mt-4 flex items-center">

          <!-- Trigger button for the popover -->
          <el-popover class="popover bg-cyan-600" trigger="hover" placement="bottom" :width=250 >
            <template #reference>
              <el-button >Product Seller: {{ product.user.firstName }}</el-button>
            </template>
            <div style="text-align: center;">
            <img :src="product.user.image" alt="Seller's image" class="w-14 h-16 rounded-full object object-contain border-4 border-amber-950">
            <p class="text-sm font-semibold">Seller: {{ product.user.firstName }} {{ product.user.lastName }}</p>
            <p>Email: {{ product.user.email }}</p>
            </div>
          </el-popover>
          </div>

          <div v-else>
            <p class="mt-4">Product Seller: Unknown</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-lg text-center p-4">
      There are no products with that filter. Please select another.
    </div>


  </div>
</template>


<script lang="ts">
//import { Product } from './types';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Catalogue',
  components: {
    ElPopover,
    ElButton,
  }
});
</script>

<script setup lang="ts">
//import {onMounted} from "@vue/runtime-dom";
import { onMounted, watch} from 'vue';
import {useProductsStore} from '../stores/products';
import {usersStore} from '../stores/users';
import {useRouter} from "vue-router";
import { ElPopover, ElButton } from 'element-plus';
import {computed, ref, } from 'vue';
import FilterCategory from './FilterCategory.vue';
import FilterPrice from './FilterPrice.vue';
import FilterRatingOrder from "./FilterRatingOrder.vue";
import { useCartStore } from '../stores/cart';
import {useNotificationStore} from "../stores/notificationStore.ts";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-button.css';
import FilterDiscount from "./FilterDiscount.vue";
import RatingDisplay from './RatingDisplay.vue'

onMounted(async () => {
  await store.fetchProductsFromDB()
  await userStore.fetchUsersFromDB()
  await store.fetchAllCategories()

});

//stores
const store = useProductsStore()
const userStore = usersStore()
const cartStore = useCartStore();


const router = useRouter()

//dynamic values for filtering
const selectedCategory = ref('');
const selectedPriceRange = ref('');
const chosenPrice = ref('')
const selectedRatingOrder = ref('')
const selectedDiscount = ref('all') //starting so all products are shown
//lists
//const usersList = computed(() => userStore.usersList);
const categoriesList = computed(() => store.categoriesList as string[]);


// Watch the selectedCategory, selectedPriceRange, selectedRatingOrder and filter products list whenever it changes
watch([selectedCategory, selectedPriceRange, selectedRatingOrder, selectedDiscount], ([newCategory, newPriceRange, newRating, newDiscount]) => {
  console.log("Current rating order:", selectedRatingOrder.value);
 console.log("Discount --> ", selectedDiscount.value);

  // Ensure newPriceRange is passed as an object with a 'max' property
  const filters = {
    category: newCategory ,
    priceRange: newPriceRange ? { max: Number(newPriceRange) } : undefined,
    ratingOrder: newRating,
    discountRate: newDiscount ,
  };

  //filtering the products based on the filters set.
  console.log("Here", newDiscount);
   store.filterProductList(filters);


}, { immediate: true });

//method to jump to product details page when the item is clicked
const goToProductPage = (id: number) => {
  router.push({name: 'ProductView', params: {id} })
}

//array of products and users together
const enrichedProducts = computed(() => {
  return store.filteredProducts.map(product => {
    const user = userStore.findUserByProductId(product.id);
    return { ...product, user };
  });
});

function addToCart(productId: number) {
  cartStore.addItem(productId, 1); // This should now work correctly
  useNotificationStore().addedToCartNotification('Item added to cart!');
}

</script>



<style scoped>

 .popover:hover {
  width: 300px;
}

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