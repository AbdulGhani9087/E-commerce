const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) return res.status(401).send({ errors: "Authenticate first" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: "Invalid Token" });
  }
};

module.exports = fetchUser;
