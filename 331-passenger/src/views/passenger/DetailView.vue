<script setup lang="ts">
import { toRefs, onMounted, toRef } from 'vue'
import { type Passenger } from '@/types'

const props = defineProps<{
  passenger: Passenger
  id: String
}>()
const { passenger } = toRefs(props)
</script>
<template>
  <h1>{{ passenger.fname }} {{ passenger.lname }}</h1>
  <h2>Passport Number: {{ passenger.passport }}</h2>
  <h3>Birth: {{ passenger.birth }} Gender: {{ passenger.gender }}</h3>
  <h3>Nationality: {{ passenger.nationality }}</h3>
  <span>@Contact</span><br>
  <span>Email: {{ passenger.email }}</span><br>
  <span>Phone: {{ passenger.phone }}</span><br>
  <span>Address: {{ passenger.address }}</span>
</template>
