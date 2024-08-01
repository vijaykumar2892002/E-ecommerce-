import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const { payload } = action;
            const existingProductIndex = state.products.findIndex(product => product._id === payload._id);
            if (existingProductIndex !== -1) {
                // If product already exists in cart, update its quantity and total price
                state.products[existingProductIndex].quantity += 1;
                state.total += payload.price;
            } else {
                // Otherwise, add the product to the cart
                state.products.push({ ...payload, quantity: 1 });
                state.total += payload.price;
            }
        },
        removeProduct: (state, action) => {
            const productId = action.payload;
            const productIndex = state.products.findIndex(product => product._id === productId);
            if (productIndex !== -1) {
                // Reduce total price by the price of the removed product
                state.total -= state.products[productIndex].price * state.products[productIndex].quantity;
                // Remove the product from the cart
                state.products.splice(productIndex, 1);
            }
        },
    }
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
