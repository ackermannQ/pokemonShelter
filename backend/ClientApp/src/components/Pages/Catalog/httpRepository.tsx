import axios from "axios";

export function getAllProducts(): Promise<any> {
    return axios.get('/api/products/');
}

export function getProductById(id: string): Promise<any> {

    return axios.get(`/api/products/${id}`)
}

export function getFilters(): Promise<any> {

    return axios.get('/api/products/filters/');
}
