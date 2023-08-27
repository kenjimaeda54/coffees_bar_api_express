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

export class OrdersUser extends Realm.Object<OrdersUser> {
  static schema = {
    name: Constants.OrdersRealmClass,
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      title: "string",
      price: "string",
      quantity: "int",
      urlImage: "string",
      coffeeId: "string",
    },
    primaryKey: "_id",
  };
}
