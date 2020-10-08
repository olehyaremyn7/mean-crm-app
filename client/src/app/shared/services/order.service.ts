import {Injectable} from "@angular/core";
import {OrderPosition, Position} from "../interfaces/interfaces";

@Injectable()

export class OrderService {

  public list: OrderPosition[] = [];
  public price = 0;

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });

    const maybe = this.list.find(p => p._id === orderPosition._id);

    if (maybe) {
      maybe.quantity += orderPosition.quantity
    } else {
      this.list.push(orderPosition)
    }

    this.totalPrice();
  }

  private totalPrice = () => {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  remove(orderPosition: OrderPosition) {
    const index = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(index, 1);
    this.totalPrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

}
