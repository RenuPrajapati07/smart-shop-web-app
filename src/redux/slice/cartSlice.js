import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cartItems: [],
    TotalQuantity: 0,
    TotalAmount: 0,
};

const cartSlice =  createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart:(state, action)=>  {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            state.TotalQuantity++

            if(!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price:newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            }

            else {
                existingItem.quantity++
                existingItem.totalPrice = 
                    Number(existingItem.totalPrice) + Number(newItem.price)
            }

            state.TotalAmount = state.cartItems.reduce((total, item)=> total +
            Number(item.price) * Number(item.quantity),0);

        },
        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
    
            if(existingItem) {
                state.cartItems.filter((item) => item.id !== id);
                state.TotalQuantity = state.TotalQuantity - existingItem.quantity;
            }
    
            state.TotalAmount = state.cartItems.reduce(
                (total,item) => total + Number(item.price) * Number(item.quantity),0
            );
        },
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;