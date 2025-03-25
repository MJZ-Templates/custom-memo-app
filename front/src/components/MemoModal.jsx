import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const MemoModal = ({ mode, memoData, onSave, onDelete, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (mode === "edit" && memoData) {
      setTitle(memoData.title || "");
      setContent(memoData.content || "");
      setIsFavorite(memoData.isFavorite || false);
    } else {
      setTitle("");
      setContent("");
      setIsFavorite(false);
    }
  }, [mode, memoData]);

  const handleSave = () => {
    onSave({ title, content, isFavorite });
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalTitleRow>
          <ModalTitle>{mode === "edit" ? "Edit Memo" : "Add Memo"}</ModalTitle>
          <FavoriteButton
            onClick={() => setIsFavorite((prev) => !prev)}
            title="즐겨찾기"
            aria-label="즐겨찾기"
          >
            {isFavorite ? <FaBookmark color="#6C6E7E" /> : <FaRegBookmark />}
          </FavoriteButton>
        </ModalTitleRow>

        <TitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter memo title"
        />
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
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  gap: 16px;
`;

const ModalTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  border: 1px solid #cccccc;
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
  color: #ffffff;
  font-weight: 500;
`;
