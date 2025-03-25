import styled from "@emotion/styled";

const Button = ({ onClick, children, backgroundColor, color, ...rest }) => {
  return (
    <StyledButton
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  gap: 8px;

  background-color: ${({ backgroundColor }) => backgroundColor || "#448efe"};
  color: ${({ color }) => color || "#ffffff"};
`;

export default Button;
