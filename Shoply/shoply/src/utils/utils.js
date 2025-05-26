export const searching = (arr, searchBy, text) => {
    return arr.filter((item) => item[searchBy].toLowerCase().includes(text.toLowerCase()))
}
 
export const paginate = (arr, currentPage, pageSize) => {
    let startIndex = currentPage * pageSize
    let endIndex = startIndex + pageSize
    return arr.slice(startIndex, endIndex)
}

export const filterPrice = (arr, price) =>{
    return arr.filter(item => item.price <= price)
}

export const filterByCategory = (arr, categoryArr) =>{
    return arr.filter(item => categoryArr.includes(item.category))
}