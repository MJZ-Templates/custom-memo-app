import styled from "@emotion/styled";
import MemoCard from "./MemoCard";

const MemoList = ({ memos, userName, onMemoClick }) => {
  return (
    <MemoListContainer>
      {memos.map((memo) => (
        <MemoCard
          key={memo.id}
          memo={memo}
          userName={userName}
          onClick={() => onMemoClick(memo)}
        />
      ))}
    </MemoListContainer>
  );
};

export default MemoList;

const MemoListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  width: 100%;
`;
