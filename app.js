const express = require("express");
const hbs = require("hbs");
const app = express();

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

app.get("/users/:id", (req, res, next) => {
  const idParam = req.params.id;

  fetch(`https://jsonplaceholder.typicode.com/users/${idParam}`)
    .then((response) => response.json())
    .then((user) => {
      res.render("detail", { user });
    });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
