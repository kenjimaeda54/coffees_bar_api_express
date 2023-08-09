import { Constants } from "../utils/Constants";

export class Cart extends Realm.Object<Cart> {
  static schema = {
    name: Constants.cartRealmClass,
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      orders: "Orders[]",
      priceCartTotal: "string",
      tax: "string",
      userId: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
    },
    primaryKey: "_id",
  };
}

export class Orders extends Realm.Object<Orders> {
  static schema = {
    name: Constants.OrdersRealmClass,
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      title: "string",
      price: "string",
      quantity: "int",
      urlImage: "string",
    },
    primaryKey: "_id",
  };
}
