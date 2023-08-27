# Coffes Bar Api
API Rest marktplace, possivel visualizar os caffes disponiveis,cadastrar um usuario,criar um carrinho de compra de caffes e visualizar os caffes comprados anterioremente por usuario


## Feature
- Eu usei o Realm Db pra trabalhar com o banco de dados, vantagem e que não preciso de um TypeOrm para fazer as relações com o banco
- Repara que estou usando a versão do squema e bem util,pois se precisar alterar alguma coisa  eu altero a versão e assim ja reflete um novo squema
- ObjectId e uma identiddade especifca do realm para converter stirng para essa propriedade pode usar exemplo abaixo, Realm.BSON

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
- Qualquer exceção que pode gerar eu usei um middleware que o asyn erros express, por isso não me preocupo caso no momento de fazer um get ou post retornar um erro

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
- Para pegar a query como parametro pode usar o requeset com o parametro query, como exemplo abaixo
- E bom verificar caso o userId venha nullo
- Eu iriei caputar o valor que esta na query userId

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
- /avatars ==> retorna todos os avatares salvos no firebase. Metodo Get
- /avatars/id do avatar ==> retorna um avatar especifico. Metodo Get

### Coffess
- /coffess ==> retorna todos os cafes. Metodo Get
- /coffes/id do cafe ==> retona um cafe especifico. Metodo Get

### Users
- /users/sigin ==> cria o usuario precisa do body abaixo ,caso for sucesso retorna o usuario se não mensagem de erro. Metodo Post

```json
{
	
	"name": " ",
	"email": "test@gmail.com",
	"avatarId":"64d189c6ac4ab510248b5187",
        "password": "pedro"
}

```
- /users/login ==> loga o usuario , precisa do body abaixo,retorna mensagem de erro ou dados do usuario. Metodo Post

```json

{
	"email": "Almeida@gmail.com",
	"password": "Abaate5$"	
}
```
- /users/avatar?userId=id do usuario ==> atualia o avatar do usuario,retona mensagem de erro ou sucesso. Metodo Post
- /users/name?userId=id do usuario ==> atualia o nome do usuario,retona mensagem de erro ou sucesso. Metodo Post

### Carts
- /carts/orders?userId= id do usuario ==> retonara os pedidos do usuario,como preço total a taxa e o id dele. Metodo Get
- /carts ==> cria o carrinho, precisa do body abaixo, reotrna mensagem de sucesso ou erro. Metodo Post

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

