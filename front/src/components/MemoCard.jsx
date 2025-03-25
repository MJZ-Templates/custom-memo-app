import styled from "@emotion/styled";
import { FaBookmark } from "react-icons/fa";

const MemoCard = ({ memo, userName, onClick, onToggleFavorite }) => {
  return (
    <MemoContainer onClick={onClick}>
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
      <MemoFooter>
        {userName}_{memo.id}
      </MemoFooter>
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
  flex: 1;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.1px;
`;

const MemoFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  color: #6c6e7e;
  font-weight: 500;
  font-size: 14px;
`;
