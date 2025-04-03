import styled from "@emotion/styled";
import KanbanColumn from "./KanbanColumn";

const STATUS_ORDER = ["TODO", "IN_PROGRESS", "DONE"];

const STATUS_LABELS = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const STATUS_COLORS = {
  TODO: "#fff59d",
  IN_PROGRESS: "#90caf9",
  DONE: "#a5d6a7",
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
          backgroundColor="#ffffff"
          titleBackgroundColor={STATUS_COLORS[status]}
        />
      ))}
    </BoardContainer>
  );
};

export default KanbanBoard;

const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  width: 100%;
  overflow-x: auto;
`;
