import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean>{
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap(loadedPizza => {
        if(!loadedPizza){
          this.store.dispatch(new fromStore.LoadPizzas())
        }
      }),
      filter(loadedPizza => loadedPizza),
      take(1)
    );
  }
}
