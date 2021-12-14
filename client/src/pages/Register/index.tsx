import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router";
import { axiosInstance } from "../../config";
import { RootState } from "../../redux/store";
import { Button } from "../Login/style";
import { Wrapper } from "./style";

const Register: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    ID: "",
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

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
          minLength={6}
        />
        <label>name</label>
        <input
          value={userInfo.name}
          onChange={handleChange}
          name="name"
          minLength={2}
        />
        <label>Password</label>
        <input
          value={userInfo.password}
          onChange={handleChange}
          name="password"
          type="password"
          minLength={6}
        />
        <button type="submit">회원가입</button>
        <Button>
          <button onClick={handleClick}>로그인 하러가기</button>
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
