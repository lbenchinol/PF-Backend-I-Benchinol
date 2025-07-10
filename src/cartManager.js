import Cart from "./models/cart.model";

class CartManager {

    //  Obtiene un carrito segun ID
    async getCartById(cid) {
        try {
            const cart = await Cart.findById(cid).populate('products.product');
            return cart;
        } catch (error) {
            throw new Error(`Error al obtener el carrito. ID: ${cid}`, error);
        }
    }

    //  Agrega un carrito nuevo
    async addCart() {
        try {
            const cart = new Cart();
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al agregar el carrito`, error);
        }
    }

    //  Modifica un carrito segun ID
    async updateCartById(cid, pid, quantity) {
        try {
            const cart = await Cart.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity } } }, { new: true, runValidators: true }).populate('products.product');
            if (!cart) throw new Error(`Error al encontrar el carrito. ID: ${cid}`);
            return cart;
        } catch (error) {
            throw new Error(`Error al modificar el carrito. ID: ${cid}`, error);
        }
    }

    //  Vaciar un carrito segun ID
    async cleanCartById(cid) {
        try {
            const cart = new Cart.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true, runValidators: true });
        } catch (error) {
            throw new Error(`Error al vaciar el carrito. ID: ${cid}`, error);
        }
    }

    // Elimina producto segun ID del carrito segun ID
    async deleteProductById(cid, pid) {
        try {
            const cart = await Cart.findByIdAndUpdate(cid, { $pull: { products: { product: pid } } }, { new: true, runValidators: true }).populate('products.product');
            if (!cart) throw new Error(`Error al encontrar el carrito. ID: ${cid}`);
            return cart;
        } catch (error) {
            throw new Error(`Error al eliminar el producto ID: ${pid} del carrito ID: ${cid}`, error);
        }
    }
}

export default CartManager