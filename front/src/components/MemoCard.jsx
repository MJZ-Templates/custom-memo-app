import styled from "@emotion/styled";
import { FaBookmark } from "react-icons/fa";
import { MEMO_COLOR_MAP } from "../constants/memoColors";

const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

const MemoCard = ({ memo, onClick, onToggleFavorite }) => {
  return (
    <MemoContainer
      style={{ backgroundColor: MEMO_COLOR_MAP[memo.color] || "#f0f0f0" }}
      onClick={onClick}
    >
      <MemoContentWrapper>
        <MemoTitleRow>
          <MemoTitle>{memo.title}</MemoTitle>
          {memo.isFavorite && (
            <FavoriteButton
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(memo.id);
              }}
              aria-label="Toggle favorite"
              title="Toggle favorite"
            >
              <BookmarkIcon />
            </FavoriteButton>
          )}
        </MemoTitleRow>
        <MemoContent>{memo.content}</MemoContent>
      </MemoContentWrapper>
      <MemoFooter>{formatDate(memo.createdAt)}</MemoFooter>
    </MemoContainer>
  );
};

export default MemoCard;

const MemoContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #2b2d36;
  border: 1px solid #e1e1e8;
  border-radius: 24px;
  padding: 16px;
  cursor: pointer;
  height: 154px;
  box-sizing: border-box;

  &:hover {
    background-color: #cdced629;
  }
`;

const MemoContentWrapper = styled.div``;

const MemoTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemoTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  font-weight: 700;
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

const BookmarkIcon = styled(FaBookmark)`
  color: #6c6e7e;
  font-size: 18px;
`;

const MemoContent = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.1px;

  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MemoFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  color: #6c6e7e;
  font-weight: 500;
  font-size: 14px;
`;
