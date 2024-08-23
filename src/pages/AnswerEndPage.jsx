// 목적: 설문완료 화면
// 기능: 설문완료
// 2024.07.25/곤/장고은

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to bottom, #c6d3ff, #fff);

  img {
    width: 464px;
    height: auto;
  }

  p {
    font-weight: bold;
    margin-top: 10px;
  }

  .complete {
    font-size: 47px;
  }

  .thanks {
    margin: 30px 0px 50px 0px;
    text-align: center;
  }

  button {
    border-radius: 10px;
    cursor: pointer;
    border: none;
    width: 200px;
    height: 50px;
    color: white;
    background-color: #3e77ff;
    font-weight: 600;
  }
`;

const AnswerEndPage = () => {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <img src="src\assets\logo1.png"></img>
      <p className="complete">제출 완료 되었습니다!</p>
      <div className="thanks">
        <p>소중한 답변 제출이 완료 되었습니다.</p>
        <p>작성자에게 큰 도움이 될 것입니다, 참여해 주셔서 감사합니다.</p>
      </div>
      <button onClick={handleSendClick}>설문 추가 참여 </button>
    </Container>
  );
};

export default AnswerEndPage;
