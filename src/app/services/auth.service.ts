import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe( fuser => {
      console.log( fuser );
      console.log( fuser?.uid );
      console.log( fuser?.email );
    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword( email, password );
  }

  loginUsuario( email: string, password: string ): Promise<any> {
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }
}
