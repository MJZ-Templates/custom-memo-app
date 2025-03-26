import styled from "@emotion/styled";
import MemoCard from "./MemoCard";

const KanbanColumn = ({
  title,
  memos,
  userName,
  onMemoClick,
  backgroundColor,
}) => {
  return (
    <ColumnContainer backgroundColor={backgroundColor}>
      <ColumnTitle>{title}</ColumnTitle>
      <MemoList>
        {memos.map((memo) => (
          <MemoCard
            key={memo.id}
            memo={memo}
            userName={userName}
            onClick={() => onMemoClick(memo)}
          />
        ))}
      </MemoList>
    </ColumnContainer>
  );
};

export default KanbanColumn;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor || "#f4f5f7"};
  border-radius: 12px;
`;

const ColumnTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const MemoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
