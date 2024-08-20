// HomePage.jsx
// 목적: 메인 페이지 구현
// 기능: 설문 목록 표시, 정렬 기능 제공, 마스코트 이미지 표시
// 작성자: 임사랑
// 작성일: 2024.07.19

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import Navbar from "../components/Navbar";
import SurveyCard from "../components/SurveyCard";
import PlusButton from "../components/PlusButton";
import mascotImage from "../assets/mascot.png";
import mockData from "../data/mockData.json";

// 메인 페이지 전체 컨테이너 스타일
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

// 마스코트 아이콘 스타일
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

// 커스텀 Select 스타일 설정
const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 120,
    height: 37,
    backgroundColor: "#FFF",
    borderRadius: "8px",
    border: "none",
    boxShadow: "0px 1px 5px 0px rgba(95, 108, 126, 0.25)",
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: "15.408px",
    lineHeight: "normal",
    color: "#21293A",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 1px 5px 0px rgba(95, 108, 126, 0.25)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
    borderRadius: "0 0 8px 8px",
    border: "1px solid #4C76FE",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Pretendard",
    fontWeight: 600,
    fontSize: "14px",
    color: state.isSelected ? "#3E77FF" : "#061522",
    backgroundColor: state.isSelected
      ? "rgba(47, 53, 61, 0.1)"
      : state.isFocused
      ? "rgba(47, 53, 61, 0.05)"
      : "#FFFFFF",
    "&:hover": {
      backgroundColor: "rgba(47, 53, 61, 0.05)",
    },
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#21293A",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#21293A",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

// HomePage 컴포넌트
// 메인 페이지에서 설문 카드 리스트를 보여주고 정렬 기능을 제공
function HomePage() {
  const [sortOption, setSortOption] = useState("day"); // 현재 선택된 정렬 옵션 상태
  const [data, setData] = useState([]); // 설문 데이터 상태

  // 데이터를 정렬하는 함수
  // 선택된 옵션에 따라 데이터를 정렬하여 반환
  const sortData = (option, dataToSort) => {
    return [...dataToSort].sort((a, b) => {
      if (option === "day") {
        return a.day - b.day; // 기간 순으로 정렬
      } else if (option === "people") {
        return b.people - a.people; // 참여자 순으로 정렬
      }
      return 0;
    });
  };

  // 컴포넌트가 마운트될 때, 기본적으로 "기간 순"으로 데이터를 정렬
  useEffect(() => {
    const sortedData = sortData("day", mockData);
    setData(sortedData);
  }, []);

  // 정렬 옵션이 변경될 때 호출되는 핸들러
  // 새로운 정렬 옵션에 따라 데이터를 다시 정렬
  const handleSortChange = (selectedOption) => {
    const option = selectedOption.value;
    setSortOption(option);
    const sortedData = sortData(option, mockData);
    setData(sortedData);
  };

  const options = [
    { value: "day", label: "기간 순" },
    { value: "people", label: "참여자 순" },
  ];

  return (
    <HomePageContainer>
      <Navbar />
      <ContentWrapper>
        <MascotIcon />
        <DropdownContainer>
          <Select
            styles={customStyles}
            value={options.find((option) => option.value === sortOption)}
            onChange={handleSortChange}
            options={options}
            isSearchable={false}
          />
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
