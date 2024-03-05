//reads in users, makes a array of user objects ( with chosen info from the data read in)
//used in methods in vue components to link user to a product based on matching IDs
//need to update the function to be here and not repeated created in vue components !

import { defineStore } from 'pinia'
import axios from 'axios'
//import {UnwrapRef} from "vue";
//import {ProductInfo} from "./products.ts";

export const usersStore = defineStore({

    id: 'users',

    state: () => {

        return{
            //for initially empty lists
            usersList: [] as UserInfo[],
            //for data not yet loaded
            user: null as UserInfo | null,
        }
    },

    actions: {

        fetchUsersFromDB() {
            axios.get<UsersApiResponse>('https://dummyjson.com/users')

                //.then(response => console.log(response) )

               /* .then(response => {
                    this.usersList = response.data.users
                })*/

                .then(response => {
                    // Map each user to ONLY include the specified fields --> not all user data
                    this.usersList = response.data.users.map(user => ({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age,
                        gender: user.gender,
                        email: user.email,
                        username: user.username,
                        image: user.image,
                    }));
                });
        },

        findUserByProductId(productId: number | undefined) {
            // Assuming there's a way to match users to products by ID
            return this.usersList.find(user => user.id === productId);
        },

        /*findUserByProductId(productId: UnwrapRef<ProductInfo["id"]> ) {
            return this.usersList.find(user => user.id === productId);

        },*/
    }
})

interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    username: string;
    image: string;
}

interface UsersApiResponse {
    users: UserInfo[];
}