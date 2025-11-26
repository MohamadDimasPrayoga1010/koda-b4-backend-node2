import prisma from "../libs/prisma.js";

export async function getProducts() {
    return await prisma.product.findMany();
}

export async function getProductById(id) {
    return await prisma.product.findUnique({
        where: { id }
    });
}

export async function addProduct(name, price) {
    return await prisma.product.create({
        data: { name, price: Number(price) }
    });
}

export async function updateProduct(id, name, price) {
    return await prisma.product.update({
        where: { id },
        data: {
            name,
            price: Number(price)
        }
    });
}

export async function deleteProduct(id) {
    return await prisma.product.delete({
        where: { id }
    });
}
