import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        // canActivate: [ AuthGuard ], // Con este se carga el módulo aún cuando no se encuentra autenticado.
        canLoad: [ AuthGuard ], // Para usar este es requerido implementar canLoad en el auth.guard
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
                                .then( m => m.IngresoEgresoModule )
    },
    { path: '**', redirectTo: '' },

];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}
