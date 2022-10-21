import { getPrices } from "../services/services"
import { $ } from "../utils/$"
import localStorage from "../utils/localStorage"
import { removeComas } from "../utils/removeComas"

const $app = $('#app')

const Home = async (): Promise<Error | void> => {
    if ($app === null) throw new Error('Ups!')

    $app.innerHTML += `
        <div class="container">
            <h1>COST OF LIVING IN <span class="living-in">...</span></h1>
            <form>
                <label>Search A City 
                    <input type="text" class="search-engine" placeholder="New York" autocomplete="off">
                </label>
            </form>

            <div id="prices" class="container" ></div>
                
        </div>
    `
    const $input = $('input') as HTMLInputElement | null

    document.addEventListener('submit', async (evt: Event) => {

        evt.preventDefault()
        const $prices = $('#prices')
        if ($prices === null) throw new Error('Oups')
        $prices.innerHTML = ''

        if ($input === null || $input.value === null) throw new Error('Oops, something wrong happened')
        const { value: cityNameFromUser } = $input
        const { cities } = localStorage.cities()

        if (!cities) throw new Error('An error has occured. Please try again later')

        const foundCity = cities.find(({ city_name }) => city_name === cityNameFromUser)

        if (foundCity === undefined) {
            $prices.innerHTML = '<h2 class="error">Sorry, The city you are looking for has not been found</h2>'
            $input.value = ''
            throw new Error('City are looking for for has not been found')
        }

        const { city_name, country_name } = foundCity

        const prices = await getPrices(city_name, country_name)

        if (!prices) throw new Error('An error has occured. Please try again later')

        const $livingIn = $('.living-in')
        if (!$livingIn) throw new Error('ups!')
        $livingIn.innerHTML = city_name.toUpperCase()
        $prices.innerHTML = `
                <div class="container">
                <h2>${city_name}</h2>
                 <ul>
                    ${removeComas(prices.map(({ item_name, avg }) => `<li><span>${item_name}</span>  <span>${avg}$</span></li>`).toString())}
                 </ul>
                   
                
                </div>
            `
        $input.value = ''

    })
}


export default Home