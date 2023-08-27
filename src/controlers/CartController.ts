import { Request, Response } from "express";
import database from "../database/open_database";
import { Constants } from "../utils/Constants";

class CartController {
  createCart(req: Request, res: Response) {
    const { cart } = req.body;

    //converter uma string em objectId
    cart.userId = new Realm.BSON.ObjectID(cart.userId);

    database.tryOpenRealm().then((realm) => {
      realm.write(() => {
        realm.create(Constants.cartRealmClass, cart);
      });
    });
    return res.status(200).json({ sucess: "sucess" });
  }

  returnCart(req: Request, res: Response) {
    const { userId } = req.query;

    database.tryOpenRealm().then((realm) => {
      const userObjectId = new Realm.BSON.ObjectID(userId as string);
      const allCarts = realm.objects(Constants.cartRealmClass);

      const cart = allCarts.filtered("userId == $0", userObjectId);

      return res.status(200).json(cart.toJSON());
    });
  }
}

export default new CartController();
