import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialModal, Modal} from "../../../shared/services/modal.service";
import {OrderService} from "../../../shared/services/order.service";
import {Order, OrderPosition} from "../../../shared/interfaces/interfaces";
import {OrdersService} from "../../../shared/services/orders.service";
import {Subscription} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})

export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef

  isOrder: boolean
  modal: Modal
  pending = false;
  ordersSub: Subscription;

  constructor(private router: Router,
              public orderService: OrderService,
              private ordersService: OrdersService,
              private alert: AlertService) { }

  ngOnInit() {
    this.isOrder = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOrder = this.router.url === '/order'
      }
    })
  }

  ngAfterViewInit() {
    this.modal = MaterialModal.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
  }

  openModal() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.pending = true;
    const order: Order = {
      list: this.orderService.list.map(item => {
        delete item._id
        return item
      })
    }

    this.ordersSub = this.ordersService.create(order).subscribe(
      sucessOrder => {
        this.alert.success(`New order was successfully created`);
        this.orderService.clear();
      },
      error => {
        this.alert.danger(error.error.message)
      },
      () => {
        this.modal.close();
        this.pending = false;
      }
    )
  }

  removePosition(orderPosition: OrderPosition) {
    this.orderService.remove(orderPosition);
  }
}
