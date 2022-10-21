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
            <h1>COST OF LIVING IN <span class="living-in"> ...</span></h1>
            <form id="individual-city">
                <label>Search a city 
                    <input type="text" class="search-engine" placeholder="New York" autocomplete="off">
                </label>
            </form>

            <div id="prices" class="container"></div>
                
        </div>
    `
    document.addEventListener('submit', async (evt: Event) => {
        evt.preventDefault()
        const { id } = evt.target as HTMLFormElement
        if (id === formID) {
            const $input = $('input') as HTMLInputElement | null
            const $prices = $('#prices')
            const $livingIn = $('.living-in')
            if (!$prices || !$input || !$input.value || !$livingIn) return ErrorHandler({ type: 'nullDOMelement' })
            cleanPage($prices)
            await CityPrices($livingIn, $input, $prices)
            $input.value = ''
        }
    })
}


export default Home