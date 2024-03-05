//this store reads in product info from axios, makes an array of product objects
//also makes string array of all categories
//has a function to dynamically filter products based on category, price and rating order (low to high - vice versa)

import {defineStore} from 'pinia'
import axios from 'axios'
//import {usersStore} from "./users.ts";

export const useProductsStore = defineStore({

    id: 'products',

    state: () => {

        return{
            //for initially empty lists
            productsList: [] as ProductInfo[],
            categoriesList: [] as String[],

            //to use dynamically as different filters are applied
            filteredProducts: [] as ProductInfo[],

            //for data not yet loaded
            user: null as ProductInfo  | null,
        }
    },


    actions: {


        //use axios to fetch the data
         fetchProductsFromDB() {

            axios.get<ProductsApiResponse>('https://dummyjson.com/products')
                //.then(response => console.log(response) )

                .then(response => {
                    this.productsList = response.data.products
                }
                )

                .catch(error => console.error(error));
        },

        // getProductById function
        getProductById(productId: number): ProductInfo | undefined {
            return this.productsList.find(product => product.id === productId);
        },


        fetchAllCategories() {
            axios.get('https://dummyjson.com/products/categories') // Assuming the API returns an array of strings
                /*.then(response => {
                    this.categoriesList = response.data ; // Directly assign the array of strings
                })*/
                .then (response => {
                    this.categoriesList = response.data;
                })
                //.then (response => console.log(response) )

                .catch(error => console.error(error));
        },


        filterProductList( filters: ProductFilterCriteria) {
            console.log("filterProductList action called", filters);

            // Start with all products
            let filtered = [...this.productsList];

            // Filter by category if category filter is provided
            if (filters.category && filters.category !== "All Categories") {
                filtered = filtered.filter(product => product.category === filters.category);
            }

            console.log("filterProductList action called", filters);

            // Filter by price range if priceRange filter is provided
            if (filters.priceRange) {
                const {max} = filters.priceRange;
                filtered = filtered.filter(product => product.price <= max);
            }


            console.log("Discount Rate:", filters.discountRate);
            console.log(filters.ratingOrder);


            //filter by rating order chosen
            if (filters.ratingOrder) {
                // Directly assign the sorted array to this.filteredProducts
                console.log("Before sort:", filtered.map(item => item.rating));
                this.filteredProducts = [...filtered.sort((a, b) => {
                    return filters.ratingOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
                })];
                console.log("After sort:", filtered.map(item => item.rating));
            }


                console.log("Discount Rate:", filters.discountRate);

            // Apply discount filter based on the selectedDiscount value
            if (filters.discountRate && filters.discountRate !== "all") {
                console.log(filters.discountRate);
                 if (filters.discountRate === "none") {
                    // Filter for products with no discount
                    filtered = filtered.filter(product => !product.discountPercentage || product.discountPercentage === 0);
                } else {
                    // For specific discount rates (e.g., 10% or 20%)
                    filtered = filtered.filter(product => product.discountPercentage >= Number(filters.discountRate));
                }
            }

            // Update the filteredProducts state with the filtered list(can selectively apply filters)
            this.filteredProducts = [...filtered];
        },
    },
})

export interface ProductInfo {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface ProductsApiResponse {
    products: ProductInfo[];
}


interface ProductFilterCriteria {
    category?: string;
    priceRange?: { max: number };
    //rating?: { min: number };
    ratingOrder?: string;
    discountRate?: string;
}
