<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'passenger-list-view' }">Passengers</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
        <div>
          <label for="page-size">List per page: </label>
          <select id="page-size" v-model="pageSize" @change="updatePageSize">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';

const store = useMessageStore()
const { message } = storeToRefs(store)

const pageSizes = [2, 4, 6, 8, 10]
const pageSize = ref(pageSizes[1])

const router = useRouter()
const route = useRoute()

const updatePageSize = () => {
  router.push({
    name: 'passenger-list-view',
    query: { ...route.query, pageSize: pageSize.value, page: 1 }
  })
}

if (route.query.pageSize) {
  pageSize.value = parseInt(route.query.pageSize.toString())
}
</script>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellofade 3s ease-in-out; 
}
</style>
