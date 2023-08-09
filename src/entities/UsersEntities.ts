import { Constants } from "../utils/Constants";

export class Users extends Realm.Object<Users> {
  static schema = {
    name: Constants.usersRealmClass,
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      name: "string",
      email: "string",
      password: "string",
      avatarId: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
    },
    primaryKey: "_id",
  };
}
