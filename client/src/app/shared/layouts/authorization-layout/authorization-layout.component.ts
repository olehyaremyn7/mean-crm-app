import {Component} from '@angular/core';

@Component({
  selector: 'app-authorization-layout',
  template: `<nav class="toolbar">
    <app-toolbar></app-toolbar>
  </nav>

  <app-alert></app-alert>

  <div class="container">
    <router-outlet></router-outlet>
  </div>`
})

export class AuthorizationLayoutComponent { }
