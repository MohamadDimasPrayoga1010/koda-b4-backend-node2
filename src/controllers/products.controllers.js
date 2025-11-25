import { upload } from "../libs/uploads.js";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../models/products.models.js";

/**
 * GET /api/products
 * @summary Get all products with search, pagination, limit, sort
 * @tags Products
 * @param {string} search.query - keyword untuk search nama produk
 * @param {number} page.query - nomor halaman (default 1)
 * @param {number} limit.query - jumlah item per halaman (default 10)
 * @param {string} sort.query - 'termurah' untuk harga termurah, 'termahal' untuk harga termahal
 * @return {object} 200 - Success response
 */
export function products(req, res) {
    let result = getProducts();

    const { search, page = 1, limit = 10, sort } = req.query;

    if (search) {
        result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (sort === "termurah") {
        result = result.sort((a, b) => a.price - b.price);
    } else if (sort === "termahal") {
        result = result.sort((a, b) => b.price - a.price);
    }

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const start = (pageInt - 1) * limitInt;
    const end = start + limitInt;

    const paginated = result.slice(start, end);

    res.json({
        success: true,
        message: "Berhasil get product",
        total: result.length,
        page: pageInt,
        limit: limitInt,
        data: paginated
    });
}

/**
 * GET /api/products/{id}
 * @summary Get product by ID
 * @tags Products
 * @param {number} id.path.required - Product ID
 * @return {object} 200 - Success response
 * @return {object} 404 - Product not found
 */
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


/**
 * POST /api/products/{id}/upload
 * @summary Upload gambar product
 * @tags Products
 * @param {number} id.path.required - ID product
 * @param {file} picture.form.required - File gambar product - multipart/form-data
 * @return {object} 200 - Upload berhasil
 * @return {object} 400 - File invalid atau terlalu besar
 * @return {object} 404 - Product tidak ditemukan
 */
export function uploadProductPicture(req, res) {
    const id = parseInt(req.params.id);
    const product = getProductById(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product tidak ditemukan"
        });
    }

    upload.single("picture")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ 
                success: false, 
                message: "File to large"
            });
        }

        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "File tidak ditemukan" 
            });
        }

        product.image = req.file.filename;

        res.json({
            success: true,
            message: "Upload berhasil",
            file: req.file.filename,
            product
        });
    });
}


/**
 * POST /api/products
 * @summary Create new product
 * @tags Products
 * @param {object} request.body.required - Product body
 * @param  {string} name.form.required - name product - application/x-www-form-urlencoded
 * @param  {number} price.form.required - price - application/x-www-form-urlencoded
 * @return {object} 200 - Success response
 */
export function createProduct(req, res){
    const {name, price} = req.body;
    const newProduct = addProduct(name, price)

    res.json({
        success:true,
        message: "Berhasil membuat product baru",
        data: newProduct
    })
}


/**
 * PATCH /api/products/{id}
 * @summary Update product by ID
 * @tags Products
 * @consumes application/x-www-form-urlencoded
 * @param {number} id.path.required - Product ID
 * @param {object} request.body.required - Product body
 * @param  {string} name.form.required - name product - application/x-www-form-urlencoded
 * @param  {number} price.form.required - price - application/x-www-form-urlencoded
 * @return {object} 200 - Success response
 * @return {object} 404 - Product not found
 */
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

/**
 * DELETE /api/products/{id}
 * @summary Delete product by ID
 * @tags Products
 * @param {number} id.path.required - Product ID
 * @return {object} 200 - Success response
 * @return {object} 404 - Product not found
 */
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

