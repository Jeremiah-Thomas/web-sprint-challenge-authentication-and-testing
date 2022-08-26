const db = require("../../data/dbConfig");

const getUsers = () => {
  return db("users");
};

const add = async (user) => {
  const id = await db("users").insert(user);
  const newUser = await db("users").where("id", id);
  return newUser;
};

module.exports = {
  getUsers,
  add,
};
