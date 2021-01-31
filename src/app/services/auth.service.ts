import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    );
  }
}
