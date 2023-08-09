import Realm from "realm";
import { Coffee } from "../entities/CoffeEntities";
import { Avatars } from "../entities/AvatarsEntities";
import { Users } from "../entities/UsersEntities";
import { Cart, Orders } from "../entities/Carts";

class Database {
  async tryOpenRealm() {
    const realm = await Realm.open({
      schema: [Coffee, Avatars, Users, Cart, Orders],
    });
    return realm;
  }
}

export default new Database();
