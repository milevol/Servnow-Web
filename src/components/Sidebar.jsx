// Sidebar.jsx
// 목적: 애플리케이션의 사이드바 구현
// 기능: 사용자 포인트 표시, 기본 정보 링크, 설문지 관련 메뉴(제작한 설문지, 답변한 설문지), 로그인/로그아웃 기능
// 작성자: 임사랑
// 작성일: 2024.07.24

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled.div`
  position: fixed;
  top: 67px; // 네비게이션 바 높이만큼 아래로 위치
  right: 0;
  width: 300px;
  height: calc(100% - 67px); // 네비게이션 바를 제외한 높이
  background: #ffffff;
  z-index: 1001;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  font-size: 20px;
  font-weight: ${({ fontWeight }) => fontWeight};
  margin-bottom: 20px;
  cursor: pointer;
  color: ${({ active }) => (active ? "#4C76FE" : "inherit")};
  padding: 10px;
  border-radius: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  const handleNavigation = (path, item) => {
    setActiveItem(item);
    navigate(path);
    onClose(); // 사이드바 닫기
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarItems>
        <SidebarItem
          fontWeight={500}
          active={activeItem === "mypage"}
          onClick={() => handleNavigation("/mypage", "mypage")}
        >
          마이페이지
        </SidebarItem>
        <SidebarItem fontWeight={500} active={false}>
          1435 point
        </SidebarItem>
        <SidebarItem
          fontWeight={600}
          active={activeItem === "created-surveys"}
          onClick={() =>
            handleNavigation("/created-surveys", "created-surveys")
          }
        >
          내가 제작한 설문지
        </SidebarItem>
        <SidebarItem
          fontWeight={600}
          active={activeItem === "answered-surveys"}
          onClick={() =>
            handleNavigation("/answered-surveys", "answered-surveys")
          }
        >
          내가 답변한 설문지
        </SidebarItem>
      </SidebarItems>
      <SidebarItem
        fontWeight={500}
        active={activeItem === "logout"}
        onClick={() => handleNavigation("/logout", "logout")}
      >
        로그아웃
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
