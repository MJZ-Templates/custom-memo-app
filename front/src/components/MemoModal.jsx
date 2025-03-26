import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MEMO_COLORS, MEMO_COLOR_MAP } from "../constants/memoColors";

const MemoModal = ({ mode, memoData, onSave, onDelete, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [memoColor, setMemoColor] = useState("WHITE");

  useEffect(() => {
    if (mode === "edit" && memoData) {
      setTitle(memoData.title || "");
      setContent(memoData.content || "");
      setIsFavorite(memoData.isFavorite || false);
      setMemoColor(memoData.color || "WHITE");
    } else {
      setTitle("");
      setContent("");
      setIsFavorite(false);
      setMemoColor("WHITE");
    }
  }, [mode, memoData]);

  const handleSave = () => {
    onSave({ title, content, isFavorite, color: memoColor });
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalTitleRow>
          <ModalTitle>{mode === "edit" ? "Edit Memo" : "Add Memo"}</ModalTitle>
          <FavoriteButton
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label="즐겨찾기"
            title="즐겨찾기"
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

        <ColorPaletteContainer>
          {Object.keys(MEMO_COLORS).map((colorKey) => (
            <ColorCircle
              key={colorKey}
              color={MEMO_COLOR_MAP[colorKey]}
              isSelected={memoColor === colorKey}
              onClick={() => setMemoColor(colorKey)}
              aria-label={`색상: ${colorKey}`}
            />
          ))}
        </ColorPaletteContainer>

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
  padding: 4px;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #cccccc;
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

const ColorPaletteContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ColorCircle = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${(props) =>
    props.isSelected ? "2px solid #000000" : "1px solid #cccccc"};
  background-color: ${(props) => props.color};
  cursor: pointer;
  outline: none;
  padding: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const BaseButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled(BaseButton)`
  background-color: #6c6e7e14;
  color: #525463;
`;

const SaveButton = styled(BaseButton)`
  background-color: #5094fa;
  color: #ffffff;
`;

const DeleteButton = styled(BaseButton)`
  background-color: #f5535e;
  color: #ffffff;
`;
