import styled from "@emotion/styled";

const MemoContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #2b2d36;
  border: 1px solid #e1e1e8;
  border-radius: 24px;
  padding: 16px;
  cursor: pointer;
  height: 154px;
  box-sizing: border-box;

  &:hover {
    background-color: #cdced629;
  }
`;

const MemoTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  font-weight: 700;
`;

const MemoContent = styled.p`
  flex: 1;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.1px;
`;

const MemoFooter = styled.footer`
  display: flex;
  justify-content: end;
  color: #6c6e7e;
  font-weight: 500;
  font-size: 14px;
`;

export default Memo;

const Memo = ({ memo, userName, onClick }) => {
  return (
    <MemoContainer onClick={onClick}>
      <MemoTitle>{memo.title}</MemoTitle>
      <MemoContent>{memo.content}</MemoContent>
      <MemoFooter>
        {userName}_{memo.id}
      </MemoFooter>
    </MemoContainer>
  );
};
