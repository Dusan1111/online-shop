import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import * as CartActions from '../state/actions/cart.actions'
import { Product } from 'src/app/models/product';

// For retaining lazy loading feature

//ToDo: proveri da li nam je potreban globalni state?!

// export interface State extends AppState.State {
//     products: ProductState
// }

export interface CartState {
    productsInCart: Product[];
}

var initalState: CartState = {
    productsInCart: [],
};

const getCartFeatureState = createFeatureSelector<CartState>('cart');

export const getAllProductsFromCart = createSelector(
    getCartFeatureState,
    state => state.productsInCart
);

export const getProductsInCartCount = createSelector(
    getCartFeatureState,
    state => {
        let totalCount: number = 0;
        state.productsInCart.forEach((product: Product) => {
            totalCount += Number(product.ammount);
        });
        return totalCount
    }
);

export const getTotalCartPrice = createSelector(
    getCartFeatureState,
    state => {
        let totalCartPrice = 0;
        state.productsInCart.forEach((product: any) => {
            if (product.discountedPrice == 0) {
                totalCartPrice += Number(product.price) * Number(product.ammount);
            }
            else {
                totalCartPrice += Number(product.discountedPrice) * Number(product.ammount);
            }
        });
        return totalCartPrice;
    }
);

export const cartReducer = createReducer<CartState>(

    initalState,
    //dodajemo handler na akciju unutar reducer-a
    on(CartActions.addProductToCart, (state, action): CartState => {
        // let totalCartCount = state.totalCount + 1
        return {
            ...state,
            productsInCart: !state.productsInCart.some((p: { name: any }) => p.name === action.cartProduct.name) ? [...state.productsInCart, action.cartProduct] :

                [...state.productsInCart.map(
                    ((product: Product) => ({
                        ...product,
                        ammount: product.name === action.cartProduct.name ? product.ammount + 1 : product.ammount
                      }) as Product)
                )]
        }
    }),
    on(CartActions.removeProductFromCart, (state, action): CartState => {
        return {
            ...state,
            productsInCart: [...state.productsInCart.slice(0, action.index),
            ...state.productsInCart.slice(action.index + 1)]
        }
    }),
    on(CartActions.decreaseProductAmmount, (state, action): any => {
        return {
            ...state,
            productsInCart: [...state.productsInCart.map(
                ((product: Product) => ({
                    ...product,
                    ammount: product.name === action.cartProduct.name ? product.ammount -1 : product.ammount
                  }) as Product)
            )]
        }
    }),
    on(CartActions.increaseProductAmmount, (state, action): any => {
        return {
            ...state,
            productsInCart: [...state.productsInCart.map(
                ((product: Product) => ({
                    ...product,
                    ammount: product.name === action.cartProduct.name ? product.ammount+1 : product.ammount
                  }) as Product)
            )]
        }
    })
);

