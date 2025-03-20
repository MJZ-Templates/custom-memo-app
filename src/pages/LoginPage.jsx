import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #d3d3d3;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  background-color: #6c63ff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  ::placeholder {
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 140px;
  padding: 10px;
  border: none;
  background-color: #6c63ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const LoginPage = () => {
  return (
    <Container>
      <Title>로그인</Title>
      <label>이메일</label>
      <Input type="email" placeholder="이메일 입력" />
      <label>비밀번호</label>
      <Input type="password" placeholder="비밀번호 입력" />
      <ButtonContainer>
        <Button>회원가입</Button>
        <Button>로그인</Button>
      </ButtonContainer>
    </Container>
  );
};

export default LoginPage;
