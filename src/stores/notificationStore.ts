
//deals with displaying notifications to show remove/ addition of products to cart.

import { defineStore } from 'pinia';
import { ElNotification } from 'element-plus'; //notif box

export const useNotificationStore = defineStore('notification', {
    actions: {

        //shows added to cart successfully - cart page

        addedToCartNotification(message: string) {
            console.log("item added");

            ElNotification({
                title: 'Success',
                message: message,
                type: 'success',
                duration: 3000,


            });
            console.log("item added");
        },


        //shows pop up removed from cart successfully - on cart page
        removedFromCartNotification(message: string) {

            ElNotification({
                title: 'Success',
                message: message,
                type: 'success',
                duration: 3000, // Adjust time as needed


            });

        },

    }
});