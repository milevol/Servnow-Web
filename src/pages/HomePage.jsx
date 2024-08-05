//  HomePage.jsx
//  목적: 메인 페이지 구현
//  기능: 설문 목록 표시, 정렬 기능 제공, 마스코트 이미지 표시
//  작성자: 임사랑
//  작성일: 2024.07.19

import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SurveyCard from "../components/SurveyCard";
import PlusButton from "../components/PlusButton";
import mascotImage from "../assets/mascot.png";
import mockData from "../data/mockData.json";

// 메인 컨테이너 스타일
const HomePageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f2f5ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 67px; // Navbar의 높이만큼 상단 패딩
`;

// 컨텐츠 래퍼 스타일
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1235px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

// 마스코트 이미지 스타일
const MascotIcon = styled.div`
  width: 300px;
  height: 350px;
  background: url(${mascotImage}) no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

// 설문 카드 컨테이너 스타일
const SurveyCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 드롭다운 컨테이너 스타일
const DropdownContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-top: 300px;
`;

// 드롭다운 스타일
const Dropdown = styled.select`
  width: 120px;
  height: 37px;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(95, 108, 126, 0.25);
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  color: #061522;
  border: none;
  padding: 0 10px;
  cursor: pointer;
`;

// HomePage 컴포넌트 함수
// 메인 페이지의 렌더링과 상태 관리를 담당
function HomePage() {
  // 정렬 옵션 상태
  const [sortOption, setSortOption] = useState("day");
  // 설문 데이터 상태
  const [data, setData] = useState(mockData);

  // 정렬 옵션 변경 핸들러
  // 선택된 옵션에 따라 데이터를 정렬
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    const sortedData = [...data].sort((a, b) => {
      if (option === "day") {
        return b.day - a.day;
      } else if (option === "title") {
        return a.title.localeCompare(b.title);
      } else if (option === "people") {
        return b.people - a.people;
      }
      return 0;
    });
    setData(sortedData);
  };

  return (
    <HomePageContainer>
      <Navbar />
      <ContentWrapper>
        <MascotIcon />
        <DropdownContainer>
          <Dropdown value={sortOption} onChange={handleSortChange}>
            <option value="day">기간순</option>
            <option value="title">이름순</option>
            <option value="people">참여자수순</option>
          </Dropdown>
        </DropdownContainer>
        <SurveyCardContainer>
          {data.map((item, index) => (
            <SurveyCard key={index} {...item} />
          ))}
        </SurveyCardContainer>
        <PlusButton />
      </ContentWrapper>
    </HomePageContainer>
  );
}

export default HomePage;
