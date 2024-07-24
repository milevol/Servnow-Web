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

  img {
    width: 360px;
    height: auto;
  }

  p {
    margin: 55px;
    font-size: 30px;
    font-weight: bolder;
  }

  button {
    width: 200px;
    height: 50px;
    background-color: #3e77ff;
    color: #fff;
    border: none;
    border-radius: 10px;
  }
`;
const SignUpComplete = () => {
  return (
    <Container>
      <img src="src\assets\signupLogo.png"></img>
      <p>서브나우와 함께해 주셔서 감사합니다!</p>
      <button>로그인</button>
    </Container>
  );
};

export default SignUpComplete;
