import localStorage from "../utils/localStorage";

export const getCities = (): void => {
    const cities = window.localStorage.getItem('cities')

    if (!cities) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dac446efd2msha9d86297bd0bc76p16446djsnc3d0a0b259c7',
                'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
            }
        };

        fetch('https://cost-of-living-and-prices.p.rapidapi.com/cities', options)
            .then(response => response.json())
            .then((response: Cities) => window.localStorage.setItem('cities', JSON.stringify(response)))
            .catch(err => console.error(err));
    }
}

export const getPrices = (city: string, country: string): Promise<void | Price[]> | Price[] => {

    const prices = window.localStorage.getItem(city)

    if (!prices) {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dac446efd2msha9d86297bd0bc76p16446djsnc3d0a0b259c7',
                'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
            }
        }

        return fetch(`https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${city}&country_name=${country}`, options)
            .then(response => response.json())
            .then((response: Prices) => {
                window.localStorage.setItem(response.city_name, JSON.stringify(response))
                const { prices } = response
                return prices
            })

            .catch(err => console.error(err))
    }

    return localStorage.prices(city)




}



