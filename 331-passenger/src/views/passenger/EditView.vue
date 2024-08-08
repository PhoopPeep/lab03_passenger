<script setup lang="ts">
import { toRefs } from 'vue'
import { type Passenger } from '@/types'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
  passenger: Passenger
  id: String
}>()

const { passenger } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const edit = () => {
  store.updateMessage('The ' + props.passenger.fname +props.passenger.lname + ' has been update.')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'passenger-detail-view', params: { id: props.passenger.id } })
}
</script>
<template>
  <p>Edit passenger here</p>
  <button @click="edit">Edit here!</button>
</template>
