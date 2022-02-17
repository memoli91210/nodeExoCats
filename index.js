const express = require("express"); //ou import express from "express"
const mongoose = require("mongoose");
const RouteCat = require("./Routes/RouteCat");
const RouteBlog = require("./Routes/RouteBlog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/UserModel");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://mehmet:Azerty123456@cluster0.raum0.mongodb.net/CatDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/cats", RouteCat);
app.use("/blogs", RouteBlog);

app.post("/signup", async (req, res) => {
  try {
    let user = await User.create(req.body);

    res.status(200).json({ message: "User créé" });
  } catch (err) {
    res.status(400).json({ message: "Erreur pendant inscription" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        let token = jwt.sign({ id: user.id }, "secret_key", {
          expiresIn: "3h",
        });
        res.status(200).json({ token, email: user.email });
      } else {
        res.status(400).json({ message: "Invalid mot de pass" });
      }
    } else res.status(400).json({ message: "User n'éxiste pas" });
  } catch (err) {
    res.status(400).json({ message: "Erreur pendant inscription" });
  }
});

// app.get("/secret", (req, res) => {
//   let token = req.headers.authorization.replace("Bearer ", "");
//   jwt.verify(token, "secret_key", function (err, payload) {
//     if (err) {
//       res.status(401).json({ message: "Unauthorized" });
//     } else res.send("On est validé, on a access a cette Route :D");
//   });
// });

const middleware1 = (req, res, next) => {
  console.log("Middleware 1");

  // Executer le middleware suivant
  next();
};

const middleware2 = (req, res) => {
  res.send("Dernier middleware :D");
};

app.get("/une_route", middleware1, middleware2);

const isLoggedIn = (req, res, next) => {
  let token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, "secret_key", function (err, payload) {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else next();
  });
};

app.get("/secret", isLoggedIn, (req, res) => {
  res.send("On est validé, on a access a cette Route :D");
});

app.listen(port, () => console.log(`serveur running on port: ${port}`));
