import { Constants } from "../utils/Constants";

export class Avatars extends Realm.Object<Avatars> {
  static schema = {
    name: Constants.avatarsRealmClass,
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      urlAvatar: "string",
    },
    primaryKey: "_id",
  };
}
