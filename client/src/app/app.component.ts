import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "./shared/services/authorization.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit{

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    const token = localStorage.getItem('secret-auth-token');

    if (token !== null) {
      this.authService.setToken(token)
    }
  }
}
