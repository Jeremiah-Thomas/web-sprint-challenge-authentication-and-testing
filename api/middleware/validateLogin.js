const db = require("../../data/dbConfig");

module.exports = (req, res, next) => {
  if (req.body.username == null || req.body.password == null) {
    res.status(400).json({ message: "username and password required" });
  } else {
    const matches = db("users").where("usename", req.body.username);
    if (
      matches.length < 1 ||
      req.body.password == null ||
      req.body.username == null
    ) {
      res.status(400).json({ message: "invalid credentials" });
    } else {
      next();
    }
  }
};
