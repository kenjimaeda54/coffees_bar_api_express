import { Constants } from "../utils/Constants";

export class Coffee extends Realm.Object<Coffee> {
  static schema = {
    name: Constants.coffeesRealmClass,
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      urlPhoto: "string",
      name: "string",
      description: "string",
      quantityMl: "string[]",
      price: "string",
    },
    primaryKey: "_id",
  };
}
