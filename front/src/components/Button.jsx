import styled from "@emotion/styled";

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 5px 12px;
  background-color: #448efe29;
  color: #1d6ce0;
  border: 1px solid #5094fa;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
`;

export default Button;
