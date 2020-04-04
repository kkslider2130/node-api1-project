const express = require("express");
const cors = require("cors");
const shortid = require("shortid");

const server = express();
let users = [];
server.use(express.json());
server.use(cors());

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});
server.get("/api/users/:id", (req, res) => {
  const user = users.find((a) => a.id === req.params.id);
  user
    ? res.status(200).json(user)
    : res.status(404).send({ msg: "user not found" });
});

server.post("/api/users", (req, res) => {
  const user = { id: shortid.generate(), ...req.body };
  users = [...users, user];

  res.send(users);
});

server.put("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((a) => a.id === req.params.id);
  if (userIndex > -1) {
    const user = { ...users[userIndex], ...req.body };

    users = [...users.slice(0, userIndex), user, ...users.slice(userIndex + 1)];
    res.send(user);
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const deleted = users.find((a) => a.id === req.params.id);
  users = users.filter((a) => a.id !== req.params.id);

  res.send(deleted);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
