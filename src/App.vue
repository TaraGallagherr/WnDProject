<!--<template>
  <div id="app" class=" w-screen min-h-screen ">
    <Header />
    <Footer/>
    <router-view></router-view>
  </div>
</template>><-->

<template>
  <div id="app" class=" w-screen min-h-screen ">
    <Header />


    <!-- Main content area for router views -->
    <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <router-view />
    </div>
    </div>
    <Footer class="mt-auto"/>
  </div>
</template>


<script lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
//import Catalogue from './components/Catalogue.vue'
//import Home from './components/Home.vue'
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

};

</script>


