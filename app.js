require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const User = require("./models/user.model");

const app = express();

require("./config/db.config");

app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/users", (req, res, next) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      res.render("users", { users });
    });
});

app.get("/users/new", (req, res, next) => {
  const body = {
    name: "Ignacio",
    surname: "Romaní",
    email: "ignacioromani2@gmail.com",
    age: 28,
    type: "superAdmin",
  };

  const newUser = new User(body);

  newUser
    .save()
    .then((user) => {
      res.send("OK!");
      console.log("User created!", user);
    })
    .catch((err) => {
      res.send("Check your console!");
      console.log(err);
    });
});

app.get("/users/db/update", (req, res, next) => {
  res.render("db/update");
});

app.get("/users/db/delete/:id", (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((user) => {
      res.send("OK deleted!");
      console.log(user);
    })
    .catch((err) => {
      res.send("Check your console!");
      console.log(err);
    });
});

app.get("/users/db/update/:id", (req, res, next) => {
  const queryParams = req.query;
  const id = req.params.id;

  User.findByIdAndUpdate(id, queryParams)
    .then((user) => {
      res.send("OK updated!");
      console.log(user);
    })
    .catch((err) => {
      res.send("Check your console!");
      console.log(err);
    });
});

app.get("/users/db/all/:name", (req, res, next) => {
  User.find({ name: req.params.name })
    .then((user) => {
      res.send("OK found it!");
      console.log(user);
    })
    .catch((err) => {
      res.send("Check your console!");
      console.log(err);
    });
});

app.get("/users/db/:id", (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      res.send("OK found it!");
      console.log(user);
    })
    .catch((err) => {
      res.send("Check your console!");
      console.log(err);
    });
});

// app.get("/users/:id", (req, res, next) => {
//   const idParam = req.params.id;

//   fetch(`https://jsonplaceholder.typicode.com/users/${idParam}`)
//     .then((response) => response.json())
//     .then((user) => {
//       res.render("detail", { user });
//     });
// });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
