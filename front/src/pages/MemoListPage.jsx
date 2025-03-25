import userStore from "../store/userStore.jsx";
import Button from "../components/Button.jsx";
import styled from "@emotion/styled";
import modeStore from "../store/modeStore.jsx";
import useModal from "../hooks/useModal.jsx";
import MemoForm from "../components/MemoForm.jsx";
import memoStore from "../store/memoStore.jsx";
import { FaPlus } from "react-icons/fa6";
import Memo from "../components/Memo.jsx";

const MemoListPage = () => {
  const { user } = userStore();
  const { toggle } = modeStore();
  const { addMemo, memos } = memoStore();
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <MemoListPageContainer>
      <PageTitle>{user.name}'s Memo!</PageTitle>

      <ButtonContainer>
        <Button onClick={toggle}>ModeChange</Button>
        <Button onClick={openModal}>
          <FaPlus />
          Add CreateMemo
        </Button>
      </ButtonContainer>

      <MemoListContainer>
        {memos.map((memo) => (
          <Memo key={memo.id} memo={memo} userName={user.name} />
        ))}
      </MemoListContainer>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <MemoForm onSave={addMemo} onCancel={closeModal} />
            <CloseButton onClick={closeModal}>✖</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </MemoListPageContainer>
  );
};

const MemoListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px;
  gap: 20px;
`;

const PageTitle = styled.h1`
  color: #2b2d36;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 1280px;
  background-color: #cdced629;
  padding: 12px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  gap: 8px;
`;

const MemoListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  width: 100%;
`;

// 여기까지

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export default MemoListPage;
