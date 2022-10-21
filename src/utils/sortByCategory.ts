export const sortByCategory = (prices: Price[]) => {
    let allCategoriesArray: string[] = prices.map(price => price.category_name)
    allCategoriesArray = allCategoriesArray.filter((item, index) => allCategoriesArray.indexOf(item) === index)

    let obj: Record<string, Price[]> = {}

    allCategoriesArray.map(category => obj[category] = prices.filter(price => price.category_name === category))

    return obj

}

