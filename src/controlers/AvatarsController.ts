import { Request, Response } from "express";
import database from "../database/open_database";
import { firebase } from "../firebase/firebase";
import { Constants } from "../utils/Constants";
import { AvatarsModels } from "../models/AvatarsModel";

class AvatarsControllers {
  async returnAllAvatars(_, res: Response) {
    database.tryOpenRealm().then((realm) => {
      const avatars = realm.objects(Constants.avatarsRealmClass);

      return res.status(200).json(avatars.toJSON());
    });
  }

  async returnSingleAvatar(req: Request, res: Response) {
    const { id } = req.params;
    const objectId = new Realm.BSON.ObjectID(id);
    database.tryOpenRealm().then((realm) => {
      const response = realm.objectForPrimaryKey(
        Constants.avatarsRealmClass,
        objectId
      );
      return res.status(200).json(response.toJSON());
    });
  }
}

export default new AvatarsControllers();
