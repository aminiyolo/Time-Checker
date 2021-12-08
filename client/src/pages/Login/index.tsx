import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, initialize } from "../../redux/apiCalls";
import { RootState } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const { currentUser, isFetching, error } = useSelector(
    (state: RootState) => state,
  );
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    initialize(dispatch); // 새로고침 시 state error 값 초기화
  }, [dispatch]);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      login(dispatch, { ID, password });
    },
    [ID, dispatch, password],
  );

  const handleClick = useCallback(() => {
    naviagate("/register");
  }, [naviagate]);

  if (currentUser) {
    // 로그인한 유저 로그인 페이지 접근 금지
    return <Navigate to="/home" />;
  }

  if (currentUser === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>아이디</label>
        <input name="ID" value={ID} onChange={(e) => setID(e.target.value)} />
        <label>패스워드</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isFetching} type="submit">
          로그인
        </button>
        {error && (
          <div style={{ color: "red", fontWeight: "700" }}>
            Please check your ID and Password
          </div>
        )}
      </form>
      <div>
        <button onClick={handleClick}>회원가입 하러가기</button>
      </div>
    </div>
  );
};

export default Login;