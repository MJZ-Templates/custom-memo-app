import styled from "@emotion/styled";

const Button = ({
  onClick,
  children,
  backgroundColor,
  color,
  borderColor,
  hoverColor,
  ...rest
}) => {
  return (
    <StyledButton
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      borderColor={borderColor}
      hoverColor={hoverColor}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor || "#448efe"};
  color: ${({ color }) => color || "#ffffff"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${({ hoverColor, backgroundColor }) =>
      hoverColor || backgroundColor || "#448efe"};
  }
`;
