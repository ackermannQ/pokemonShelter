import axios from "axios";

axios.defaults.withCredentials = true;

/**
 * Get the basket
 */
export function getBasket() {
    return axios.get("/api/basket");
}

/**
 * Add a product to the basket
 * @param {number} productId Id corresponding to the product to add
 * @param {number} quantity Quantity of the product to add, 1 by default
 */
export function add(productId: number, quantity: number = 1): Promise<any> { // Cause a TS error because the return type is AsyncThunkPayloadCreator<IBasket, { productId: number; quantity: number; } in the basketSlice so I put any instead in return type
    return axios.post(`/api/basket?productId=${productId}&quantity=${quantity}`, {});
}

/**
 * Remove a product from the basket
 * @param {number} productId Id corresponding to the product to add
 * @param {number} quantity Quantity of the product to add, 1 by default
 */
export function remove(productId: number, quantity: number = 1) {
    return axios.delete(`/api/basket?productId=${productId}&quantity=${quantity}`);
}
