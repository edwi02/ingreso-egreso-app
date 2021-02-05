import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoSubs: Subscription;

  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoSubs =  this.ingresoSubs = this.store.select('ingresosEgresos')
        .subscribe( ({ items }) => this.ingresosEgresos = items );
  }

  ngOnDestroy(): void {
    this.ingresoSubs.unsubscribe();
  }

  borrar( uid: string ): void {
    console.log('Borrar', uid);
  }

}
