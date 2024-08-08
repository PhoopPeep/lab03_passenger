<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { type Passenger } from '@/types'
import PassengerService from '@/services/PassengerService';
const passenger = ref<Passenger | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(() => {
  //fetch event (by id) and set local event data
  PassengerService.getPassenger(parseInt(props.id))
    .then((response) => {
      passenger.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>
<template>
  <div v-if="passenger">
    <h1>{{ passenger.fname }} {{ passenger.lname }}</h1>
    <h2>Passport NUmber: {{ passenger.passport }}</h2>
    <h3>Birth: {{ passenger.birth }} Gender: {{ passenger.gender }}</h3>
    <h3>Nationality: {{ passenger.nationality }}</h3>
    <p>Airline</p>
    <span>Contact</span><br>
    <span>Email: {{ passenger.email }}</span><br>
    <span>Phone: {{ passenger.phone }}</span><br>
    <span>Address: {{ passenger.address }}</span>
  </div>
</template>
