import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '@/views/PassengerListView.vue'
import AboutView from '@/views/AboutView.vue'
import DetailView from '@/views/passenger/DetailView.vue'
import AirlineView from '@/views/passenger/AirlineView.vue'
import EditView from '@/views/passenger/EditView.vue'
import PassengerLayoutView from '@/views/passenger/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import PassengerService from '@/services/PassengerService'
import { usePassengerStore } from '@/stores/passenger'
import AirlineService from '@/services/AirlineService'
import nProgress, { NProgress } from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'passenger-list-view',
    component: PassengerListView,
    props: (route) => ({
      page: parseInt(route.query.page?.toString() || '1'),
      pageSize: parseInt(route.query.pageSize?.toString() || '4')
    })
  },
  {
    path: '/passenger/:id',
    name: 'passenger-layout-view',
    component: PassengerLayoutView,
    props: true,
    beforeEnter: (to) => {
      const id = parseInt(to.params.id as string)
      const passengerStore = usePassengerStore()
      return PassengerService.getPassenger(id)
      .then((response) => {
        //need to setup the data for the event
        passengerStore.setPassenger(response.data)
        return AirlineService.getAirline(response.data.airline_id)
      })
      .then((response) => {
        passengerStore.setAirline(response.data)
      })
      .catch((error) => {
        if(error.response && error.response.status === 404) {
          return {
            name: '404-resource-view',
            params: { resource: 'event' }
          }
        } else {
          return { name: 'network-error-view' }
        }
      })
    },
    children: [
      {
        path: '',
        name: 'passenger-detail-view',
        component: DetailView,
        props: true
      },
      {
        path: 'airline',
        name: 'passenger-airline-view',
        component: AirlineView,
        props: (route) => ({
          airline: usePassengerStore().airline
        })
      },
      {
        path: 'edit',
        name: 'passenger-edit-view',
        component: EditView,
        props: true
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/404/:resource',
    name: '404-resource-view',
    component: NotFoundView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'network-error-view',
    component: NetworkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router

