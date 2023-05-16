import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: { cartItems: [] },
    reducers: {
        add: (state, action) => {
            const itemId = action.payload.itemId
            const categorie = action.payload.categorie
            if (!(state.cartItems.find(ele => ele.itemId == itemId) || state.cartItems.find(ele => ele.categorie == categorie))) {
                state.cartItems.push(action.payload)
            } else {
                alert("this categorie is already selected !")
            }
        },
        remove: (state, action) => {
            state.cartItems = state.cartItems.filter(ele => ele.itemId != action.payload.itemId)
        },
        removeAll: (state, action) => {
            state.cartItems = []
        },
        updatequantiter: (state, action) => {
            const updatedCartItems = state.cartItems.map((item) =>
                item.itemId === action.payload.el.itemId
                    ? { ...item, quantiter: action.payload.quantiter }
                    : item
            );
            return { ...state, cartItems: updatedCartItems };

        }
    }
})

export default cartSlice;
export const cartActions = cartSlice.actions;