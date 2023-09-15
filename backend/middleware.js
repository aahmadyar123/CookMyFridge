const jwt = require("jsonwebtoken");

//env for JWT token secret
const dotenv = require("dotenv");
dotenv.config();

//middleware to authenticate token, used for protected routes
async function authenticateToken(req, res, next) {
  //let token = req.headers.Authorization.split(" ")[1];
  let token = req.headers["token"];
  // if token is null return a response with status 401 and end the request
  if (token == null) res.status(401).send("Unauthorized");
  else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) res.status(403).send("Forbidden");
      else {
        req._id = user.id;
        next();
      }
    });
  }
}

module.exports = {
  authenticateToken,
};
