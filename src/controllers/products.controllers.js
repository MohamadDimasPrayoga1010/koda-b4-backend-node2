import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../models/products.models.js";

export function products(req, res) {
    const allProducts = getProducts(); 
    res.json({
        success: true,
        message: "Berhasil get product",
        data: allProducts
    });
}

export function productById(req, res) {
    const id = parseInt(req.params.id); 
    const product = getProductById(id);

    if (product) {
        res.json({
            success: true,
            message: "Berhasil get product",
            data: product
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Product tidak ditemukan"
        });
    }
}

export function createProduct(req, res){
    const {name, price} = req.body;
    const newProduct = addProduct(name, price)

    res.json({
        success:true,
        message: "Berhasil update product",
        data: newProduct
    })
}

export function editProduct(req, res) {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const updated = updateProduct(id, name, price);

    if (updated) {
        res.json({ 
            success: true, 
            message: "Product berhasil diupdate", 
            data: updated });
    } else {
        res.status(404).json({ 
            success: false, 
            message: "Product tidak ditemukan" });
    }
}


export function removeProduct(req, res) {
    const id = parseInt(req.params.id);
    const deleted = deleteProduct(id);

    if (deleted) {
        res.json({ 
            success: true, 
            message: "Product berhasil dihapus", 
            data: deleted });
    } else {
        res.status(404).json({ 
            success: false, 
            message: "Product tidak ditemukan" });
    }
}
