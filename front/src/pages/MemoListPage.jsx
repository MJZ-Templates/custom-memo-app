import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaPlus, FaRightLeft } from "react-icons/fa6";

import {
  Button,
  KanbanBoard,
  MemoList,
  MemoModal,
  SearchBar,
} from "../components";
import {
  createMemo,
  deleteMemo,
  getMemoById,
  getMemos,
  updateMemo,
} from "../apis/memo";
import { MEMO_COLOR_MAP } from "../constants/memoColors";
import { dummyMembers } from "../mock/dummyMembers";

const getColorKeyFromHex = (hex) => {
  return (
    Object.entries(MEMO_COLOR_MAP).find(([_, value]) => value === hex)?.[0] ||
    "WHITE"
  );
};

const MemoListPage = () => {
  const user = dummyMembers[0];

  const [memos, setMemos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");

  const fetchMemos = async () => {
    try {
      const res = await getMemos();
      const memoList = res.data.map((memo) => ({
        ...memo,
        color: MEMO_COLOR_MAP[memo.color] || "#ffffff",
      }));
      setMemos(memoList);
    } catch (err) {
      alert(
        "Failed to load memos: " + (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const openCreateModal = () => {
    setMode("create");
    setSelectedMemo(null);
    setIsModalOpen(true);
  };

  const openEditModal = async (memo) => {
    setMode("edit");
    try {
      const res = await getMemoById(memo.id);
      const fetchedMemo = res.data;

      setSelectedMemo({
        ...fetchedMemo,
        color: MEMO_COLOR_MAP[fetchedMemo.color] || "#ffffff",
      });
      setIsModalOpen(true);
    } catch (error) {
      alert(
        "Failed to load memo: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMemo(null);
  };

  const handleSave = async (data) => {
    if (mode === "create") {
      try {
        const response = await createMemo(data);
        if (response?.data?.isSuccess) {
          await fetchMemos();
          closeModal();
        }
      } catch (error) {
        alert(
          "Failed to create memo: " +
            (error.response?.data?.message || error.message)
        );
      }
    } else if (mode === "edit" && selectedMemo) {
      try {
        const updatePayload = {
          title: data.title,
          content: data.content,
          color: getColorKeyFromHex(data.color),
          favorite: data.isFavorite,
          status: data.status,
        };

        const response = await updateMemo(selectedMemo.id, updatePayload);
        if (response?.data?.isSuccess) {
          alert("Memo updated successfully!");
          await fetchMemos();
          closeModal();
        }
      } catch (error) {
        alert(
          "Failed to update memo: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedMemo) return;

    try {
      const res = await deleteMemo(selectedMemo.id);
      if (res?.data?.isSuccess) {
        alert("Memo deleted successfully!");
        await fetchMemos();
        closeModal();
      }
    } catch (error) {
      alert(
        "Failed to delete memo: " +
          (error.response?.data?.message || error.message)
      );
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
    <PageContainer>
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
            hoverColor="#E8E8EE"
          >
            <FaRightLeft />
            {viewMode === "list" ? "Kanban Mode" : "List Mode"}
          </Button>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </ButtonContainer>
        <MemoContainer>
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
        </MemoContainer>
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
    </PageContainer>
  );
};

export default MemoListPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 960px;

  gap: 30px;
`;

const MemoListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 30px;
  border-radius: 16px;
  gap: 30px;
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

const MemoContainer = styled.div`
  width: 100%;
`;
