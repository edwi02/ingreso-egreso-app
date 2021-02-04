import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string;
  cargando: boolean;
  loadingSubs: Subscription;

  constructor( private fb: FormBuilder,
               private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService ) {
    this.tipo = 'ingreso';
    this.cargando = false;
  }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]]
    });

    this.loadingSubs = this.store.select('ui')
                          .subscribe( ({isLoading}) => {
                            this.cargando = isLoading;
                          });

  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar(): void {

    this.store.dispatch( uiActions.isLoading() );

    if ( this.ingresoForm.invalid){ return; }

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo );
    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.ingresoForm.reset();
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch( err => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Error', err.message, 'error' )
      });

  }

}
