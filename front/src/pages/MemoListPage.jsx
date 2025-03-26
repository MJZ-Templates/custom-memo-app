import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaPlus, FaList, FaThLarge } from "react-icons/fa6";

// 더미 데이터
import { dummyMemos } from "../mock/dummyMemos";
import { dummyMembers } from "../mock/dummyMembers";

import {
  Button,
  KanbanBoard,
  MemoList,
  MemoModal,
  SearchBar,
} from "../components";

const MemoListPage = () => {
  const user = dummyMembers[0];

  const [memos, setMemos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");

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

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "kanban" : "list"));
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
        <Button onClick={openCreateModal}>
          <FaPlus />
          Add CreateMemo
        </Button>
        <Button
          onClick={toggleViewMode}
          borderColor="#E1E1E8"
          backgroundColor="#ffffff"
          color="#2B2D36"
        >
          {viewMode === "list" ? <FaThLarge /> : <FaList />}
          {viewMode === "list" ? "Kanban Mode" : "List Mode"}
        </Button>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </ButtonContainer>

      {viewMode === "list" ? (
        <MemoList
          memos={filteredMemos}
          userName={user.name}
          onMemoClick={openEditModal}
        />
      ) : (
        <KanbanBoard
          memos={filteredMemos}
          userName={user.name}
          onMemoClick={openEditModal}
        />
      )}

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
  background-color: #cdced629;
  padding: 12px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  gap: 8px;
`;
