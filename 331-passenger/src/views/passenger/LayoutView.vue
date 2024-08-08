<script setup lang="ts">
import { usePassengerStore } from '@/stores/passenger';
import { storeToRefs } from 'pinia';

const store = usePassengerStore()
const { passenger } = storeToRefs(store)
const { airline } = storeToRefs(store);

</script>
<template>
  <div v-if="passenger">
    <h1>{{ passenger.fname }} {{ passenger.lname }}</h1>
    <nav>
      <RouterLink :to="{ name: 'passenger-detail-view'}">Details</RouterLink> |
      <RouterLink :to="{ name: 'passenger-airline-view'}">Airline</RouterLink> |
      <RouterLink :to="{ name: 'passenger-edit-view'}">Edit</RouterLink>
    </nav>
    <RouterView :passenger="passenger" />
  </div>
</template>
