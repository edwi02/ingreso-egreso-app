import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm: FormGroup;
  tipo: string;

  constructor( private fb: FormBuilder ) {
    this.tipo = 'ingreso';
  }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]]
    });
  }

  guardar(): void {

    if ( this.ingresoForm.invalid){ return; }
    console.log( this.ingresoForm.value );
    console.log(this.tipo);
  }

}
