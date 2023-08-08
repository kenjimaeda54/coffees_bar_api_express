import Realm from "realm";
import { Coffee } from "../entities/CoffeEntities";
import { Avatars } from "../entities/AvatarsEntities";

class Database {
  async tryOpenRealm() {
    const realm = await Realm.open({
      schema: [Coffee, Avatars],
    });
    return realm;
  }
}

export default new Database();
