const products = [
    {
        id: 1,
        name: "Latte",
        price: 12000
    },
    {
        id: 2,
        name: "Americano",
        price: 20000
    },
    {
        id: 3,
        name: "Coffe Black",
        price: 20000
    },
     {
        id: 4,
        name: "Tea",
        price: 5000
    },
     {
        id: 5,
        name: "Ice tea",
        price: 13000
    },
     {
        id: 6,
        name: "Satu nusa coffe",
        price: 31000
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
        product.name == name ?? product.name
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

