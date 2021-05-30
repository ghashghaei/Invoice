import {OrderModel} from './order.model';
import {SummeryModel} from './summery.model';

export interface ResultModel {
  orders: OrderModel[];
  summery: SummeryModel;
}
