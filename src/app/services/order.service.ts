import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {OrderModel} from '../models/order.model';
import {ParametersModel} from '../models/parameters.model';
import {ResultModel} from '../models/result.model';
import * as moment from 'moment';
import {Observable} from 'rxjs';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getCustomerOrders(params: ParametersModel): Observable<ResultModel> {
    return this.http.get('https://private-anon-a9bf300322-byrd1.apiary-mock.com/orders/' + params.customerId +
      '?start_date=' + params.startDate + '&end_date=' + params.endDate).pipe(
      map(data => this.calculateOrderPrice(data)),
      map(data => this.calculateSummery(data, params)));
  }

  // calculate total price of the order based on the total_price from each item
  calculateOrderPrice(orders): OrderModel[] {
    return orders.map(order => {
      return Object.assign(order, {
        totalPrice: order.items.reduce((a: number, b) => {
          return b.total_price.amount == null ? a : a + Number(b.total_price.amount);
        }, 0),
      });
    });
  }

  calculateSummery(orders, params): ResultModel {
    const totalPrice = orders.reduce((a: number, b) => {
      return b.totalPrice == null ? a : a + Number(b.totalPrice);
    }, 0);
    const totalCharge = orders.reduce((a: number, b) => {
      return b.charge_customer.total_price == null ? a : a + Number(b.charge_customer.total_price);
    }, 0);
    const summery = {
      dateRange: params.startDate.toString() + '  To  ' + params.endDate.toString(),
      daysCount: this.getDaysCount(params),
      ordersCount: orders.length,
      totalPrice,
      totalCharge,
      totalAmount: totalPrice - totalCharge,
    };
    return {orders, summery};
  }

  private getDaysCount(params): number {
    return moment(params.endDate).diff(moment(params.startDate), 'days');
  }

}
