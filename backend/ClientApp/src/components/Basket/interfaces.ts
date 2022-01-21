export interface IBasketItems {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    type: string;
    quantity: number;
}

export interface IBasket {
    id: number;
    buyerId: string;
    items: IBasketItems[];
}
