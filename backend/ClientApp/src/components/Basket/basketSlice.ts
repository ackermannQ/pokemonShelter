import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { manageError } from "../../api/errorManager";
import { add, remove } from "./httpRepository";
import { IBasket } from "./interfaces";

interface BasketState {
    basket: IBasket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<IBasket, { productId: number, quantity?: number }>(
    'basket/addBasketItemAsync',
    async ({ productId, quantity = 1 }) => {
        try {
            return await add(productId, quantity);
        } catch (error) {
            manageError(error);
        }
    }
);

export const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity?: number }>(
    'basket/removeBasketItemAsync',
    async ({ productId, quantity = 1 }) => {
        try {
            remove(productId, quantity);
        } catch (error) {
            manageError(error)
        }
    });

/**
 * Creation of the basket slice with reducers & extraReducers (=to represent the lifecycle of the promise)
 */
export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });

        builder.addCase(addBasketItemAsync.fulfilled, (state, action: any) => {
            state.basket = action.payload.data; // The basket corresponds to the data returned by the payload, have to type it as any otherwise it won't work here
            state.status = 'idle';
        });

        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;

            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;

            state.basket!.items[itemIndex].quantity -= quantity!;

            if (state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);

            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
});

export const { setBasket } = basketSlice.actions;
