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
    padding: 5rem;

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

export const Info = styled.div`
  font-size: 1.5rem;
  color: darkgreen;
  font-weight: 700;
`;
