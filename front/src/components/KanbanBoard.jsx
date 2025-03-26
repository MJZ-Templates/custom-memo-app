import styled from "@emotion/styled";
import KanbanColumn from "./KanbanColumn";

const STATUS_ORDER = ["TODO", "IN_PROGRESS", "DONE"];
const STATUS_LABELS = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const KanbanBoard = ({ memos, userName, onMemoClick }) => {
  const groupedMemos = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = memos.filter((memo) => memo.status === status);
    return acc;
  }, {});

  return (
    <BoardContainer>
      {STATUS_ORDER.map((status) => (
        <KanbanColumn
          key={status}
          title={STATUS_LABELS[status]}
          memos={groupedMemos[status] || []}
          userName={userName}
          onMemoClick={onMemoClick}
        />
      ))}
    </BoardContainer>
  );
};

export default KanbanBoard;

const BoardContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 0;
`;
