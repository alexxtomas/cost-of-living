import { getPrices } from "../services/services"
import { $ } from "../utils/$"
import localStorage from "../utils/localStorage"
import { removeComas } from "../utils/removeComas"

const $app = $('#app')

const Home = async (): Promise<Error | void> => {
    if ($app === null) throw new Error('Ups!')

    console.log('b')

    $app.innerHTML += `
        <div class="container">
            <h1>COST OF LIVING IN <span class="living-in">...</span></h1>
            <form>
            <label>Search A City 
                <input type="text" class="search-engine" placeholder="New York" autocomplete="off">
            </label>
            </form>
                
        </div>
    `
    console.log('c')

    const $form = $('form')
    const $input = $('input') as HTMLInputElement | null
    const $button = $('button')

    // $button?.addEventListener('click', async (evt) => {
    //     console.log('bbb')
    //     if ($input === null || $input.value === null) throw new Error('Oops, something wrong happened')
    //     const { value: cityNameFromUser } = $input
    //     const { cities } = localStorage.cities()

    //     if (!cities) throw new Error('An error has occured. Please try again later')

    //     console.log(cities.find(({ city_name }) => city_name === cityNameFromUser) as City)

    //     const foundCity = cities.find(({ city_name }) => city_name === cityNameFromUser)

    //     if (foundCity === undefined) {
    //         $app.innerHTML += '<span class="error">Sorry, The city you are looking for has not been found</span>'
    //         throw new Error('City are looking for for has not been found')

    //     }

    //     const { city_name, country_name } = foundCity

    //     if (!city_name && !country_name) $app.innerHTML += `<h3 class="not-found">${cityNameFromUser} not found</h3>`

    //     else {
    //         const prices = await getPrices(city_name, country_name)

    //         if (!prices) throw new Error('An error has occured. Please try again later')

    //         const $livingIn = $('.living-in')
    //         if (!$livingIn) throw new Error('ups!')
    //         $livingIn.innerHTML = city_name.toUpperCase()
    //         $app.innerHTML += `
    //             <div class="container">
    //              <ul>
    //                 ${removeComas(prices.map(({ item_name, avg }) => `<li><span>${item_name}</span>  <span>${avg}$</span></li>`).toString())}
    //              </ul>


    //             </div>
    //         `
    //     }
    // })



    $form?.addEventListener('submit', async (evt: Event) => {
        console.log('a')
        evt.preventDefault()
        if ($input === null || $input.value === null) throw new Error('Oops, something wrong happened')
        const { value: cityNameFromUser } = $input
        const { cities } = localStorage.cities()

        if (!cities) throw new Error('An error has occured. Please try again later')

        console.log(cities.find(({ city_name }) => city_name === cityNameFromUser) as City)

        const foundCity = cities.find(({ city_name }) => city_name === cityNameFromUser)

        if (foundCity === undefined) {
            $app.innerHTML += '<span class="error">Sorry, The city you are looking for has not been found</span>'
            throw new Error('City are looking for for has not been found')

        }

        const { city_name, country_name } = foundCity

        if (!city_name && !country_name) $app.innerHTML += `<h3 class="not-found">${cityNameFromUser} not found</h3>`

        else {
            const prices = await getPrices(city_name, country_name)

            if (!prices) throw new Error('An error has occured. Please try again later')

            const $livingIn = $('.living-in')
            if (!$livingIn) throw new Error('ups!')
            $livingIn.innerHTML = city_name.toUpperCase()
            $app.innerHTML += `
                <div class="container">
                 <ul>
                    ${removeComas(prices.map(({ item_name, avg }) => `<li><span>${item_name}</span>  <span>${avg}$</span></li>`).toString())}
                 </ul>
                   
                
                </div>
            `
        }
    })

}


export default Home