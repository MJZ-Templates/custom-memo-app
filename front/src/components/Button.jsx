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

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid ${({ borderColor }) => borderColor || "transparent"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  gap: 8px;

  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  z-index: 1;

  background-color: ${({ backgroundColor }) => backgroundColor || "#448efe"};
  color: ${({ color }) => color || "#ffffff"};

  &:hover {
    background-color: ${({ hoverColor, backgroundColor }) =>
      hoverColor || backgroundColor || "#448efe"};
  }
`;

export default Button;
