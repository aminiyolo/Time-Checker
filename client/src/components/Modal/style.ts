import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: gainsboro;
  padding: 2rem 7rem;
  border-radius: 3rem;
`;

export const Buttonwrapper = styled.div`
  margin: auto;
  padding: 2rem;
  font-size: 1.2rem;
  padding-top: 0;

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
      font-size: 1.5rem;
      padding: 1rem;
      border-radius: 0.8rem;
      outline: none;
      transition: all 300ms ease;
      font-weight: 700;
      background-color: darkgrey;
      color: white;
      cursor: pointer;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: 600;

  & > div {
    margin: 0.5rem;
    & > input {
      padding: 0.5rem;
      border-radius: 0.5rem;
      font-size: 1.5rem;
    }

    & > .submit {
      border-radius: 0.5rem;
      outline: none;
      padding: 0.7rem;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 250ms ease-in;
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
`;
