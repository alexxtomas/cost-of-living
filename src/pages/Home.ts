import CityPrices from "../components/CityPrices"
import ErrorHandler from "../components/ErrorHandler"
import { $ } from "../utils/$"
import { cleanPage } from "../utils/cleanPage"

const $app = $('#app')
const formID = 'individual-city'

const Home = async (): Promise<Error | void | string> => {
    if ($app === null) return ErrorHandler({ type: "nullDOMelement" })

    $app.innerHTML += `
        <div class="container">
            <hgroup>
                <h1>COST OF LIVING 💰</h1>
                <h2 class="living-in"></h2>
            </hgroup>
            
            <form id="individual-city">
                <label>Enter a City
                    <input type="text" class="search-engine" placeholder="New York" autocomplete="off">
                </label>
                <button id="individual-city-button" aria-busy="false" class="contrast"> SEARCH 🔍</button>
            </form>

            <div id="prices" class="container"></div>
                
        </div>
    `
    document.addEventListener('submit', async (evt: Event) => {
        evt.preventDefault()
        const { id } = evt.target as HTMLFormElement
        if (id === formID) {
            const $input = $('input') as HTMLInputElement | null
            const $button = $('button')
            const $livingIn = $('.living-in')
            const $prices = $('#prices')

            if (!$button || !$input || !$livingIn || !$prices) return ErrorHandler({ type: 'nullDOMelement' })
            if ($input.value === '') {
                $livingIn.innerHTML = ''
                return ErrorHandler({ type: "default", tag: "h3", element: $prices, text: 'Please enter a valid city' })
            }

            $button.textContent = ''
            $button.ariaBusy = 'true'

            setTimeout(async () => {
                $button.ariaBusy = 'false'
                $button.textContent = 'SEARCH 🔍'
                cleanPage($prices)
                await CityPrices($livingIn, $input, $prices)
                $input.value = ''
            }, 2000)


        }
    })
}


export default Home