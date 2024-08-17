// 목적: 회원가입 화면 속 가입완료 화면 구현
// 기능: 가입완료됨을 표시
// 2024.08.18/곤/장고은

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    cursor: pointer;
  }
`;
const SignUpComplete = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleNextClick = () => {
    navigate("/login"); // 로그인페이지로 이동
  };

  return (
    <Container>
      <img src="src\assets\signupLogo.png"></img>
      <p>서브나우와 함께해 주셔서 감사합니다!</p>
      <button onClick={handleNextClick}>로그인</button>
    </Container>
  );
};

export default SignUpComplete;
