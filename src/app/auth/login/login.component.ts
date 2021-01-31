import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) {
    this.cargando = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['edwin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
                            .subscribe( ui => {
                              this.cargando = ui.isLoading;
                              console.log('Cargando subs');
                            });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login(): void {


    if (this.loginForm.invalid) { return; }

    this.store.dispatch( ui.isLoading() );

    // Swal loading
    // Swal.fire({
    //   title: 'Espere por favor',
    //   showConfirmButton: false,
    //   allowOutsideClick: false,
    //   willOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password).then( (usuario) => {
      console.log('Ingreso correcto');
      // console.log(usuario);
      // Swal.close();
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']);
    })
    .catch( err => {
      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });
  }

}
