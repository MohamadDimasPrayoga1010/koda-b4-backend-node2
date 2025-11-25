const products = [
    {
        id: 1,
        name: "Product A",
        price: 10000
    },
    {
        id: 2,
        name: "Product B",
        price: 20000
    },
    {
        id: 3,
        name: "Product C",
        price: 20000
    }
]

export function getProducts(){
    return products
}


export function getProductById(id) {
    return products.find(product => product.id === id);
}

export function addProduct(name, price){
    const newProduct = {
        id: products.length + 1,
        name, 
        price
    }
    products.push(newProduct)
    return newProduct
}

export function updateProduct(id, name, price){
    const product = getProductById(id);
    if(product){
        product.name = name ?? product.name
        product.price == price ?? product.price
        return product
    }
    return null
}

export function deleteProduct(id){
    const index = products.findIndex(p => p.id === id)
    if(index !== -1){
        return products.splice(index, 1[0])
    }
    return null
}

