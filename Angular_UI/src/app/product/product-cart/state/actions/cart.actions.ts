import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product";

export const addProductToCart = createAction(
    '[Product-Cart] Add Product to Cart', props<{ cartProduct: Product }>()
)
export const removeProductFromCart = createAction(
    '[Product-Cart] Remove Product from Cart', props<{ index: number }>()
)
export const increaseProductAmmount = createAction(
    '[Product-Cart] Increase Product ammount in Cart', props<{ cartProduct: Product }>()
)
export const decreaseProductAmmount = createAction(
    '[Product-Cart] Decrease Product ammount in Cart', props<{ cartProduct: Product }>()
)


