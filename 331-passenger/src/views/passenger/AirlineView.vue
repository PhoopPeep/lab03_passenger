<script setup lang="ts">
import { type Airline } from '@/types';

const props = defineProps<{
  airline: Airline
  id: String
}>()

</script>
<template>
  <h1>Airline Name: {{ airline.name }}</h1>
  <h2>Flight Number: {{ airline.flightNumber }}</h2>
  <p>Flight from {{ airline.departure }} to {{ airline.arrival }}</p>

</template>