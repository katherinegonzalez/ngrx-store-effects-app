import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as toppingsActions from '../actions/toppings.action';
import { ToppingsService } from '../../services/toppings.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ToppingsEffects {
  constructor(private action$: Actions, private toppingsService: ToppingsService){}

  @Effect()
  loadToppings$ = this.action$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().
      pipe(
        map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
