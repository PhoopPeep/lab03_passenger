import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/PhoopPeep/331-lab02',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getPassengers(perPage: Number, page: Number) {
        return apiClient.get('/passengers?_limit=' + perPage + '&_page=' + page)
    },
    getPassenger(id: number) {
        return apiClient.get('/passengers/' + id)
    }
}