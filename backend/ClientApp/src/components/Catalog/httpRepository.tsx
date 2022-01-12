import axios from "axios";

export function getAllProducts() {
    return axios.get('/api/products/');
}

export function getProductById(id: string) {

    return axios.get(`/api/products/${id}`)
}
