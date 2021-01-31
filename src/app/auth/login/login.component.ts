import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

    const { email, password } = this.loginForm.value;

    console.log({ email, password });


    this.authService.loginUsuario( email, password).then( (usuario) => {
      console.log('Ingreso correcto');
      console.log(usuario);
      this.router.navigate(['/']);
    })
    .catch( err => console.error(err) );
  }

}
