// PlusButton.jsx
// 목적: 페이지에 플러스 버튼을 추가
// 기능: 플러스 아이콘 표시 및 버튼 기능 제공
// 작성자: 임사랑
// 작성일: 2024.07.25

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 플러스 버튼 컨테이너 스타일
const PlusButtonContainer = styled.div`
  position: fixed;
  width: 120px;
  height: 120px;
  right: 40px;
  bottom: 30px;
  background: #011b6c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`;

// 플러스 아이콘 스타일
const PlusIcon = styled.div`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 70px;
  line-height: 70px;
  color: #ffffff;
  text-align: center;
`;

const PlusButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/make");
  };

  return (
    <PlusButtonContainer onClick={handleClick}>
      <PlusIcon>+</PlusIcon>
    </PlusButtonContainer>
  );
};

export default PlusButton;
