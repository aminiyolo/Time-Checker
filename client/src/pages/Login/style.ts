import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  & > form {
    display: flex;
    flex-direction: column;
    padding: 12rem 10rem;

    & > label {
      font-size: 2.5rem;
      margin-bottom: 0.7rem;
    }

    & > input {
      padding: 0.7rem;
      font-size: 2.3rem;
      margin-bottom: 2rem;
    }

    & > button {
      margin-top: 2rem;
      padding: 1.5rem;
      font-size: 2rem;
      cursor: pointer;
    }
  }
`;

export const Button = styled.div`
  margin-top: 4rem;
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
