import { Request, Response } from "express";
import database from "../database/open_database";
import { Constants } from "../utils/Constants";

//para tratar erros usei async erros express
//com o middleware que criei mais a lib não preciso me preocupar com erros
class CoffeController {
  returnCoffees(_, res: Response) {
    database.tryOpenRealm().then((realm) => {
      const coffe = realm.objects(Constants.coffeesRealmClass);
      return res.status(200).json(coffe);
    });
  }

  returnSingleCoffees(req: Request, res: Response) {
    const { id } = req.params;
    const objectId = new Realm.BSON.ObjectID(id);
    database.tryOpenRealm().then((realm) => {
      const response = realm.objectForPrimaryKey(
        Constants.coffeesRealmClass,
        objectId
      );
      return res.status(200).json(response.toJSON());
    });
  }
}

export default new CoffeController();
