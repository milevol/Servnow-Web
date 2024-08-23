// CreateMainHeader.jsx
// 목적: 설문지제작페이지 헤더 구현
// 기능: 헤더
// 작성자: 장고은
// 작성일: 2024.08.23

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import navMascotImage from "../assets/navMascot.png";
import SurveyModal from "../components/SurveyModal";

// 네비게이션 바 전체 컨테이너 스타일
const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  left: 0;
  top: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-sizing: border-box;

  ${({ $isSpecialPage }) =>
    $isSpecialPage &&
    css`
      background: #3e77ff;
    `}
`;

// 마스코트 아이콘 스타일
const SideMascot = styled.div`
  width: 40px;
  height: 40px;
  background: url(${navMascotImage}) no-repeat center center;
  background-size: cover;
  cursor: pointer;
`;

// 제작, 응답버튼  div 스타일
const MiddleBtnContainer = styled.div`
  display: flex;
  width: 13%;
  margin-left: 10%;
`;

// 제작, 응답버튼 스타일
const MiddleButton = styled.button`
  width: 100%;
  height: 35px;
  margin: 0 10px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.$isCreate ? "#4c76fe" : "#C5CCD5")};
  color: ${(props) => (props.$isCreate ? "#fff" : "#000")};
  font-weight: bold;
`;

// 등록/배포하기, 미리보기 div 스타일
const LargeBtnContainer = styled.div`
  display: flex;
  width: 14%;
`;

// 등록/배포하기, 미리보기 스타일
const LargeButton = styled.button`
  width: ${(props) => (props.$isDistribute ? "100%" : "80%")};
  height: 35px;
  margin: 0 8px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.$isDistribute ? "#4c76fe" : "#8EA9FF")};
  color: #fff;
`;

const CreateMainHeader = ({ getData }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // 마스코트 클릭 핸들러
  const handleMascotClick = () => {
    navigate("/");
  };

  return (
    <>
      <NavbarContainer>
        <SideMascot onClick={handleMascotClick} />
        <MiddleBtnContainer>
          <MiddleButton $isCreate={true}>제작</MiddleButton>
          <MiddleButton>응답</MiddleButton>
        </MiddleBtnContainer>
        <LargeBtnContainer>
          <LargeButton
            $isDistribute={true}
            onClick={() => {
              console.log("모달이 켜짐");
              setModalOpen(true);
            }}
          >
            등록/배포하기
          </LargeButton>
          <LargeButton>미리보기</LargeButton>
        </LargeBtnContainer>
      </NavbarContainer>
      <SurveyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default CreateMainHeader;
