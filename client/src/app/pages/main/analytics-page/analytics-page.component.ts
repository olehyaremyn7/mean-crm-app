import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticsService} from "../../../shared/services/analytics.service";
import {Analytics} from "../../../shared/interfaces/interfaces";
import {Chart} from 'chart.js';
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AnalyticsModalComponent} from "./analytics-modal/analytics-modal.component";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})

export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('revenue') revenueRef: ElementRef
  @ViewChild('orders') ordersRef: ElementRef

  average: number;
  pending = true;
  analyticsSubscription: Subscription

  constructor(private analyticsService: AnalyticsService,
              public dialog: MatDialog) { }

  ngAfterViewInit() {
    const revenueConfig: any = {
      label: 'Revenue',
      color: 'rgb(103,58,183)'
    }

    const ordersConfig: any = {
      label: 'Orders',
      color: 'rgb(244,67,54)'
    }

    this.analyticsSubscription = this.analyticsService.getAnalytics().subscribe(
      (data: Analytics) => {
        this.average = data.average;

        revenueConfig.labels = data.chart.map(item => item.label);
        revenueConfig.data = data.chart.map(item => item.revenue);

        ordersConfig.labels = data.chart.map(item => item.label);
        ordersConfig.data = data.chart.map(item => item.orders);

        const revenueContext = this.revenueRef.nativeElement.getContext('2d');
        const ordersContext = this.ordersRef.nativeElement.getContext('2d');

        revenueContext.canvas.height = '400px';
        ordersContext.canvas.height = '400px';

        new Chart(revenueContext, createChartConfig(revenueConfig));
        new Chart(ordersContext, createChartConfig(ordersConfig));

        this.pending = false;
      }
    )
  }

  ngOnDestroy() {
    if (this.analyticsSubscription) {
      this.analyticsSubscription.unsubscribe();
    }
  }

  openDialog() {
    this.dialog.open(AnalyticsModalComponent);
  }
}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
