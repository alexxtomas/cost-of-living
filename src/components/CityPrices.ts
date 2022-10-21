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
        $livingIn.innerHTML = ''
        $input.value = ''
        return ErrorHandler({ type: "default", tag: "h3", element: $prices, text: 'Sorry, the city you are looking for has not been found' })
    }

    const { city_name, country_name } = foundCity

    $livingIn.innerHTML = `<strong><mark>${city_name.toUpperCase()}</mark></strong>`
    const prices = await getPrices(city_name, country_name)

    if (!prices) return ErrorHandler({ type: 'default', tag: "h3", element: $prices, text: `Error to get the ${city_name} prices, please try again later` })

    const sortedByCategory = sortByCategory(prices)
    const categories = Object.keys(sortedByCategory)

    const emojis = ['<span class="square-meter">㎡</span>', '🏫', '👖', '🏪', '🏢', '🍽️', '💸', '🏋️', '🚕', '📶']
    let emojisIndex = 0
    const containers = categories.map(category => {
        let categoryTitle = `${category} ${emojis[emojisIndex]}`
        emojisIndex += 1
        return `
    <div class="container prices-card" id="${category.replaceAll(' ', '-')}">
        <h3>${categoryTitle}</h3>
        <div class="container prices">
            
        </div>
    </div>
    `
    })

    containers.map(container => $prices.innerHTML += container)

    for (let i in categories) {
        sortedByCategory[categories[i]].map(price => {
            const container = $(`#${price.category_name.replaceAll(' ', '-')} > .container `)
            if (container !== null) {
                let value = ''

                !price.usd?.avg ? value = `${price.avg}%` : value = `$${price.usd.avg}`
                container.innerHTML += `
                    <p>${price.item_name}: <span class="value">${value}</span></p>
                `
            }
        })
    }
}

export default CityPrices