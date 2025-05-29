import fs from "fs";

class CartManager {
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
            throw new Error("Error al escribir el archivo JSON.", error.message);
        }
    }

    //  Obtiene todos los carritos
    async getCarts() {
        try {
            const carts = await this.readJSON();
            return carts;
        } catch (error) {
            throw new Error(`Error al obtener los carritos.`, error.message);
        }
    }

    //  Obtiene un carrito segun ID
    async getCartById(cid) {
        try {
            const carts = await this.readJSON();
            const cartIndex = carts.findIndex((c) => c.id === parseInt(cid));
            if (cartIndex === -1) {
                throw new Error(`Carrito no encontrado. ID: ${cid}`, error.message);
            }
            return carts[cartIndex].products;
        } catch (error) {
            throw new Error(`Error al obtener el carrito. ID: ${cid}`, error.message);
        }
    }

    //  Agrega un carrito nuevo
    async addCart() {
        try {
            const carts = await this.readJSON();
            const newId = this.idGenerator(carts);
            const newCart = { id: newId, products: [] }
            carts.push(newCart);
            await this.writeJSON(carts);
            return;
        } catch (error) {
            throw new Error(`Error al agregar el carrito`, error.message);
        }
    }

    //  Modifica un carrito segun ID
    async updateCartById(cid, pid, quantity) {
        try {
            const carts = await this.readJSON();
            const cartIndex = carts.findIndex((c) => c.id === parseInt(cid));
            if (cartIndex === -1) {
                throw new Error(`Carrito no encontrado. ID: ${cid}`, error.message);
            }
            const productIndex = carts[cartIndex].products.findIndex((p) => p.id === parseInt(pid));
            if (productIndex === -1) {
                carts[cartIndex].products.push({ id: parseInt(pid), quantity });
            } else {
                carts[cartIndex].products[productIndex].quantity += quantity;
            }
            await this.writeJSON(carts);
            return;
        } catch (error) {
            throw new Error(`Error al modificar el carrito. ID: ${cid}`, error.message);
        }
    }

    //  Elimina un carrito segun ID
    async deleteCartById(cid) {
        try {
            const carts = await this.readJSON();
            const cartIndex = carts.findIndex((c) => c.id === parseInt(cid));
            if (cartIndex === -1) {
                throw new Error(`Carrito no encontrado. ID: ${cid}`, error.message);
            }
            carts.splice(cartIndex, 1);
            await this.writeJSON(carts);
            return;
        } catch (error) {
            throw new Error(`Error al eliminar el carrito. ID: ${cid}`, error.message);
        }
    }

    //  Generador de nuevos ID's
    idGenerator(carts) {
        if (carts.length > 0) {
            const newId = carts[carts.length - 1].id + 1;
            return newId;
        } else {
            return 1;
        }
    }

}

export default CartManager