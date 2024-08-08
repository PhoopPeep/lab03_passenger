<script setup lang="ts">
import PassengerCard from '@/components/PassengerCard.vue'
import { type Passenger } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import PassengerService from '@/services/PassengerService'
import { error } from 'console'
import { useRoute } from 'vue-router'

const passengers = ref<Passenger[] | null>(null)
const totalPassengers = ref(0)

const route = useRoute()

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalPassengers.value / pageSize.value)
  return page.value < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const pageSize = computed(() => props.pageSize)

onMounted(() => {
  watchEffect(() => {
    PassengerService.getPassengers(pageSize.value, page.value)
      .then((response) => {
        passengers.value = response.data
        totalPassengers.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <div class="events">
    <h1>Passenger List</h1>
    <!-- new element -->
    <PassengerCard v-for="passenger in passengers" key="passenger.id" :passenger="passenger" />
    <!-- <CategoryOrganizer v-for="event in events" key="event.id" :event="event" /> -->
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'passenger-list-view', query: { page: page - 1, pageSize: pageSize } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'passenger-list-view', query: { page: page + 1, pageSize: pageSize } }"
        rel="next"
        v-if="hasNexPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>