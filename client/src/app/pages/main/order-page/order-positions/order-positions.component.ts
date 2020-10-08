import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsService} from "../../../../shared/services/positions.service";
import {Observable} from "rxjs";
import {Position} from "../../../../shared/interfaces/interfaces";
import {map, switchMap} from "rxjs/operators";
import {OrderService} from "../../../../shared/services/order.service";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})

export class OrderPositionsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cost', 'quantity', 'actions'];
  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private orderService: OrderService,
              private alert: AlertService) { }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.fetch(params['id'])
      }),
      map((positions: Position[]) => {
        return positions.map(position => {
          position.quantity = 1
          return position
        })
      })
    )
  }

  addToOrder(position: Position) {
    this.alert.warning(`Added x${position.quantity}`);
    this.orderService.add(position);
  }
}
