import jwt from "jsonwebtoken";
const authorization = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).json({ msg: "please provide token" });
  } else {
    let decoded = jwt.verify(token, "7amada");
    if (decoded) {
      next();
    } else {
      res.status(401).json({ message: "invalid token" });
    }
  }
};
export default authorization;
