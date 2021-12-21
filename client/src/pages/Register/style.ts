import styled from "styled-components";
import { mobile } from "../../responsive";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  ${mobile({ boxSizing: "borderBox", padding: "4px 0" })}

  & > form {
    display: flex;
    flex-direction: column;
    padding: 5rem;
    ${mobile({ padding: "26px" })}

    & > label {
      font-size: 2.5rem;
      margin-bottom: 0.7rem;
      ${mobile({ fontSize: "16px" })}
    }

    & > input {
      padding: 0.7rem;
      font-size: 2.3rem;
      margin-bottom: 2rem;
      ${mobile({ padding: "20px", fontSize: "16px" })}
    }

    & > button {
      margin-top: 2rem;
      padding: 1.5rem;
      font-size: 2rem;
      cursor: pointer;
      ${mobile({ padding: "12px", fontSize: "18px", marginTop: "8px" })}
    }
  }
`;

export const Info = styled.div`
  font-size: 1.5rem;
  color: darkgreen;
  font-weight: 700;
  ${mobile({ fontSize: "12px" })}
`;
