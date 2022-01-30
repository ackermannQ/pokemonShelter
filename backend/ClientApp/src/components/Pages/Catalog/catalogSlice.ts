import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { manageError } from "../../../api/errorManager";
import { RootState } from "../../../store/configureStore";
import { getAllProducts, getFilters, getProductById } from "./httpRepository";
import { IProduct } from "./IProduct";

const productsAdapter = createEntityAdapter<IProduct>();

export const fetchProductsAsync = createAsyncThunk<IProduct[]>(
    'catalog/fetchProductsAsync',
    async () => {
        try {
            return await getAllProducts();
        } catch (error) {
            manageError(error);
        }
    }
);

export const fetchProductAsync = createAsyncThunk<IProduct, number>(
    'catalog/fetchProductAsync',
    async (productId) => {
        try {
            return await getProductById(productId.toString());
        } catch (error) {
            manageError(error);
        }
    }
);

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return getFilters();
        } catch (error) {
            manageError(error);
        }
    }
);

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        types: []
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

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.types = action.payload.data.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState )=> state.catalog);
