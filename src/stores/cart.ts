//this store creates a cart list that can be added to or can remove products -> by use of the methods in this store.
//methods to return the quantity and total price of the cart, to check out(empty cart)

import { defineStore } from 'pinia';
import { ProductInfo } from './products.ts'; // Adjust the import path as necessary
//import { productsStore } from './products.ts';
import { useProductsStore } from './products.ts';
//import {useNotificationStore} from "./notificationStore.ts";

// Extend ProductInfo to include a quantity for cart items
export interface CartItem extends ProductInfo{
    quantity: number;
}

export const useCartStore = defineStore({
    id:'cart',

    state: () => {
    return {

        //for initially empty lists
        cartList: [] as CartItem[],

    }
},

    getters: {
        totalQuantity: (state) => {
            return state.cartList.reduce((total, item) => total + item.quantity, 0);
        },

        totalPrice: (state) => {

            return state.cartList.reduce((total, item) => {

                const product: ProductInfo | undefined = useProductsStore().getProductById(Number(item.id));
                return total + (product ? product.price * item.quantity : 0);
            }, 0);
        },
    },

    actions: {
        addItem(productId: number, quantity: number = 1) {

            const product = useProductsStore().getProductById(productId);
            if (!product) {
                console.error('Product not found');
                return;
            }

            const existingItemIndex = this.cartList.findIndex(item => item.id === productId);

            if (existingItemIndex !== -1) {
                // Product already in cart, update quantity
                this.cartList[existingItemIndex].quantity += quantity;
            } else {
                // Product not in cart, add new item
                // Since CartItem extends ProductInfo, we spread the product info and add quantity
                const newItem: CartItem = {
                    ...product, // Spread operator to include all ProductInfo properties
                    quantity, // Add the quantity property
                };
                this.cartList.push(newItem);
            }

        },

        checkout() {
            this.cartList = []; // Clears the cart
            // Additional checkout logic can be implemented here
        },


        removeItem(productId: number) {
            const index = this.cartList.findIndex(item => item.id === productId);
            if (index !== -1) {
                // Check if the item quantity is more than 1
                if (this.cartList[index].quantity > 1) {
                    // If so, decrease the quantity by 1
                    this.cartList[index].quantity -= 1;
                } else {
                    // If quantity is 1, remove the item from the cart
                    this.cartList.splice(index, 1);
                }
            }
        },


    },

    })