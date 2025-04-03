import styled from "@emotion/styled";
import MemoCard from "./MemoCard";

const KanbanColumn = ({
  title,
  memos,
  userName,
  onMemoClick,
  backgroundColor,
  titleBackgroundColor,
}) => {
  return (
    <ColumnContainer backgroundColor={backgroundColor}>
      <ColumnTitle titleBackgroundColor={titleBackgroundColor}>
        {title}
      </ColumnTitle>
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
  background-color: ${({ backgroundColor }) => backgroundColor || "#ffffff"};
  border: 1px solid #e1e1e8;
  border-radius: 12px;
  overflow: hidden;
`;

const ColumnTitle = styled.h2`
  margin: 0;
  padding: 10px 16px;
  border-bottom: 1px solid #e1e1e8;
  background-color: ${({ titleBackgroundColor }) =>
    titleBackgroundColor || "#f0f0f0"};
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const MemoList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 12px 20px;
  gap: 12px;
`;
