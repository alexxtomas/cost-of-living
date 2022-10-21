import { getPrices } from "../services/services"
import { $ } from "../utils/$"
import localStorage from "../utils/localStorage"
import { sortByCategory } from "../utils/sortByCategory"
import ErrorHandler from "./ErrorHandler"

const CityPrices = async ($livingIn: Element, $input: HTMLInputElement, $prices: Element) => {
    const { cities } = localStorage.cities()

    if (!cities) return ErrorHandler({ type: 'default', tag: 'h3', element: $prices, text: 'Failed to retrieve cities' })

    const foundCity = cities.find(({ city_name }) => city_name === $input.value)

    if (!foundCity) {
        $livingIn.innerHTML = '...'
        $input.value = ''
        return ErrorHandler({ type: "default", tag: "h3", element: $prices, text: 'Sorry, the city you are looking for has not been found' })
    }

    const { city_name, country_name } = foundCity

    $livingIn.innerHTML = `${city_name.toUpperCase()}`
    const prices = await getPrices(city_name, country_name)

    if (!prices) return ErrorHandler({ type: 'default', tag: "h3", element: $prices, text: `Error to get the ${city_name} prices, please try again later` })

    const sortedByCategory = sortByCategory(prices)
    const categories = Object.keys(sortedByCategory)

    const containers = categories.map(category => `
    <div class="container" id="${category.replaceAll(' ', '-')}">
        <h3>${category}</h3>
        <div class="container prices">
            <ul class="list-of-prices">

            </ul>
        </div>
    </div>
    `
    )

    containers.map(container => $prices.innerHTML += container)

    for (let i in categories) {
        sortedByCategory[categories[i]].map(price => {
            const container = $(`#${price.category_name.replaceAll(' ', '-')} > div > ul`)
            if (container !== null) {

                let value = ''

                !price.usd?.avg ? value = `${price.avg}` : value = `${price.usd.avg}`
                container.innerHTML += `
                    <li>${price.item_name.toUpperCase()}: ${value}</li>
                `
            }
        })
    }
}

export default CityPrices