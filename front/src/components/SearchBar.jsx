import styled from "@emotion/styled";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <SearchWrapper>
      <FaMagnifyingGlass />
      <SearchInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </SearchWrapper>
  );
};

export default SearchBar;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  padding: 8px 12px;
  border: 1px solid #e1e1e8;
  border-radius: 8px;
  background-color: white;

  svg {
    color: #7c7e89;
    font-size: 14px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 160px;
  background: transparent;
`;
