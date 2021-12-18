import styled from "styled-components";

export const Header = styled.header`
  padding: 1.5rem;
  background-color: gold;

  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.4rem;
    font-weight: 800;
    color: white;
    margin-top: 0.6rem;
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
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & > .record {
    margin-bottom: 30px;

    & > h1 > .min {
      margin-left: 0.25rem;
      font-size: 1rem;
    }
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
`;

export const TimeWrapper = styled.div`
  width: 70%;
  margin: auto;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 6rem;

  & > .container {
    margin-bottom: 1.3rem;
    margin-left: 0.5rem;
    padding: 0.9rem;
    background-color: lightblue;
    border-radius: 0.8rem;
    & > .category {
      margin-bottom: 1.5rem;
    }
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
  & > button {
    cursor: pointer;
    border: none;
    font-size: 2.5rem;
    padding: 0.2rem 0.8rem;
    border-radius: 0.8rem;
    user-select: none;
    transition: all 300ms ease-out;
    &:hover {
      font-size: 2.7rem;
    }
  }
`;
