import memoStore from "../store/memoStore.jsx";
import Memo from "./Memo.jsx";
import styled from "@emotion/styled";
import userStore from "../store/userStore.jsx";

const MemoList = () => {
  const { memos } = memoStore();
  const { user } = userStore();

  return (
    <Container>
      {memos.map((memo) => (
        <Memo key={memo.id} memo={memo} userName={user.name} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  overflow-y: auto;
  width: 100%;
`;

export default MemoList;
