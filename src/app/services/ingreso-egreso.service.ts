import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso): Promise<any> {

    const uid = this.authService.user.uid;

    console.log(ingresoEgreso);

    delete ingresoEgreso.uid;

    return this.firestore.doc(`${ uid }/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso }); // Tiene que ser un objeto

  }

  initIngresosEgresosListener( uid: string ): any {

    // map( snapshot => { snapshot.map( doc => ({
    //  uid: doc.payload.doc.id,
    //  ...doc.payload.doc.data() as any
    //  }));
    // })

    // Obtener la información de Firestore. Regresa un observable
    return this.firestore.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => { // El map transforma lo que sea que yo retorne y lo pasa a la siguiente instrucción
          return snapshot.map( doc => { // Con el snapshot.map se recorre cada elemento de los elementos

            return {
              // uid:
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            };
          });
        })
      );
  }

  borrarIngresoEgreso( uidItem: string ) {
    const uid = this.authService.user.uid;

    this.firestore.doc(`${ uid }/ingresos-egresos/items/${ uidItem }`).delete()
      .then(  () => Swal.fire('Borrado', 'Item borrado', 'success') )
      .catch( err => Swal.fire('Error', err.message, 'error') );
  }
}
