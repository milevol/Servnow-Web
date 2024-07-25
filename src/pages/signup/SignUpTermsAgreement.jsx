// 목적: 회원가입 화면 속 가입완료 화면 구현
// 기능: 가입완료됨을 표시
// 2024.07.25/곤/장고은
// 추가되어야 할 기능: 로그인 버튼 클릭 시 로그인 페이지로 이동

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    width: 200px;
    height: 50px;
    margin: 50px;
    background-color: #3e77ff;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;
const SignUpTermsAgreement = ({ setActiveStep }) => {
  return (
    <Container>
      <p>약관동의~~</p>
      <button onClick={() => setActiveStep(1)}>다음</button>
    </Container>
  );
};

export default SignUpTermsAgreement;
