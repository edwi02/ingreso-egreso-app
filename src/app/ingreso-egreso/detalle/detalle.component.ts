import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
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

  constructor( private store: Store<AppStateWithIngreso>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoSubs =  this.ingresoSubs = this.store.select('ingresosEgresos')
        .subscribe( ({ items }) => this.ingresosEgresos = items );
  }

  ngOnDestroy(): void {
    this.ingresoSubs.unsubscribe();
  }

  borrar( uid: string ): void {
    this.ingresoEgresoService.borrarIngresoEgreso( uid );
  }

}
