import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaPlus } from "react-icons/fa6";

// 더미 데이터
import { dummyMemos } from "../mock/dummyMemos";
import { dummyMembers } from "../mock/dummyMembers";

import { Button, MemoModal, MemoCard, SearchBar } from "../components";

const MemoListPage = () => {
  const user = dummyMembers[0];

  const [memos, setMemos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMemos(dummyMemos);
  }, []);

  const openCreateModal = () => {
    setMode("create");
    setSelectedMemo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (memo) => {
    setMode("edit");
    setSelectedMemo(memo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMemo(null);
  };

  const handleSave = (data) => {
    if (mode === "create") {
      const newMemo = {
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setMemos((prev) => [...prev, newMemo]);
    } else if (mode === "edit" && selectedMemo) {
      setMemos((prev) =>
        prev.map((memo) =>
          memo.id === selectedMemo.id ? { ...memo, ...data } : memo
        )
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedMemo) {
      setMemos((prev) => prev.filter((memo) => memo.id !== selectedMemo.id));
      closeModal();
    }
  };

  const filteredMemos = searchQuery.trim()
    ? memos.filter(
        (memo) =>
          memo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          memo.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : memos;

  return (
    <MemoListPageContainer>
      <PageTitle>{user.name}'s Memo!</PageTitle>

      <ButtonContainer>
        <Button>ModeChange</Button>
        <Button onClick={openCreateModal}>
          <FaPlus />
          Add CreateMemo
        </Button>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </ButtonContainer>

      <MemoListContainer>
        {filteredMemos.map((memo) => (
          <MemoCard
            key={memo.id}
            memo={memo}
            userName={user.name}
            onClick={() => openEditModal(memo)}
          />
        ))}
      </MemoListContainer>

      {isModalOpen && (
        <MemoModal
          mode={mode}
          memoData={selectedMemo}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={closeModal}
        />
      )}
    </MemoListPageContainer>
  );
};

export default MemoListPage;

const MemoListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
  gap: 20px;
`;

const PageTitle = styled.h1`
  color: #2b2d36;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 1280px;
  background-color: #cdced629;
  padding: 12px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  gap: 8px;
`;

const MemoListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  width: 100%;
`;
