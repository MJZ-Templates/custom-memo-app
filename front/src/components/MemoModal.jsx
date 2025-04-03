import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  MEMO_COLORS,
  MEMO_COLOR_MAP,
  getColorKeyFromHex,
} from "../constants/memoColors";
import STTButton from "./STTButton";

const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE"];

const MemoModal = ({ mode, memoData, onSave, onDelete, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [memoColor, setMemoColor] = useState("WHITE");
  const [status, setStatus] = useState("TODO");

  const initialData = {
    title: memoData?.title || "",
    content: memoData?.content || "",
    isFavorite: memoData?.favorite || false,
    color: memoData?.color || "WHITE",
    status: memoData?.status || "TODO",
  };

  useEffect(() => {
    if (mode === "edit" && memoData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setIsFavorite(initialData.isFavorite);
      setMemoColor(initialData.color);
      setStatus(initialData.status);
    } else {
      setTitle("");
      setContent("");
      setIsFavorite(false);
      setMemoColor("WHITE");
      setStatus("TODO");
    }
  }, [mode, memoData]);

  const handleSave = () => {
    onSave({ title, content, favorite: isFavorite, color: memoColor, status });
  };

  const hasUnsavedChanges = () => {
    if (mode === "edit") {
      return (
        title !== initialData.title ||
        content !== initialData.content ||
        isFavorite !== initialData.isFavorite ||
        memoColor !== getColorKeyFromHex(initialData.color) ||
        status !== initialData.status
      );
    }
    return (
      title !== "" ||
      content !== "" ||
      isFavorite !== false ||
      memoColor !== "WHITE" ||
      status !== "TODO"
    );
  };

  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      );
      if (!confirmCancel) return;
    }
    onCancel();
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this memo?"
    );
    if (confirmDelete) {
      onDelete();
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalTitleRow>
          <ModalTitle>{mode === "edit" ? "Edit Memo" : "Add Memo"}</ModalTitle>
          <FavoriteButton
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label="Toggle favorite"
            title="Toggle favorite"
          >
            {isFavorite ? (
              <FaBookmark color="#F5535E" />
            ) : (
              <FaRegBookmark color="#F5535E" />
            )}
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

        <ColorPaletteSTTWrapper>
          <ColorPalette>
            {Object.keys(MEMO_COLORS).map((colorKey) => (
              <ColorCircle
                key={colorKey}
                color={MEMO_COLOR_MAP[colorKey]}
                isSelected={memoColor === colorKey}
                onClick={() => setMemoColor(colorKey)}
                aria-label={`Color: ${colorKey}`}
              />
            ))}
          </ColorPalette>
          <STTButton
            onResult={(text) => setContent((prev) => prev + " " + text)}
          />
        </ColorPaletteSTTWrapper>

        <StatusSelect
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.replace("_", " ")}
            </option>
          ))}
        </StatusSelect>

        <ButtonGroup>
          {mode === "edit" && (
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          )}
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default MemoModal;

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
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
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 4px;
  font-size: 20px;
  cursor: pointer;
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
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;

const ColorPaletteSTTWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ColorPalette = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const ColorCircle = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 50%;
  border: ${(props) =>
    props.isSelected ? "2px solid #000000" : "1px solid #cccccc"};
  background-color: ${(props) => props.color};
  cursor: pointer;
  outline: none;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const StatusSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9f9f9;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const BaseButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
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
