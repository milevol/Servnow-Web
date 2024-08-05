// SearchPage.jsx
// 목적: 사용자의 검색 결과를 표시하는 페이지 구현
// 기능: URL 파라미터에서 검색어를 추출하여 결과 필터링 및 표시
// 작성자: 임사랑
// 작성일: 2024.07.24

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SurveyCard from "../components/SurveyCard";
import mockData from "../data/mockData.json";

// 검색 페이지 컨테이너 스타일
const SearchPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f2f5ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 87px;
`;

// 컨텐츠 래퍼 스타일
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1235px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 20px;
  box-sizing: border-box;
  position: relative;
`;

// 검색어 태그와 완료된 설문 제외 버튼을 감싸는 컨테이너 스타일
const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// 검색어 태그 컨테이너 스타일
const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

// 검색어 태그 스타일
const KeywordTag = styled.div`
  padding: 10px 15px;
  background: #c6d3ff;
  border-radius: 20px;
  font-size: 16px;
  color: #5d6670;
`;

// 완료된 설문 제외 버튼 스타일
const ExcludeCompletedButton = styled.div`
  width: 74px;
  height: 36px;
  background: ${({ isActive }) => (isActive ? "#4C76FE" : "#FFFFFF")};
  border: 1px solid #4c76fe;
  border-radius: 22.3358px;
  display: flex;
  align-items: center;
  justify-content: ${({ isActive }) => (isActive ? "flex-end" : "flex-start")};
  cursor: pointer;
  position: relative;
  padding: 0 5px;
  transition: background-color 0.3s, justify-content 0.3s;
`;

// 완료된 설문 제외 버튼 아이콘 스타일
const ExcludeCompletedIcon = styled.div`
  width: 29px;
  height: 29px;
  background: ${({ isActive }) => (isActive ? "#FFFFFF" : "#4C76FE")};
  border-radius: 50%;
  box-shadow: 0px 1px 5px rgba(95, 108, 126, 0.25);
  transition: background-color 0.3s;
`;

// 설문 카드 래퍼 스타일
const SurveyCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

function SearchPage() {
  // 검색 결과 상태
  const [searchResults, setSearchResults] = useState([]);
  const [queryKeywords, setQueryKeywords] = useState([]);
  const [excludeCompleted, setExcludeCompleted] = useState(false);
  const location = useLocation();

  // URL 파라미터에서 검색어를 추출하고 결과를 필터링하는 효과
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (query) {
      const keywords = query
        .split("#")
        .filter(Boolean)
        .map((keyword) => keyword.toLowerCase());
      setQueryKeywords(keywords);

      // 검색어와 일치하는 항목 필터링
      let filteredResults = mockData.filter((item) =>
        keywords.some((keyword) => item.title.toLowerCase().includes(keyword))
      );

      if (excludeCompleted) {
        filteredResults = filteredResults.filter((item) => !item.completed);
      }

      setSearchResults(filteredResults);
    }
  }, [location.search, excludeCompleted]);

  return (
    <SearchPageContainer>
      <Navbar />
      <ContentWrapper>
        <FilterContainer>
          <KeywordContainer>
            {queryKeywords.map((keyword, index) => (
              <KeywordTag key={index}>#{keyword}</KeywordTag>
            ))}
          </KeywordContainer>
          <ExcludeCompletedButton
            isActive={excludeCompleted}
            onClick={() => setExcludeCompleted(!excludeCompleted)}
          >
            <ExcludeCompletedIcon isActive={excludeCompleted} />
          </ExcludeCompletedButton>
        </FilterContainer>
        <SurveyCardWrapper>
          {searchResults.map((item, index) => (
            <SurveyCard key={index} {...item} completed={item.completed} />
          ))}
        </SurveyCardWrapper>
      </ContentWrapper>
    </SearchPageContainer>
  );
}

export default SearchPage;
