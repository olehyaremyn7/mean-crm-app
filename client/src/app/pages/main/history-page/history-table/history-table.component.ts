import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Order} from "../../../../shared/interfaces/interfaces";
import {MaterialModal, Modal} from "../../../../shared/services/modal.service";

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})

export class HistoryTableComponent implements OnDestroy, AfterViewInit {

  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;

  displayedColumns: string[] = ['index', 'date', 'time', 'quantity', 'actions'];
  modal: Modal;
  order: Order;

  price(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  openModal(order: Order) {
    this.order = order;
    this.modal.open();
  }

  ngAfterViewInit() {
    this.modal = MaterialModal.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  close() {
    this.modal.close();
  }
}
