/// <reference types="vite/client" />


interface City {
    city_id: number
    city_name: string
    country_name: string
    lat: number
    lng: number
    state_code: string | null
}

interface Price {
    good_id: number,
    item_name: string,
    category_id: number,
    category_name: string,
    min: number,
    avg: number,
    max: number,
    usd: Record<string, string>,
    measure: string,
    currency_code: string
}


interface Cities {
    cities: City[]
    error: null | unknown
}



interface Prices extends City {
    exchange_rate: Record<string, number>
    exchange_rates_updated: Record<string, number | string>
    prices: Price[]
    error: null | unknown

}