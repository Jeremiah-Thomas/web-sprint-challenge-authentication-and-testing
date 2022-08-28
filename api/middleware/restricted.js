const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.headers);
  if (req.headers.authorization == null) {
    res.status(403).json({ message: "token required" });
    return;
  }

  jwt.verify(req.headers.authorization, "jwtpass", (err, decodedToken) => {
    if (err) {
      res.status(403).json({ message: "token invalid" });
      return;
    }

    req.decodedToken = decodedToken;
    next();
  });

  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
