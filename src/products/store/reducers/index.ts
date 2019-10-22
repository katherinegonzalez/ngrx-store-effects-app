import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';
import { ActionReducerMap, createSelector ,createFeatureSelector } from '@ngrx/store';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState,
  toppings: fromToppings.ToppingState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer
}

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
