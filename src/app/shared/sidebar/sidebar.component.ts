import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre;
  userSubs: Subscription;

  constructor( private authService: AuthService,
               private store: Store<AppState>,
               private router: Router ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({ user }) => {
        this.nombre = user.nombre;
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout(): void {
    this.authService.logout().then( logout => {
      this.router.navigate(['/login']);
    });

  }

}
