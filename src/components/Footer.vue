<template>


    <div class="nav-container sticky bottom-0 ">
      <ul class="Navigation pb-8 text-white ">
        <!-- space to add external links of wanted/ contact info><-->
        <li class="list-item">IOS app </li>
        <li class="list-item">Android app </li>
        <li class="list-item">Contact us </li>
        <li class="list-item">Jobs</li>
        <!-- Add more <li> elements for other menu items if needed -->
      </ul>
    </div>


</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.content-container {
  display: flex ;
  flex-direction: column;

}

.list-item:hover{
 text-decoration: underline;
 }

.footer-default {
  background-color: #502616; /* Solid brown */
  color: #FFC51875; /* Writing color */
  padding: 20px 0;
  text-align: center;
  height: 100px;
}

.nav-container {
  margin: 0 auto;
}

.Navigation {
  list-style: none;
  padding-left: 0;
  display: flex;
  justify-content: center; /* Center the navigation horizontally */
  align-items: center;
  height: 70px;
  background-color: #34190e;
}


.Navigation li {
  margin: 0 20px;

}


.nav-link, .router-link-exact-active, .Navigation a {
  color: #FFC51875; /* Writing color */
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover, .router-link-exact-active:hover, .Navigation a:hover {
  color: #ffffff; /* Change if you want a different hover effect */
}
</style>
