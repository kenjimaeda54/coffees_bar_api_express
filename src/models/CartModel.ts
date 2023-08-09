export interface CartModels {
  _id?: Realm.BSON.ObjectId;
  orders: OrdersModel[];
  priceCartTotal: string;
  tax: string;
  userId: Realm.BSON.ObjectId;
}

export interface OrdersModel {
  _id?: Realm.BSON.ObjectId;
  title: string;
  price: string;
  quantity: number;
  urlImage: string;
}
