const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const User = require("../models/user");

router.post("/", (req, res) => {
  const gameName = req.body.name;
  const userEmail = req.body.userEmail;
  console.log(req.body)
  let user;
  User.findUserByEmail(userEmail).then((res) => (user = res));

  Game.create(gameName, userEmail)
    .then((res) => {
      console.log(res)
      console.log(user)
      Game.addToUserGame(user.id, res.id);
    })
    .then((game) => {
      res.json({
        game: game,
        message: "added game succesfully",
      });
    });
});

module.exports = router;
