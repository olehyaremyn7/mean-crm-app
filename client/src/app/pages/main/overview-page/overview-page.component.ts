import { Component, OnInit } from '@angular/core';
import {AnalyticsService} from "../../../shared/services/analytics.service";
import {Observable} from "rxjs";
import {Overview} from "../../../shared/interfaces/interfaces";
import {MatDialog} from '@angular/material/dialog';
import {OverviewModalComponent} from "./overview-modal/overview-modal.component";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})

export class OverviewPageComponent implements OnInit {

  overview$: Observable<Overview>
  yesterday = new Date();

  constructor(private analyticsService: AnalyticsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.overview$ = this.analyticsService.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  openDialog() {
    this.dialog.open(OverviewModalComponent);
  }
}
