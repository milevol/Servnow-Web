// 목적: 포인트 페이지 화면 구현
// 기능: 포인트 페이지
// 2024.08.21/곤/장고은

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  padding-top: 67px; // Navbar의 높이만큼 상단 패딩

  cursor: default;
  .blueColor {
    color: #3e77ff;
  }
`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 80%;

  p {
    width: 100%;
    margin: 30px 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .imgContainer {
    display: flex;
    flex-wrap: wrap;
    background-color: #f2f5ff;
    border-radius: 10px;
  }

  .image-container {
    width: 33.33%;
    padding: 30px;
    box-sizing: border-box;
    text-align: center;
  }

  .image-container img {
    max-width: 50%;
  }
`;

const PageBtnContainer = styled.div`
  display: flex;
  flex-direction: row;

  button {
    width: 100%;
    padding: 10px;
    background-color: white;
    border: solid #ccd2da;
    border-width: 0 0 2px;
    font-size: 25px;
  }
  .mypageBtn {
    color: #ccd2da;
    border-bottom: 2px solid #ccd2da;
    cursor: pointer;
  }

  .pointBtn {
    color: #4c76fe;
    border-bottom: 2px solid #4c76fe;
  }
`;

const getToken = () => {
  return (
    sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")
  );
};

const MyPagePoint = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // 유저 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // API 함수
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = getToken(); // "token" 키로 토큰 가져오기
      const response = await axios.get("/api/v1/users/me/point", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data || []);
    } catch (err) {
      console.error(err.response ? err.message : "Network error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const userPoints = data.point; // 현재 사용자 포인트

  const imageCount = 11;
  const pointsRequired = [
    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  ];

  // 캐릭터 이미지 배열
  const characterImages = [
    "/roundLogo1.png", // 0 포인트 이상
    "/roundLogo2.png", // 500 포인트 이상
    "/roundLogo3.png", // 1000 포인트 이상
    "/roundLogo4.png", // 1500 포인트 이상
    "/roundLogo5.png", // 2000 포인트 이상
    "/roundLogo6.png", // 2500 포인트 이상
    "/roundLogo7.png", // 3000 포인트 이상
    "/roundLogo8.png", // 3500 포인트 이상
    "/roundLogo9.png", // 4000 포인트 이상
    "/roundLogo10.png", // 4500 포인트 이상
    "/roundLogo11.png", // 5000 포인트 이상
  ];

  // 포인트 이미지 불러오기 함수
  const images = Array.from({ length: imageCount }, (_, index) => {
    const src =
      userPoints >= pointsRequired[index]
        ? characterImages[index]
        : "/lock.png";

    return (
      <div key={index} className="image-container">
        <img src={src} alt={`Character ${index + 1}`} />
      </div>
    );
  });

  // 마이페이지로 이동하는 함수
  const goToMyPage = () => {
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <Container>
      <Navbar />
      <PageBtnContainer>
        <button className="mypageBtn" onClick={goToMyPage}>
          마이페이지
        </button>
        <button className="pointBtn">포인트</button>
      </PageBtnContainer>
      <PointContainer>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>
              포인트 <span className="blueColor">{userPoints}p</span>
            </p>
            <div className="imgContainer">{images}</div>
          </div>
        )}
      </PointContainer>
    </Container>
  );
};

export default MyPagePoint;
