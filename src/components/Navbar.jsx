// Navbar.jsx
// 목적: 상단 네비게이션 바를 구현
// 기능: 사이드바 토글, 검색, 알림, 설정, 프로필 페이지 이동
// 작성자: 임사랑
// 작성일: 2024.07.19

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import navMascotImage from "../assets/navMascot.png";
import Sidebar from "./Sidebar";
import axios from "axios";

// 네비게이션 바 전체 컨테이너 스타일
const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  left: 0;
  top: 0;
  background: ${({ isSpecialRoute }) =>
    isSpecialRoute ? "#3E77FF" : "#ffffff"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-sizing: border-box;
`;

// 마스코트 아이콘 스타일
const SideMascot = styled.div`
  width: 40px;
  height: 40px;
  background: url(${navMascotImage}) no-repeat center center;
  background-size: cover;
  cursor: pointer;
`;

// 네비게이션 바 오른쪽 아이콘 컨테이너 스타일
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// 로그인 버튼 스타일
const LoginButton = styled.button`
  width: 119px;
  height: 41px;
  background: #3e77ff;
  border: 1px solid #3e77ff;
  border-radius: 30px;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState("/roundLogo1.png");
  const navigate = useNavigate();
  const location = useLocation();

  const isSpecialRoute = [
    "/login",
    "/signup",
    "/find-id",
    "/find-pswd",
  ].includes(location.pathname);

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    navigate("/login");
  };

  // 마스코트 클릭 핸들러
  const handleMascotClick = () => {
    if (location.pathname === "/") {
      navigate("/landing");
    } else {
      navigate("/");
    }
  };

  // 프로필 클릭 핸들러 (사이드바 열기/닫기)
  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavbarContainer isSpecialRoute={isSpecialRoute}>
        <SideMascot onClick={handleMascotClick} />
        <IconContainer>
          <LoginButton onClick={handleLoginClick}>
            <AiOutlineUser size={24} /> 로그인
          </LoginButton>
        </IconContainer>
      </NavbarContainer>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
