import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth ) { }

  crearUsuario(nombre: string, email: string, password: string): any {
    return this.auth.createUserWithEmailAndPassword( email, password );
  }
}
