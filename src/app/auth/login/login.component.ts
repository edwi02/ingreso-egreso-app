import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['edwin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });
  }

  login(): void {


    if (this.loginForm.invalid) { return; }

    // Swal loading
    Swal.fire({
      title: 'Espere por favor',
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password).then( (usuario) => {
      console.log('Ingreso correcto');
      console.log(usuario);
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });
  }

}
