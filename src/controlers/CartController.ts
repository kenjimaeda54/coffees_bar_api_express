import { Request, Response } from "express";
import database from "../database/open_database";
import { firebase } from "../firebase/firebase";
import { Constants } from "../utils/Constants";
import { AvatarsModels } from "../models/AvatarsModel";
import { CartModels, OrdersModel } from "../models/CartModel";

class CartController {
  createCart(req: Request, res: Response) {
    const { cart } = req.body;

    //maneira simples de trocar um object em javascript
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
      const allCarts = realm.objects(
        Constants.cartRealmClass
      ) as unknown as CartModels[];
      const findIndex = allCarts.findIndex((it) =>
        it.userId.equals(userObjectId)
      );
      const cart = realm.objects(Constants.cartRealmClass)[findIndex];

      return res.status(200).json(cart.toJSON());
    });
  }
}

export default new CartController();
