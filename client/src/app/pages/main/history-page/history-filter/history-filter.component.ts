import {Component, Output, EventEmitter} from '@angular/core';
import {Filter} from "../../../../shared/interfaces/interfaces";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})

export class HistoryFilterComponent {

  @Output() filter = new EventEmitter<Filter>()

  start: any;
  end: any;
  order: number;

  submit() {
    const filter: Filter = {}

    if (this.order) {
      filter.order = this.order
    }

    if (this.start) {
      filter.start = this.start
    }

    if (this.end) {
      filter.end = this.end
    }

    this.filter.emit(filter)
  }

}
