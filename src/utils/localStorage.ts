const cities = (): Cities => {
    const cities = window.localStorage.getItem('cities')

    if (!cities) throw new Error('There are no cities in the localstorage')

    return JSON.parse(cities) as Cities
}

const prices = (city: string): Price[] => {
    const pricesObj = window.localStorage.getItem(city)

    if (!pricesObj) throw new Error(`There are no prices of ${city} in the localstorage`)

    const { prices } = JSON.parse(pricesObj) as Prices

    return prices
}


export default { cities, prices }