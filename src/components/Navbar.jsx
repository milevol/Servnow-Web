// Navbar.jsx
// 목적: 상단 네비게이션 바를 구현
// 기능: 사이드바 토글, 검색, 알림, 설정, 프로필 페이지 이동
// 작성자: 임사랑
// 작성일: 2024.07.19

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import searchImage from "../assets/search.png";
import alarmImage from "../assets/alarm.png";
import profileImage from "../assets/profileOrigin.png";
import navMascotImage from "../assets/navMascot.png";
import Sidebar from "./Sidebar";

// Navbar 컨테이너 스타일
const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 67px;
  left: 0;
  top: 0;
  background: #ffffff;
  box-shadow: 0px 0.550964px 0.550964px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-sizing: border-box;
`;

// NavMascot 컴포넌트 스타일
const SideMascot = styled.div`
  width: 40px;
  height: 40px;
  background: url(${navMascotImage}) no-repeat center center;
  background-size: cover;
  cursor: pointer;
`;

// 검색 바 스타일
const SearchBarContainer = styled.div`
  width: ${({ isSearchPage }) => (isSearchPage ? "60%" : "305px")};
  height: 41px;
  display: flex;
  align-items: center;
  position: ${({ isSearchPage }) => (isSearchPage ? "absolute" : "relative")};
  left: ${({ isSearchPage }) => (isSearchPage ? "50%" : "auto")};
  transform: ${({ isSearchPage }) =>
    isSearchPage ? "translateX(-50%)" : "none"};
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out,
    transform 0.3s ease-in-out;
`;

const SearchBar = styled.div`
  flex: 1;
  height: 100%;
  background: #f2f5ff;
  border: ${({ isSearchPage }) =>
    isSearchPage ? "1px solid #e6e6e6" : "none"};
  border-radius: 30px 0 0 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const SearchIconContainer = styled.div`
  width: 50px;
  height: 41px;
  background: ${({ isSearchPage }) => (isSearchPage ? "#C6D3FF" : "#f2f5ff")};
  border: ${({ isSearchPage }) =>
    isSearchPage ? "1px solid #e6e6e6" : "none"};
  border-left: none;
  border-radius: 0 30px 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchIcon = styled.div`
  width: 29px;
  height: 29px;
  background: url(${searchImage}) no-repeat center center;
  background-size: contain;
`;

// 검색 입력 스타일
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  outline: none;
  padding: 0 10px;
  border-radius: 30px;
  font-size: 14px;
  font-family: "Pretendard", sans-serif;
`;

// 아이콘 컨테이너 스타일
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// 알림 아이콘 스타일
const AlarmIcon = styled.div`
  width: 21.75px;
  height: 22.584px;
  background: url(${alarmImage}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;

// 프로필 아이콘 스타일
const ProfileIcon = styled.div`
  width: 21.75px;
  height: 22.584px;
  background: url(${profileImage}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;

// Navbar 컴포넌트 함수
// 네비게이션 바의 상태 관리 및 렌더링을 담당
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 제출 핸들러
  // 검색어가 있을 경우 검색 페이지로 이동
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // 각 아이콘 클릭 핸들러 함수
  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavbarContainer>
        <SideMascot onClick={() => navigate("/")} />
        {!isSearchPage && (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <SearchBarContainer isSearchPage={isSearchPage}>
              <SearchBar isSearchPage={isSearchPage}>
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ display: "flex", width: "100%" }}
                >
                  <SearchInput
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </form>
              </SearchBar>
              <SearchIconContainer isSearchPage={isSearchPage}>
                <SearchIcon
                  isSearchPage={isSearchPage}
                  onClick={handleSearchSubmit}
                />
              </SearchIconContainer>
            </SearchBarContainer>
            <IconContainer>
              <AlarmIcon />
              <ProfileIcon onClick={handleProfileClick} />
            </IconContainer>
          </div>
        )}
        {isSearchPage && (
          <>
            <SearchBarContainer isSearchPage={isSearchPage}>
              <SearchBar isSearchPage={isSearchPage}>
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ display: "flex", width: "100%" }}
                >
                  <SearchInput
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </form>
              </SearchBar>
              <SearchIconContainer isSearchPage={isSearchPage}>
                <SearchIcon
                  isSearchPage={isSearchPage}
                  onClick={handleSearchSubmit}
                />
              </SearchIconContainer>
            </SearchBarContainer>
            <IconContainer>
              <AlarmIcon />
              <ProfileIcon onClick={handleProfileClick} />
            </IconContainer>
          </>
        )}
      </NavbarContainer>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
