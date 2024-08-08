import type { PassengersState, Passenger, Airline } from "@/types";
import { defineStore } from "pinia";
export const usePassengerStore = defineStore('passenger', {
    state: (): PassengersState => ({
        passenger: null,
        airline: null
    }),
    actions: {
        setPassenger(passenger: Passenger): void {
            this.passenger = passenger
        },
        setAirline(airline: Airline): void {
            this.airline = airline
        }
    }
})