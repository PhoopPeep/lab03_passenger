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
    getAirline(id: number) {
        return apiClient.get('/airlines/' + id)
    }
}