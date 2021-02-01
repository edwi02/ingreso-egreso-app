import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authAcitons from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState> ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe( fuser => {
      // console.log( fuser );
      // console.log( fuser?.uid );
      // console.log( fuser?.email );
      if (fuser) {
        this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe( firestoreUser => {
            console.log(firestoreUser);
          });
        const tempUser = new Usuario('abc', 'borra', 'ed@gami.com');
        this.store.dispatch( authAcitons.setUser( { user: tempUser }) );
      } else {
        console.log('Llamar unSet del user');
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {
              const newUser = new Usuario( user.uid, nombre, user.email );

              return this.firestore.doc(`${user.uid}/usuario`).set( { ...newUser } );
            });
  }

  loginUsuario( email: string, password: string ): Promise<any> {
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    );
  }
}
