import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const dispatch = useDispatch();
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(dispatch, { ID, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>아이디</label>
        <input name="ID" value={ID} onChange={(e) => setID(e.target.value)} />
        {"  "}
        <label>패스워드</label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Login;
