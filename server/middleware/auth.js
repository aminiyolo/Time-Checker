const { User } = require("../models/users");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // 토큰 값 가져오기
  const token = req.headers?.authorization.slice(7);

  // 토큰 값 확인
  const decoded = jwt.verify(token, process.env.PRIVATE_TOKEN);

  // 토큰 이용하여 사용자 찾기
  const user = User.findOne({ _id: decoded, token });
  req.token = token;
  req.user = user;
  next();
};

module.exports = { auth };
