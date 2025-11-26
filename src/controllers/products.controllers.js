import { promisify } from "util";
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
export async function products(req, res) {
    let result = await getProducts();

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
export async function productById(req, res) {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);

    if (product) {
        res.json({ success: true, message: "Berhasil get product", data: product });
    } else {
        res.status(404).json({ success: false, message: "Product tidak ditemukan" });
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
const uploadSingleAsync = promisify(upload.single("picture"));
export async function uploadProductPicture(req, res) {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product tidak ditemukan",
        });
    }

    try {
        await uploadSingleAsync(req, res);
    } catch (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File terlalu besar (max 2MB)",
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "File tidak ditemukan",
        });
    }

    const imageUrl = process.env.UPLOAD_BASE_URL + req.file.filename;

    const updated = await prisma.product.update({
        where: { id },
        data: { image: imageUrl },
    });

    res.json({
        success: true,
        message: "Upload berhasil",
        file: req.file.filename,
        data: updated,
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
export async function createProduct(req, res){
    const { name, price } = req.body;
    const newProduct = await addProduct(name, price);

    res.json({
        success: true,
        message: "Berhasil membuat product baru",
        data: newProduct
    });
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
export async function editProduct(req, res) {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;

    try {
        const updated = await updateProduct(id, name, price);
        res.json({
            success: true,
            message: "Product berhasil diupdate",
            data: updated
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Product tidak ditemukan"
        });
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
export async function removeProduct(req, res) {
    const id = parseInt(req.params.id);

    try {
        const deleted = await deleteProduct(id);
        res.json({
            success: true,
            message: "Product berhasil dihapus",
            data: deleted
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Product tidak ditemukan"
        });
    }
}

