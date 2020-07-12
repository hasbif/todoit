const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { checkPassword, hashPassword } = require("../helpers/bcrypts");


class UserController {

  static register(req, res) {
    let { email, password } = req.body;

    User.findOne({ where: { email: email } })
      .then(found => {
        if (found) {
          res.status(400).json({ msg: 'Email is Already Taken' })
        } else {
          return User.create({ email, password })
        }
      })
      .then(user => {
        const access_token = jwt.sign(
          {
            userId: user.id,
            userEmail: user.email
          },
          process.env.SECRET
        );
        res.status(201).json({ access_token, email: user.email });
      })
      .catch((error) => {
        res.status(500).json({ msg: 'Internal Server Error', error })
      })

  }

  static login(req, res) {
    let { email, password } = req.body;
    User.findOne({ where: { email: email } }).then(user => {
      let msg = "Email/Password invalid";
      if (user) {
        if (checkPassword(password, user.password)) {
          const access_token = jwt.sign(
            {
              userId: user.id,
              userEmail: user.email
            },
            process.env.SECRET
          );
          res.status(200).json({ access_token, email: user.email });
        } else {
          res.status(400).json({ msg });
        }
      } else {
        res.status(400).json({ msg });
      }
    });
  }
}

module.exports = UserController;
