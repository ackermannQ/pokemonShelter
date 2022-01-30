import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { manageError } from "../../../api/errorManager";
import { RootState } from "../../../store/configureStore";
import { getAllProducts, getProductById } from "./httpRepository";
import { IProduct } from "./IProduct";

const productsAdapter = createEntityAdapter<IProduct>();

export const fetchProductsAsync = createAsyncThunk<IProduct[]>(
    'catalog/fetchProductsAsync',
    async () => {
        try {
            return await getAllProducts();
        } catch (error) {
            manageError(error)
        }
    }
);

export const fetchProductAsync = createAsyncThunk<IProduct, number>(
    'catalog/fetchProductAsync',
    async (productId) => {
        try {
            return await getProductById(productId.toString());
        } catch (error) {
            manageError(error)
        }
    }
);

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
          builder.addCase(fetchProductsAsync.fulfilled, (state, action:any) => {
              productsAdapter.setAll(state, action.payload.data);
              state.status = 'idle';
              state.productLoaded = true;
          });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
              state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct'
        });
          builder.addCase(fetchProductAsync.fulfilled, (state, action:any) => {
              productsAdapter.upsertOne(state, action.payload.data);
              state.status = 'idle';
          });
        builder.addCase(fetchProductAsync.rejected, (state) => {
              state.status = 'idle';
        });
    })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState )=> state.catalog);
