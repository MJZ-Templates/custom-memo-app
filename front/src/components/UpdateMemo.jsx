import { useEffect, useState } from "react";
import memoStore from "../store/memoStore.jsx";
import Button from "./Button.jsx";
import styled from "styled-components";

const UpdateMemo = ({ memo, closeModal }) => {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const { deleteMemo, updateMemo } = memoStore();

  const deleteById = () => {
    deleteMemo(memo.id);
    closeModal();
  };

  const updateById = () => {
    const newMemo = {
      ...memo,
      title: title,
      content: content,
      updatedAt: new Date().toISOString(),
    };

    updateMemo(memo.id, newMemo);
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateById();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return (
    <Container>
      <StyledInput
        type="text"
        placeholder={"Input Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <StyledTextarea
        placeholder="Input Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <StyledButtons>
        <Button onClick={deleteById}>Delete</Button>
        <Button onClick={updateById}>Update</Button>
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

export default UpdateMemo;
