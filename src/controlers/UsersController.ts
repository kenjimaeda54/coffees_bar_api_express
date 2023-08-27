import { Request, Response } from "express";
import validator from "validator";
import Database from "../database/open_database";
import { Constants } from "../utils/Constants";
import queryString from "query-string";
import { UsersModel } from "../models/UsersModel";

//para tratar erros usei async erros express
//com o middleware que criei mais a lib não preciso me preocupar com erros
class UsersController {
  createUser(req: Request, res: Response) {
    const { email, avatarId, password, name } = req.body;

    Database.tryOpenRealm().then((realm) => {
      const allUsers = realm.objects(Constants.usersRealmClass);
      const haveEmail = allUsers.filtered("email == $0", email).length > 0;

      if (!validator.isEmail(email)) {
        return res.status(403).json({ error: "Must be valid email" });
      }

      if (haveEmail) {
        return res
          .status(403)
          .json({ error: "This email is already  registered" });
      }

      const objectId = new Realm.BSON.ObjectID(avatarId);
      const user: UsersModel = {
        name,
        password,
        avatarId: objectId,
        email,
      };

      realm.write(() => {
        realm.create(Constants.usersRealmClass, user);
      });

      const userRealmDb = allUsers.filtered("email == $0", email);

      res.status(200).json(userRealmDb.toJSON());
    });
  }

  updateAvatar(req: Request, res: Response) {
    const { userId } = req.query;
    const { avatarId } = req.body;

    Database.tryOpenRealm().then((realm) => {
      //por algum motivo so consigo atualizar assim, pegando com metodo primary key não e possivel
      //preciso usar o index do array
      const userObjectId = new Realm.BSON.ObjectID(userId as string);
      const allUsers = realm.objects(
        Constants.usersRealmClass
      ) as unknown as UsersModel[];
      const findIndex = allUsers.findIndex((it) => it._id.equals(userObjectId));
      const user = realm.objects(Constants.usersRealmClass)[
        findIndex
      ] as unknown as UsersModel;

      const avatarObjectId = new Realm.BSON.ObjectID(avatarId as string);

      realm.write(() => {
        user.avatarId = avatarObjectId;
      });
      return res.status(200).json({ sucess: "Sucess" });
    });
  }

  updateName(req: Request, res: Response) {
    const { userId } = req.query;
    const { name } = req.body;

    Database.tryOpenRealm().then((realm) => {
      const userObjectId = new Realm.BSON.ObjectID(userId as string);
      const allUsers = realm.objects(
        Constants.usersRealmClass
      ) as unknown as UsersModel[];
      const findIndex = allUsers.findIndex((it) => it._id.equals(userObjectId));
      const user = realm.objects(Constants.usersRealmClass)[
        findIndex
      ] as unknown as UsersModel;

      realm.write(() => {
        user.name = name;
      });
      return res.status(200).json({ sucess: "Sucess" });
    });
  }

  validateUser(req: Request, res: Response) {
    const { email, password } = req.body;

    Database.tryOpenRealm().then((realm) => {
      const allUsers = realm.objects(Constants.usersRealmClass);
      const user = allUsers.filtered("email == $0", email);

      if (user.length > 0) {
        const isCorrectUser = user
          .toJSON()
          .find((it) => it.password === password);

        if (isCorrectUser) {
          return res.status(200).json(user.toJSON()[0]);
        }
        return res.status(403).json({ error: "Password or Email incorrect" });
      }

      return res.status(403).json({ error: "Password or Email incorrect" });
    });
  }
}

export default new UsersController();
