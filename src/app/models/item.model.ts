export interface ItemModel {
  id: string;
  name: string;
  quantity: number;
  total_price: PriceModel;
}

interface PriceModel {
  currency: string;
  amount: number;
}
