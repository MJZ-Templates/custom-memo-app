import styled from "@emotion/styled";

const Button = ({ width = "100px", height = "40px", onClick, children }) => {
  return (
    <StyledButton width={width} height={height} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005fcc;
  }
`;

export default Button;
