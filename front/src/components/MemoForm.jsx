/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import Button from "./Button.jsx";

const MemoForm = ({ data, onSave, onDelete, onCancel }) => {
  const [title, setTitle] = useState(data?.title || "");
  const [content, setContent] = useState(data?.content || "");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목을 입력!");
      return;
    }

    onSave({
      ...data,
      id: data?.id || Date.now(),
      title,
      content,
      state: "TODO",
      createdAt: data?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    onCancel();
  };

  const handleDelete = () => {
    onDelete(data.id);
    onCancel();
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSave();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    },
    [title, content] // handleSave, onCancel 내부 값 의존
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Container>
      <StyledInput
        type="text"
        placeholder={"Input Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StyledTextarea
        placeholder="Input Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <StyledButtons>
        {onDelete ? (
          <Button onClick={handleDelete}>Delete</Button>
        ) : (
          <Button onClick={onCancel}>Cancel</Button>
        )}
        <Button onClick={handleSave}>Save</Button>
      </StyledButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  padding: 30px;
  margin-top: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  resize: none;
  margin-top: 10px;
`;

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

export default MemoForm;
