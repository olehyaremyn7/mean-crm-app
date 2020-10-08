import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from "../../../shared/services/orders.service";
import {Subscription} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";
import {Filter, Order} from "../../../shared/interfaces/interfaces";

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})

export class HistoryPageComponent implements OnInit, OnDestroy {

  isFilter = false;
  offset: number = 0;
  limit = STEP;
  ordersSubscription: Subscription;
  orders: Order[] = [];
  loading = false;
  reloading = false;
  noOrders = false;
  newFilter: Filter = {};

  constructor(private ordersService: OrdersService,
              private alert: AlertService) { }

  private fetch() {

    const params = Object.assign({}, this.newFilter, {
      offset: this.offset,
      limit: this.limit
    })

    this.ordersSubscription = this.ordersService.fetch(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders)
        this.noOrders = orders.length < STEP;
        this.loading = false
        this.reloading = false
      },
      error => this.alert.danger(error.error.message)
    )
  }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  apply(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.newFilter = filter;
    this.reloading = true;
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.newFilter).length !== 0;
  }
}
