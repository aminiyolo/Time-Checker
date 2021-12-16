const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const ID = await User.findOne({ ID: req.body.ID });
    if (ID) {
      // 이미 동일한 아이디가 존재하는 경우
      return res
        .status(200)
        .json({ success: false, msg: "이미 사용중인 아이디입니다." });
    }

    const user = new User({
      name: req.body.name,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY,
      ).toString(),
      ID: req.body.ID,
    });

    await user.save();
    return res.status(200).json({ success: true, msg: "회원가입 되었습니다." });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  // 데이터베이스에서 요청된 아이디를 찾기
  try {
    const user = await User.findOne({ ID: req.body.ID });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "존재하지 않는 아이디 입니다." });
    }

    // 데이터베이스에 찾고자 하는 아이디가 있다면, 비밀번호가 일치하는지 확인
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY,
    );

    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== req.body.password) {
      return res.status(401).json("비밀번호가 일치하지 않습니다.");
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.PRIVATE_TOKEN,
    );

    await User.findOneAndUpdate({ _id: user._id }, { token });

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/post", async (req, res) => {
  const { category, total, Date, id } = req.body;
  try {
    const record = new Record({
      category: {
        [category]: total,
      },
      date: Date,
      id,
    });
    return res.status(200).json(record);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
