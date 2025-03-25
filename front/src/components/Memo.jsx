import styled from "@emotion/styled";
import useModal from "../hooks/useModal.jsx";
import MemoForm from "./MemoForm.jsx";
import memoStore from "../store/memoStore.jsx";

const Memo = ({ memo, userName }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { deleteMemo } = memoStore();

  return (
    <MemoContainer onClick={openModal}>
      <MemoTitle>{memo.title}</MemoTitle>
      <MemoContent>{memo.content}</MemoContent>
      {/* 나중에 최종 변경 시간 등으로 변경하기 */}
      <MemoFooter>
        {userName}_{memo.id}
      </MemoFooter>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <MemoForm data={memo} onDelete={deleteMemo} onCancel={closeModal} />
            <CloseButton onClick={closeModal}>✖</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </MemoContainer>
  );
};

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

export default Memo;
