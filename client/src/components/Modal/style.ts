import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: gainsboro;
  padding: 2rem 7rem;
`;

export const Buttonwrapper = styled.div`
  margin-left: 15rem;
  & > div {
    padding: 1rem;
    display: flex;
    background-color: red;
    justify-content: space-around;
    margin-bottom: 100px;

    & > button {
      margin-right: 0.5rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;
      padding: 0.5rem;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin: 0.5rem;
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 1.4rem;
  font-weight: 700;
`;
