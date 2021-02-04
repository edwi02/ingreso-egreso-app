import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso): Promise<any> {

    const uid = this.authService.user.uid;

    return this.firestore.doc(`${ uid }/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso }); // Tiene que ser un objeto

  }

  initIngresosEgresosListener( uid: string ): any {
    // Obtener la información de Firestore. Regresa un observable
    this.firestore.collection(`${ uid }/ingresos-egresos/items`).valueChanges()
    .subscribe( algo => {
      console.log(algo);
    });
  }
}
