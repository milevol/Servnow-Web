// SearchPage.jsx
// 목적: 사용자의 검색 결과를 표시하는 페이지 구현
// 기능: URL 파라미터에서 검색어를 추출하여 결과 필터링 및 표시
// 작성자: 임사랑
// 작성일: 2024.07.24

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SlPresent } from "react-icons/sl";
import Navbar from "../components/Navbar";
import SurveyCard from "../components/SurveyCard";
import axios from "axios";

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
  gap: 20px;
`;

// 검색어 태그 스타일
const KeywordTag = styled.div`
  padding: 12px 30px;
  background: #c6d3ff;
  border-radius: 30px;
  font-size: 18px;
  color: #5d6670;
`;

// 완료된 설문 제외 버튼 스타일
const ExcludeCompletedButton = styled.div`
  width: 53px;
  height: 30px;
  background: ${({ $isActive }) => ($isActive ? "#4C76FE" : "#FFFFFF")};
  border: 1px solid #4c76fe;
  border-radius: 22.3358px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isActive }) =>
    $isActive ? "flex-end" : "flex-start"};
  cursor: pointer;
  position: relative;
  padding: 0 5px;
  transition: background-color 0.3s, justify-content 0.3s;
`;

// 완료된 설문 제외 버튼 아이콘 스타일
const ExcludeCompletedIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "#4C76FE")};
  border-radius: 50%;
  box-shadow: 0px 1px 5px rgba(95, 108, 126, 0.25);
  transition: background-color 0.3s;
`;

const ExcludeIcon = styled(SlPresent)`
  color: ${({ $isActive }) => ($isActive ? "#4C76FE" : "#FFFFFF")};
  font-size: 16px;
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
  const [searchResults, setSearchResults] = useState([]);
  const [queryKeywords, setQueryKeywords] = useState([]);
  const [excludeCompleted, setExcludeCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getToken = () => {
    return (
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken")
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    const filter = searchParams.get("filter") || "false";

    if (query) {
      // 해시태그로 구분된 검색어를 배열로 변환
      const keywords = query
        .split("#")
        .filter(Boolean)
        .map((keyword) => keyword.trim());

      setQueryKeywords(keywords);

      const fetchSearchResults = async () => {
        try {
          const token = getToken();

          // keyword 파라미터를 여러 번 추가하기 위해 URLSearchParams 사용
          const params = new URLSearchParams();
          keywords.forEach((keyword) => {
            params.append("keyword", keyword);
          });
          params.append("filter", filter);

          const response = await axios.get(
            `/api/v1/survey?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSearchResults(response.data.data.survey || []);
        } catch (err) {
          console.error("Search failed:", err);
        }
      };

      fetchSearchResults();
    }
  }, [location.search]);

  // 필터 상태 변경 시 URL 업데이트 및 재검색
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("filter", excludeCompleted.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);

    // 필터 상태 변경 시 검색 결과를 다시 가져옴
    const keywords = searchParams.get("q")
      ? searchParams
          .get("q")
          .split("#")
          .filter(Boolean)
          .map((keyword) => keyword.trim())
      : [];

    if (keywords.length > 0) {
      const fetchSearchResults = async () => {
        try {
          const token = getToken();
          const params = new URLSearchParams();
          keywords.forEach((keyword) => {
            params.append("keyword", keyword);
          });
          params.append("filter", excludeCompleted.toString());

          const response = await axios.get(
            `/api/v1/survey?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSearchResults(response.data.data.survey || []);
        } catch (err) {
          console.error("Search failed:", err);
        }
      };

      fetchSearchResults();
    }
  }, [excludeCompleted, navigate, location.pathname]);

  // Axios 인터셉터 설정
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            const refreshToken =
              localStorage.getItem("refreshToken") ||
              sessionStorage.getItem("refreshToken");
            const response = await axios.post("/api/v1/auth/refresh", {
              refreshToken,
            });
            const { accessToken } = response.data.data;
            if (localStorage.getItem("accessToken")) {
              localStorage.setItem("accessToken", accessToken);
            } else {
              sessionStorage.setItem("accessToken", accessToken);
            }
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(error.config);
          } catch (err) {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

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
            $isActive={excludeCompleted}
            onClick={() => setExcludeCompleted(!excludeCompleted)}
          >
            <ExcludeCompletedIcon $isActive={excludeCompleted}>
              <ExcludeIcon $isActive={excludeCompleted} />
            </ExcludeCompletedIcon>
          </ExcludeCompletedButton>
        </FilterContainer>
        <SurveyCardWrapper>
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <SurveyCard key={index} {...item} completed={item.status} />
            ))
          ) : (
            <div>설문이 존재하지 않아요 :(</div>
          )}
        </SurveyCardWrapper>
      </ContentWrapper>
    </SearchPageContainer>
  );
}

export default SearchPage;
