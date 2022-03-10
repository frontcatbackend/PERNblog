const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const genJWT = (id, name, role) => {
  return jwt.sign({ id, name, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { name, password, role } = req.body;
    if (!name || !password) {
      return next("Incoreect password");
    }
    const checkUserIfExist = await User.findOne({
      where: {
        name,
      },
    });

    if (checkUserIfExist) {
      return next("User exists");
    }

    const hashPass = await bcrypt.hash(password, 5);
    const user = await User.create({ name, role, password: hashPass }).then(
      (newUser) => {
        res.json(newUser);
        return newUser;
      }
    );
    const token = genJWT(user.id, user.name, user.role);
    console.log(token);
  }

  async auth(req, res, next) {
    const { name, password } = req.body;
    const userAuth = await User.findOne({
      where: { name },
    });
    if (!userAuth) {
      return next("User doesnt not exist");
    }
    let compPassword = bcrypt.compareSync(password, userAuth.password);
    if (!compPassword) {
      return next("password do not match");
    }
    const token = genJWT(userAuth.id, userAuth.name, userAuth.role);
    return res.json({token})
    
  }

  // async getUser(req, res){
  //     const{id} = req.params
  //     await User.findOne({
  //         where:{id}
  //     }).then(get=>{
  //         res.json(get)
  //     })
  // }
  // async checkUser(req, res, next){
  //     // catchAsync(async()=>{
  //     //     let currentUser

  //     //     if(req.cookies.jwt){
  //     //         const token = req.cookies.jwt
  //     //         const decoded = await promisify(jwt.verify)(token,
  //     //             process.env.SECRET_KEY)
  //     //             currentUser = await User.findOne(decoded.id)

  //     //     } else {
  //     //         currentUser = null
  //     //     }
  //     //     res.status(200).send({currentUser})
  //     // })
  // }
}

module.exports = new UserController();
