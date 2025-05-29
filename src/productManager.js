import fs from "fs";

class ProductManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    //  Obtiene y codifica la informacion JSON
    async readJSON() {
        try {
            return JSON.parse(await fs.promises.readFile(this.pathFile, "utf-8"));
        } catch (error) {
            throw new Error(`Error al leer el archivo JSON.`, error.message);
        }
    }

    //  Codifica y escribe la informacion JSON
    async writeJSON(data) {
        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2), "utf-8");
            return;
        } catch (error) {
            throw new Error(`Error al escribir el archivo JSON.`, error.message);
        }
    }

    //  Obtiene todos los productos
    async getProducts() {
        try {
            const products = await this.readJSON();
            return products;
        } catch (error) {
            throw new Error(`Error al obtener los productos.`, error.message);
        }
    }

    //  Obtiene un producto segun ID
    async getProductById(pid) {
        try {
            const products = await this.readJSON();
            const productIndex = products.findIndex((p) => p.id === parseInt(pid));
            if (productIndex === -1) {
                throw new Error(`Producto no encontrado. ID: ${pid}`, error.message);
            }
            return products[productIndex];
        } catch (error) {
            throw new Error(`Error al obtener el producto. ID: ${pid}`, error.message);
        }
    }

    //  Agrega un producto nuevo
    async addProduct(product) {
        try {
            const products = await this.readJSON();

            let { title, description, code, price, status, stock, category, thumbnails } = product;

            title !== "" ? title.trim() : title;
            description !== "" ? description.trim() : description;
            code !== "" ? code.trim() : code;
            status = true;
            category !== "" ? category.trim() : category;
            thumbnails !== "" ? thumbnails.trim() : thumbnails;

            if (title == "" || description == "" || code == "" || price < 0 || stock < 0 || category == "") {
                throw new Error(`Ingrese los valores correctamente.`, error.message);
            }
            if (products.find(p => p.code === code)) {
                throw new Error(`Error en el campo code (${code}). Ya se encuentra en el listado de productos.`, error.message);
            }

            const newId = this.idGenerator(products);
            const newProduct = { id: newId, title, description, code, price, status, stock, category, thumbnails };
            products.push(newProduct);
            await this.writeJSON(products);
            return;
        } catch (error) {
            throw new Error(`Error al agregar el producto.`, error.message);
        }
    }

    //  Modifica un producto segun ID
    async updateProductById(pid, updatedProduct) {
        try {
            const products = await this.readJSON();
            const productIndex = products.findIndex((p) => p.id === parseInt(pid));
            if (productIndex === -1) {
                throw new Error(`Producto no encontrado. ID: ${pid}`, error.message);
            }
            products[productIndex] = { ...products[productIndex], ...updatedProduct };
            await this.writeJSON(products);
            return;
        } catch (error) {
            throw new Error(`Error al modificar el producto. ID: ${pid}`, error.message);
        }
    }

    //  Elimina un producto segun ID
    async deleteProductById(pid) {
        try {
            const products = await this.readJSON();
            const productIndex = products.findIndex((p) => p.id === parseInt(pid));
            if (productIndex === -1) {
                throw new Error(`Producto no encontrado. ID: ${pid}`, error.message);
            }
            products.splice(productIndex, 1);
            await this.writeJSON(products);
            return;
        } catch (error) {
            throw new Error(`Error al eliminar el producto. ID: ${pid}`, error.message);
        }
    }

    //  Generador de nuevos ID's
    idGenerator(products) {
        if (products.length > 0) {
            const newId = products[products.length - 1].id + 1;
            return newId;
        } else {
            return 1;
        }
    }

}

export default ProductManager;