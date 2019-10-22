import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import { Pizza } from 'src/products/models/pizza.model';
import * as fromToppings from './toppings.selectors';


// pizza state
export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzasEntitites = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntitites
);

export const getSelectedPizza = createSelector(
  getPizzasEntitites,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualised =  createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingsEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingsEntities[id]);
    return { ...pizza, toppings };
  }
);

export const getAllPizzas = createSelector(
  getPizzasEntitites,
  (entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

