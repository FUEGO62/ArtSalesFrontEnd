import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const ArtSalesAPI = createApi({
    reducerPath: 'ArtSalesAPI',
    baseQuery,
    endpoints: (build) => ({


        viewGallery: build.query({
            query: () =>( {
                url : `user/viewGallery`,
                method: 'GET',
            })
        }),
        signUp: build.mutation({
            query: (signUpRequest) =>( {
                url : `user/signUp`,
                method: 'POST',
                body: signUpRequest,
            })
        }),
        logIn: build.mutation({
            query: (logInRequest) =>( {
                url : `user/logIn`,
                method: 'POST',
                body: logInRequest,
            })
        }),
        uploadArtwork: build.mutation({
            query: (uploadArtworkRequest) =>( {
                url : `user/uploadArtWork`,
                method: 'POST',
                body: uploadArtworkRequest,
            })
        }),
        viewCategory: build.mutation({
            query: (viewCategoryRequest) =>( {
                url : `user/viewBasedOnCategory`,
                method: 'POST',
                body: viewCategoryRequest,
            })
        }),
        viewUploadedArt: build.query({
            query: () =>( {
                url : `user/viewArtworks`,
                method: 'GET',
            })
        }),
        addToCart:build.mutation({
            query: (addToCartRequest) =>( {
                url : `user/addToCart`,
                method: 'POST',
                body: addToCartRequest,
            })
        }),
        removeFromCart:build.mutation({
            query: (removeFromCartRequest) =>( {
                url : `user/removeFromCart`,
                method: 'POST',
                body: removeFromCartRequest,
            })
        }),
        takeDownArtWork:build.mutation({
            query: (takeDownArtWorkRequest) =>( {
                url : `user/takeDownArtWork`,
                method: 'POST',
                body: takeDownArtWorkRequest,
            })
        }),
        viewCart:build.query({
            query: () =>( {
                url : `user/viewCart`,
                method: 'GET',
            })
        }),

    }),
})

export const {  useTakeDownArtWorkMutation,
                useViewCartQuery,
                useAddToCartMutation,
                useRemoveFromCartMutation,
                useViewUploadedArtQuery,
                useViewCategoryMutation,
                useLogInMutation,
                useSignUpMutation,
                useViewGalleryQuery,
                useUploadArtworkMutation
             } =ArtSalesAPI