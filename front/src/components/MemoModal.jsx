import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  width: 400px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const BaseButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled(BaseButton)`
  background-color: #e0e0e0;
  color: #333;
`;

const SaveButton = styled(BaseButton)`
  background-color: #1976d2;
  color: white;
`;

const DeleteButton = styled(BaseButton)`
  background-color: #f44336;
  color: white;
`;

const MemoModal = ({ mode, memoData, onSave, onDelete, onCancel }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (mode === "edit" && memoData) {
      setContent(memoData.content);
    } else {
      setContent("");
    }
  }, [mode, memoData]);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <Overlay>
      <ModalContainer>
        <Title>{mode === "edit" ? "메모 수정" : "메모 추가"}</Title>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="메모를 입력하세요"
        />
        <ButtonGroup>
          {mode === "edit" && (
            <DeleteButton onClick={onDelete}>삭제</DeleteButton>
          )}
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default MemoModal;
