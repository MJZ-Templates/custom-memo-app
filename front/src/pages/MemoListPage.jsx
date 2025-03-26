import { useState } from "react";
import styled from "@emotion/styled";
import { FaPlus } from "react-icons/fa6";

import userStore from "../store/userStore.jsx";
import modeStore from "../store/modeStore.jsx";
import memoStore from "../store/memoStore.jsx";

import { Button, MemoModal, MemoCard, SearchBar } from "../components";

const MemoListPage = () => {
  const { user } = userStore();
  const { toggle } = modeStore();
  const { addMemo, updateMemo, deleteMemo, memos } = memoStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      addMemo(data);
    } else if (mode === "edit" && selectedMemo) {
      updateMemo(selectedMemo.id, data);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedMemo) {
      deleteMemo(selectedMemo.id);
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
        <Button onClick={toggle}>ModeChange</Button>
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
