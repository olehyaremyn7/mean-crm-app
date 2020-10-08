import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthorizationModalComponent} from "../../../shared/components/authorization-modal/authorization-modal.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/interfaces/interfaces";
import {AuthorizationService} from "../../../shared/services/authorization.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  loginSubscription: Subscription;

  constructor(public dialog: MatDialog,
              private authService: AuthorizationService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['notLogin']) {
        this.alert.danger('No authorization')
      } else if (params['registered']) {
        this.alert.success('Now you can sing in')
      } else if (params['authFailed']) {
        this.alert.warning('Sign in again')
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.form.disable();
    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.loginSubscription = this.authService.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/overview']);
      this.submitted = false;
    }, error => {
      this.alert.danger(error.error.message)
      this.form.enable();
      this.submitted = false;
    })
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  openDialog() {
    this.dialog.open(AuthorizationModalComponent);
  }
}
