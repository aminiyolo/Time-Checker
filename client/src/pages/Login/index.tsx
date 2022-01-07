import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, initialize } from "../../redux/apiCalls";
import { RootState } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { Wrapper, Button } from "./style";
import { Error } from "../../components/Modal/style";

const Login: React.FC = () => {
  const [ID, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const { currentUser, isFetching, error } = useSelector(
    (state: RootState) => state.user,
  );

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

  useEffect(() => {
    initialize(dispatch); // 새로고침 시 state error 값 초기화
  }, [dispatch]);

  if (currentUser) {
    // 로그인한 유저 로그인 페이지 접근 금지
    return <Navigate to="/" />;
  }

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ID">아이디</label>
        <input
          id="ID"
          name="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
          required
          autoComplete="off"
        />
        <label htmlFor="password">패스워드</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
        />
        <button disabled={isFetching} type="submit">
          로그인
        </button>
        {error && <Error>아이디와 비밀번호가 일치하지 않습니다.</Error>}
        <Button>
          <button onClick={handleClick}>회원가입 하러가기</button>
        </Button>
      </form>
    </Wrapper>
  );
};

export default Login;
