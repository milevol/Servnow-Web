// HomePage.jsx
// 목적: 메인 페이지 구현
// 기능: 설문 목록 표시, 정렬 기능 제공, 마스코트 이미지 표시
// 작성자: 임사랑
// 작성일: 2024.07.19

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";
import Navbar from "../components/Navbar";
import SurveyCard from "../components/SurveyCard";
import PlusButton from "../components/PlusButton";
import mascotImage from "../assets/mascot.png";

// 메인 페이지 전체 컨테이너 스타일
const HomePageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f2f5ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 67px;
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
function HomePage() {
  const [sortOption, setSortOption] = useState("deadline"); // 현재 선택된 정렬 옵션 상태
  const [data, setData] = useState([]); // 설문 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  const getToken = () => {
    return (
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken")
    );
  };

  // 데이터를 API로부터 가져오는 함수
  const fetchSurveyData = async (sort) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await axios.get(`/api/v1/survey/home?sort=${sort}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 설문 데이터 배열 접근 방식 수정
      setData(response.data.data.survey || []);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Network error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때, 기본적으로 "기간 순"으로 데이터를 가져옴
  useEffect(() => {
    fetchSurveyData("deadline");
  }, []);

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

  // 정렬 옵션이 변경될 때 호출되는 핸들러
  const handleSortChange = (selectedOption) => {
    const option = selectedOption.value;
    setSortOption(option);
    fetchSurveyData(option);
  };

  const options = [
    { value: "deadline", label: "기간 순" },
    { value: "participants", label: "참여자 순" },
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
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <SurveyCardContainer>
            {data.length > 0 ? (
              data.map((item) => (
                <SurveyCard
                  key={item.surveyId}
                  title={item.title}
                  dDay={item.dDay}
                  createdAt={item.createdAt}
                  expiredAt={item.expiredAt}
                  participants={item.participants}
                  completed={item.status}
                />
              ))
            ) : (
              <div>설문이 존재하지 않아요 :(</div>
            )}
          </SurveyCardContainer>
        )}
        <PlusButton />
      </ContentWrapper>
    </HomePageContainer>
  );
}

export default HomePage;
