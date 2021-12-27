import styled from "styled-components";
import { mobile } from "../../responsive";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: gainsboro;
  padding: 2rem 7rem;
  border-radius: 3rem;
  ${mobile({
    flexDirection: "column",
    padding: "6px",
    borderRadius: 0,
    width: "100vw",
    height: "55vh",
  })}
`;

export const Buttonwrapper = styled.div`
  margin: auto;
  padding: 2rem;
  font-size: 1.2rem;
  padding-top: 0;
  ${mobile({ padding: 0 })}

  & > div {
    padding: 1rem;
    display: flex;
    background-color: transparent;
    padding-top: 0;

    & > button.clicked {
      border: 2px solid white;
      background-color: gold;
      color: white;
    }

    & > button {
      margin-left: 1rem;
      font-size: 1.2rem;
      padding: 1rem;
      border-radius: 0.8rem;
      outline: none;
      transition: all 300ms ease;
      font-weight: 700;
      background-color: darkgrey;
      color: white;
      cursor: pointer;
      ${mobile({ fontSize: "18px", padding: "12px" })}
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: 600;
  ${mobile({ fontSize: "20px", textAlign: "center", marginTop: "12px" })}

  & > div {
    margin: 0.5rem;

    & > input {
      /* padding: 0.3rem; */
      padding: 0;
      border-radius: 0.5rem;
      font-size: 1.5rem;
      width: 20%;
      ${mobile({
        padding: "2px",
        width: "20%",
        fontSize: "22px",
      })};
    }

    & > .submit {
      border-radius: 0.5rem;
      outline: none;
      padding: 0.7rem;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 250ms ease-in;
      ${mobile({ marginBottom: "16px", fontSize: "18px", marginTop: "12px" })}

      &:hover {
        letter-spacing: 0.2rem;
      }
    }
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 1.4rem;
  font-weight: 700;
  ${mobile({ fontSize: "22px", textAlign: "center", marginBottom: "16px" })}
`;
