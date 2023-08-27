# Coffes Bar Api
API Rest markt place, possível visualizar os cafés disponíveis, cadastrar um usuário, criar um carrinho de compra   e visualizar os cafés comprados anteriormente por usuário


## Feature
- Eu usei o Realm Db pra trabalhar com o banco de dados, vantagem e que não preciso de um TypeOrm para fazer as relações com o banco
- Repara que estou usando a versão do squema é bem útil, pois se precisar alterar alguma coisa eu altero a versão e assim   reflete um novo squema
- ObjectId e uma identidade específica do realm para converter string para essa propriedade pode usar exemplo abaixo, Realm.BSON

```typescript


//criio uma instaancia que abre o banco local com os esquemas respecitvos
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

// crio o squema
export class Coffee extends Realm.Object<Coffee> {
  static schema = {
    name: Constants.coffeesRealmClass,
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      urlPhoto: "string",
      name: "string",
      description: "string",
      quantityMl: "string[]",
      price: "string",
    },
    primaryKey: "_id",
  };
}

// usando o squema pra leitura

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

```

##
- Qualquer exceção que pode gerar eu usei um middleware que o asyn erros express, por isso não me preocupo caso no momento de fazer um get ou post tratar esse erro
- 
```typescript
  routes() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/coffees", cooffeRouter);
    this.app.use("/avatars", avatarRouter);
    this.app.use("/users", useRouter);
    this.app.use("/carts", cartRouter);
    //middleware erros, precisa da lib express assync erros
    //tem que esta abaixo de arquivos de rotas
    this.app.use(middlewareError.error);
  }

// class error
class ErrorMiddleware {
  //precisa passar os 4 parametros se nao vai dar erro
  async error(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export default new ErrorMiddleware();


```

##
- Para  pegar  parâmetro na rota pode usar o requeset com a palavra chama query, como exemplo abaixo
- E bom verificar caso o userId venha nulo
- Eu capturo o valor que esta na query  userId

```typescript
  // /carts/orders?userId= id do usuario

 // calsse controller
  returnCart(req: Request, res: Response) {
    const { userId } = req.query;

    database.tryOpenRealm().then((realm) => {
      const userObjectId = new Realm.BSON.ObjectID(userId as string);
      const allCarts = realm.objects(Constants.cartRealmClass);

      const cart = allCarts.filtered("userId == $0", userObjectId);

      return res.status(200).json(cart.toJSON());
    });
  }

// app
this.app.use("/carts", cartRouter);

//routers
router.get("/orders", cartController.returnCart);


```


## Rotas disponiveis
### Avatars
- /avatars ==> Retorna todos os avatares salvos no firebase. Metodo Get
- /avatars/id do avatar ==> Retorna um avatar especifico. Metodo Get

### Coffess
- /coffess ==> Retorna todos os cafés. Metodo Get
- /coffes/id do cafe ==> Retorna um cafe especifico. Metodo Get

### Users
- /users/sigin ==> Cria o usuário precisa do body abaixo,caso for sucesso retorna o usuário se não mensagem de erro. Metodo Post

```json
{
	
	"name": " ",
	"email": "test@gmail.com",
	"avatarId":"64d189c6ac4ab510248b5187",
        "password": "pedro"
}

```
- /users/login ==> Loga o usuário, precisa do body abaixo, retorna mensagem de erro ou dados do usuário. Método Post

```json

{
	"email": "Almeida@gmail.com",
	"password": "Abaate5$"	
}
```
- /users/avatar?userId=id do usuario ==> Atualiza o avatar do usuário, rentona mensagem de erro ou sucesso. Método Post
- /users/name?userId=id do usuario ==> Atualiza o nome do usuário, retorna mensagem de erro ou sucesso. Método Post

### Carts
- /carts/orders?userId= id do usuario ==> Retornara os pedidos do usuário, como preço total, a taxa e o id dele. Método Get
- /carts ==> Cria o carrinho, precisa do body abaixo, retorna mensagem de sucesso ou erro. Método Post

```json

{
	
       "cart": {
         "orders": [
					 {
          "title": "Bebida aleatoria",
          "urlImage": "https://cdn.abrahao.com.br/base/fa7/518/562/espresso.jpg",
          "price": "R$ 8,00",
          "quantity": 3,
	  "coffeeId":"64d0d6c060decb1e43f93dbb"
        },
        {
          "title": "Pingado com cholate",
          "urlImage": "https://cdn.abrahao.com.br/base/f4d/0e2/e7f/pingado.jpg",
          "price": "R$ 6,00",
          "quantity": 1,
	  "coffeeId": "64d0d6c060decb1e43f93dbb"
        }
				],
        "priceCartTotal": "R$14,00",
        "userId": "64d2c46cc5e48e0957f5c196",
        "tax": "R$2,00"
       }
     
	
}


```  

