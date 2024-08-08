export interface Passenger {
    id: number
    fname: string
    lname: string
    birth: string
    gender: string
    passport: string
    nationality: string
    email: string
    phone: string
    address: string
    airline_id: number
}

export interface Airline {
    id: number
    name: string
    flightNumber: string
    departure: string
    arrival: string
}

export interface MessageState {
    message: String
}

export interface PassengersState {
    passenger: Passenger | null
    airline: Airline | null
}