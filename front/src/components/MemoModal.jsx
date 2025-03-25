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
  display: flex;
  flex-direction: column;
  width: 400px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  gap: 16px;
`;

const Title = styled.h2`
  margin: 0;
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
  box-sizing: border-box;
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
  background-color: #6c6e7e14;
  color: #525463;
  font-weight: 500;
`;

const SaveButton = styled(BaseButton)`
  background-color: #5094fa;
  color: #ffffff;
  font-weight: 500;
`;

const DeleteButton = styled(BaseButton)`
  background-color: #f5535e;
  color: white;
  font-weight: 500;
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
        <Title>{mode === "edit" ? "Edit Memo" : "Add Memo"}</Title>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your memo here"
        />
        <ButtonGroup>
          {mode === "edit" && (
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          )}
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default MemoModal;
