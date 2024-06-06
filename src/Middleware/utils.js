import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY,
    { expiresIn: "30d" }
  );
};

const isAuth = (req, res, next) => {
  const Authorization = req.headers.authorization;
  if (Authorization) {
    const token = Authorization.slice(7, Authorization.length);
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Not token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

export { generateToken, isAuth, isAdmin };
