import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router";
import { Error } from "../../components/Modal/style";
import { axiosInstance } from "../../config";
import { RootState } from "../../redux/store";
import { Button } from "../Login/style";
import { Wrapper, Info } from "./style";

const Register: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    ID: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [err, setErr] = useState<Boolean>(false);
  const [idInfo, setIdInfo] = useState<Boolean>(false);
  const [passwordInfo, setPasswordInfo] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (confirmPassword !== userInfo.password) return setErr(true);

    try {
      const res = await axiosInstance.post("/users/register", userInfo);
      !res.data.success && alert(res.data.msg);
      if (res.data.success) {
        alert(res.data.msg);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert("서버 측에 오류 발생으로 잠시후에 다시 시도해주세요.");
    }
  };

  const handleClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  if (currentUser) {
    // 로그인한 유저 회원가입 페이지 접근 금지
    return <Navigate to="/home" />;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <label>ID</label>
        <input
          value={userInfo.ID}
          onChange={handleChange}
          name="ID"
          pattern="^[A-Za-z0-9]{4,16}$"
          required
          onFocus={() => setIdInfo(true)}
          onBlur={() => setIdInfo(false)}
        />
        {idInfo && <Info>아이디는 4~16자로 작성해주시기 바랍니다.</Info>}
        <label>name</label>
        <input
          value={userInfo.name}
          onChange={handleChange}
          name="name"
          required
        />
        <label>Password</label>
        <input
          value={userInfo.password}
          onChange={handleChange}
          name="password"
          type="password"
          pattern="^[A-Za-z0-9]{6,16}$"
          onFocus={() => setPasswordInfo(true)}
          onBlur={() => setPasswordInfo(false)}
          required
        />
        {passwordInfo && <Info>암호는 6~16자로 작성해주시기 바랍니다.</Info>}
        <label>Password Check</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          pattern="^[A-Za-z0-9]{6,16}$"
        />
        {err && <Error>비밀번호가 일치하지 않습니다.</Error>}
        <button type="submit">회원가입</button>
        <Button>
          <button onClick={handleClick}>로그인 하러가기</button>
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
