import axios from "axios";

axios.defaults.withCredentials = true;

export function getBasket() {
    return axios.get("/api/basket");
}

export function AddItem(productId: number, quantity: number = 1) {
    return axios.post(`/api/basket?productId=${productId}&quantity=${quantity}`, {});
}


export function RemoveItem(productId: number, quantity: number = 1) {
    return axios.delete(`/api/basket?productId=${productId}&quantity=${quantity}`);
}
