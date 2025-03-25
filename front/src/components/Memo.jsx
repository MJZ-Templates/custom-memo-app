import styled from "@emotion/styled";
import useModal from "../hooks/useModal.jsx";
import MemoForm from "./MemoForm.jsx";
import memoStore from "../store/memoStore.jsx";

const Memo = ({ memo, userName }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { deleteMemo } = memoStore();

  return (
    <Container onClick={openModal}>
      <Title>{memo.title}</Title>
      <Content>{memo.content}</Content>
      <BottomSection>
        <div>
          {userName}_{memo.id}
        </div>
      </BottomSection>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <MemoForm data={memo} onDelete={deleteMemo} onCancel={closeModal} />
            <CloseButton onClick={closeModal}>✖</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #007aff;
  border: 1px solid #007aff;
  width: 350px;
  height: 200px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 10px #007aff;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-self: flex-end;
  align-self: flex-end;
  align-items: flex-end;
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

export default Memo;
