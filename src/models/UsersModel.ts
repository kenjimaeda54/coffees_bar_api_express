export class UsersModel {
  _id?: Realm.BSON.ObjectId;
  name: string;
  email: string;
  password: string;
  avatarId?: Realm.BSON.ObjectId;
}
