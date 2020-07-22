import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  padding: 0 30px;
`;

export const Content = styled.ul`
  list-style: none;
  display: grid;
  grid-gap: 30px;

  padding: 20px;

  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.rows}, 1fr)`};

  max-width: 1120px;
  width: 100%;
  max-height: 800px;
  height: 100%;
  margin: 0 auto;

  border: 1px solid #000;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 40px;

  > span {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const InfoDays = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > span {
    margin-left: 10px;
    font-size: 14px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    margin-left: 10px;
    border: 0;
    background: #7d40e7;
    color: #fff;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    padding: 0 20px;
  }
`;
