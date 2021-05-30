import {ItemModel} from './item.model';

export interface OrderModel {
  id: string;
  recipient: RecipientModel;
  created_at: Date;
  items: ItemModel[];
  delivery: DeliveryModel;
  charge_customer: ChargeModel;
  totalPrice: number;
}

interface RecipientModel {
  name: string;
  email: string;
}

interface DeliveryModel {
  courier: string;
  method: string;
}

interface ChargeModel {
  currency: string;
  total_price: number;
}
