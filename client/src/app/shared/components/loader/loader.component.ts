import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<mat-spinner></mat-spinner>`,
  styles: [`mat-spinner {
            margin: 300px auto;
            width: 20%;
            height: 20%;
  }`]
})

export class LoaderComponent { }
