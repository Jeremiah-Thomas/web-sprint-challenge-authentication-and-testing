const db = require("../../data/dbConfig");

module.exports = async (req, res, next) => {
  const matches = await db("users").where("username", req.body.username);
  if (req.body.username == null || req.body.password == null) {
    res.status(400).json({ message: "username and password required" });
  } else if (matches.length > 0) {
    res.status(400).json({ message: "username taken" });
  } else {
    next();
  }
};
