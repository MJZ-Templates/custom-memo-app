import userStore from "../store/userStore.jsx";
import Button from "../components/Button.jsx";
import styled from "@emotion/styled";
import modeStore from "../store/modeStore.jsx";
import MemoList from "../components/MemoList.jsx";
import useModal from "../hooks/useModal.jsx";
import MemoForm from "../components/MemoForm.jsx";
import memoStore from "../store/memoStore.jsx";

const MemoListPage = () => {
  const { user } = userStore();
  const { toggle } = modeStore();
  const { addMemo } = memoStore();
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <h1>{user.name}'s Memo!</h1>

      <StyledButtons>
        <Button onClick={toggle}>ModeChange</Button>
        <Button onClick={openModal}>Add CreateMemo</Button>
      </StyledButtons>

      <MemoList />

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <MemoForm onSave={addMemo} onCancel={closeModal} />
            <CloseButton onClick={closeModal}>✖</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 20px;
`;

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
