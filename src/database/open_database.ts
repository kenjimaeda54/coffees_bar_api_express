import Realm from "realm";
import { Coffee } from "../entities/CoffeEntities";
import { Avatars } from "../entities/AvatarsEntities";
import { Users } from "../entities/UsersEntities";
import { Cart, OrdersUser } from "../entities/Carts";

//quando for adiconar uma nova propriedade no schema, troca sua versâo
class Database {
  async tryOpenRealm() {
    const realm = await Realm.open({
      schema: [Coffee, Avatars, Users, Cart, OrdersUser],
      schemaVersion: 2,
    });
    return realm;
  }
}

export default new Database();
