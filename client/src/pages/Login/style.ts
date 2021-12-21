import styled from "styled-components";
import { mobile } from "../../responsive";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  ${mobile({ boxSizing: "borderBox" })};
  & > form {
    display: flex;
    flex-direction: column;
    padding: 12rem 10rem;
    ${mobile({ padding: "0" })}

    & > label {
      font-size: 2.5rem;
      margin-bottom: 0.7rem;
      ${mobile({ fontSize: "20px" })}
    }

    & > input {
      padding: 0.7rem;
      font-size: 2.3rem;
      margin-bottom: 2rem;
      ${mobile({ padding: "20px", fontSize: "20px" })}
    }

    & > button {
      margin: 2rem 0;
      padding: 1.5rem;
      font-size: 2rem;
      cursor: pointer;
      ${mobile({ padding: "12px", fontSize: "18px" })}
    }
  }
`;

export const Button = styled.div`
  margin-top: 4rem;
  ${mobile({ textAlign: "center" })}

  & > button {
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 2px solid #1890ff;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 300ms ease-in;
    color: #1890ff;

    &:hover {
      letter-spacing: 0.2rem;
    }
  }
`;
