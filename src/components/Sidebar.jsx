// Sidebar.jsx
// 목적: 애플리케이션의 사이드바 구현
// 기능: 사용자 포인트 표시, 기본 정보 링크, 설문지 관련 메뉴(제작한 설문지, 답변한 설문지), 로그인/로그아웃 기능
// 작성자: 임사랑
// 작성일: 2024.07.24

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

// 사이드바 전체 컨테이너 스타일
const SidebarContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: 300px;
  height: calc(100% - 60px);
  background: #ffffff;
  z-index: 1001;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 사이드바 항목 컨테이너 스타일
const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
`;

// 개별 사이드바 항목 스타일
const SidebarItem = styled.div`
  font-size: 20px;
  font-weight: ${({ fontWeight }) => fontWeight};
  margin-bottom: 20px;
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? "#4C76FE" : "#061522"}; // 기본 색상 및 활성화된 항목 색상 설정
  padding: 10px;
  border-radius: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = ({ isOpen, onClose, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴
  const [points, setPoints] = useState(null); // 사용자 포인트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  const getToken = () => {
    return (
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken")
    );
  };

  useEffect(() => {
    const fetchUserPoints = async () => {
      setLoading(true);

      const token = getToken();

      // 토큰이 없으면 API 호출을 중단하고, 사용자에게 로그인하도록 안내
      if (!token) {
        setLoading(false);
        setError("로그인이 필요합니다.");
        return;
      }

      try {
        const response = await axios.get("/api/v1/users/me/point", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPoints(response.data.data.point);
        setLoading(false);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "Network error"
        );
        setLoading(false);
      }
    };

    fetchUserPoints();
  }, []);

  // 네비게이션 핸들러 (사이드바 항목 클릭 시 페이지 이동)
  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // 사이드바 닫기
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const token = getToken();
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }

    try {
      const response = await axios.patch(
        "/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout response:", response.data);

      // 로그아웃 성공 시 세션 스토리지와 로컬 스토리지에서 토큰 제거
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setIsLoggedIn(false);
      onClose();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  // Axios 인터셉터 설정
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
          // 이미 시도한 요청인지 확인
          if (originalRequest._retry) {
            return Promise.reject(error);
          }
          originalRequest._retry = true;

          try {
            const refreshToken =
              localStorage.getItem("refreshToken") ||
              sessionStorage.getItem("refreshToken");

            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const response = await axios.post("/api/v1/auth/refresh", {
              refreshToken,
            });

            const { accessToken } = response.data.data;

            if (localStorage.getItem("accessToken")) {
              localStorage.setItem("accessToken", accessToken);
            } else {
              sessionStorage.setItem("accessToken", accessToken);
            }

            // 원래 요청을 다시 시도
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (err) {
            console.error("Token refresh failed: ", err);
            // 토큰 갱신 실패 시 로그아웃 처리
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
            navigate("/login");
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarItems>
        <SidebarItem
          fontWeight={500}
          $active={location.pathname === "/mypage"} // 현재 경로가 "/mypage"일 때 활성화
          onClick={() => handleNavigation("/mypage")}
        >
          마이페이지
        </SidebarItem>
        <SidebarItem
          fontWeight={500}
          $active={location.pathname === "/mypage/point"} // 현재 경로가 "/mypage/point"일 때 활성화
          onClick={() => handleNavigation("/mypage/point")}
        >
          {loading
            ? "Loading..."
            : error
            ? `Error: ${error}`
            : `${points} point`}
        </SidebarItem>
        <SidebarItem
          fontWeight={600}
          $active={location.pathname === "/created-surveys"} // 현재 경로가 "/created-surveys"일 때 활성화
          onClick={() => handleNavigation("/created-surveys")}
        >
          내가 제작한 설문지
        </SidebarItem>
        <SidebarItem
          fontWeight={600}
          $active={location.pathname === "/answered-surveys"} // 현재 경로가 "/answered-surveys"일 때 활성화
          onClick={() => handleNavigation("/answered-surveys")}
        >
          내가 답변한 설문지
        </SidebarItem>
      </SidebarItems>
      <SidebarItem
        fontWeight={500}
        $active={false} // 로그아웃은 활성화 색상 유지가 필요하지 않음
        onClick={handleLogout} // 로그아웃 핸들러 호출
      >
        로그아웃
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
