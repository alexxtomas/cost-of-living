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
    usd?: {
        min: string,
        avg: string,
        max: string
    },
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


type HtmlTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'


interface NullDOMElement {
    type: 'nullDOMelement'
}
interface Throw {
    type: 'throw'
    text: string
}
interface Default extends Throw {
    type: 'default'
    tag: HtmlTags
    element: Element
}
interface Catch {
    type: 'catch'
    catchError: unknown
}
type Errors = Catch | Default | Throw | NullDOMElement
