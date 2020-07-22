import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;

    margin: 30px 0;
    text-align: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & + div {
        margin-left: 10px;
      }

      label {
        color: #acacac;
        font-size: 14px;
        font-weight: bold;
        display: block;
      }

      input {
        height: 32px;
        font-size: 14px;
        color: #666;
        border: 0;
        border-bottom: 1px solid #eee;
        display: block;
      }
    }
  }
`;
