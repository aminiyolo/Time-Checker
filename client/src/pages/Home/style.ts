import styled from "styled-components";
import { mobile } from "../../responsive";

export const Header = styled.header`
  padding: 1.5rem;
  background-color: gold;
  ${mobile({ padding: "20px 12px" })}

  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.4rem;
    font-weight: 800;
    color: #ffffff;
    margin-top: 0.6rem;
    ${mobile({ fontSize: "26px" })}
  }

  & > .buttonContainer {
    display: flex;
    justify-content: right;
    align-items: center;

    & > button {
      padding: 0.6rem;
      border: none;
      border-radius: 5px;
      background-color: lightblue;
      color: white;
      cursor: pointer;
      transition: all 300ms ease-in;
      font-size: 1rem;
      ${mobile({ fontSize: "12px", padding: "5.2px" })}

      &:hover {
        letter-spacing: 0.2rem;
      }
    }
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  padding: 0.5rem;
  .picker {
    border: none;
    border-bottom: max-content solid black;
    font-size: 1.8rem;
    font-weight: 700;
    cursor: pointer;
    background-color: black;
    color: white;
    ${mobile({ fontSize: "22px" })}
  }
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${mobile({ flexDirection: "column", fontSize: "16px" })}

  & > .record {
    margin-bottom: 30px;

    & > h1 {
      ${mobile({ marginLeft: "12px", fontSize: "26px" })}
      & > .min {
        margin-left: 0.25rem;
        font-size: 1rem;
      }
    }
  }

  & > .memo {
    ${mobile({ textAlign: "center" })}
  }
`;

export const Block = styled.div`
  height: 0.3rem;
  width: 100%;
  background-color: black;
`;

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 4rem;
  ${mobile({ textAlign: "center", marginBottom: 0 })}
`;

export const TimeWrapper = styled.div`
  width: 70%;
  margin: auto;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 6rem;
  ${mobile({ fontSize: "15.1px", padding: "0.3px" })}

  & > .container {
    margin-bottom: 1.3rem;
    margin-left: 0.5rem;
    padding: 0.9rem;
    background-color: lightblue;
    border-radius: 0.8rem;
    ${mobile({ padding: "16px", marginLeft: 0, marginBottom: "14px" })}
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const Footer = styled.footer`
  font-size: 32px;
  cursor: pointer;
  padding: 1rem;
  background-color: gold;
  bottom: 0;
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
  position: fixed;
  text-align: center;
  ${mobile({ padding: "2px", marginTop: 0 })}

  & > button {
    cursor: pointer;
    border: none;
    font-size: 2.5rem;
    padding: 0.2rem 0.8rem;
    border-radius: 0.8rem;
    user-select: none;
    transition: all 300ms ease-out;
    ${mobile({ padding: "2px 8px", marginTop: 0 })}

    &:hover {
      font-size: 2.7rem;
    }
  }
`;
