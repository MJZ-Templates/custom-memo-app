import styled from "@emotion/styled";
import { FaBookmark } from "react-icons/fa";
import { MEMO_COLOR_MAP } from "../constants/memoColors";

const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return `${koreaTime.getFullYear()}-${(koreaTime.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${koreaTime
    .getDate()
    .toString()
    .padStart(2, "0")} ${koreaTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${koreaTime.getMinutes().toString().padStart(2, "0")}`;
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
          {memo.favorite && (
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
  border-radius: 24px;
  padding: 16px 16px 10px;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: #cdced629;
  }
`;

const MemoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MemoTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemoTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
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

const BookmarkIcon = styled(FaBookmark)`
  color: #f5535e;
  font-size: 16px;
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
  font-size: 14px;
`;
