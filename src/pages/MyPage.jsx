// 목적: 마이페이지와 포인트 페이지 화면 구현
// 기능: 마이페이지, 포인트 페이지
// 2024.08.11/곤/장고은
// 추가되어야 할 기능: api 연결, 링크 연결
import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100%;
  padding-top: 67px; // Navbar의 높이만큼 상단 패딩

  cursor: default;
  .blueColor {
    color: #3e77ff;
  }
`;

const MyPageContainer = styled.div`
  width: 100%;

  #pro {
    padding-left: 10px;
  }

  #darkblueColor {
    color: #011b6c;
    p {
      margin-top: 10px;
    }
  }
  .greyColor {
    color: #5d6670;
  }

  .weight {
    font-weight: bolder;
  }

  #profile,
  #rating,
  #rate,
  #container1,
  #container2,
  #surveyContainer,
  #pointContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  #profile,
  #rating,
  #surveyContainer,
  #pointContainer {
    height: 180px;
    background-color: #f2f5ff;
    border-radius: 14px;
    margin: 25px 0;
  }

  #profile {
    width: 25%;

    h1 {
      font-size: 30px;
      margin-bottom: 10px;
    }
  }

  #rating {
    width: 50%;
    font-size: 20px;
    hr {
      border: solid 3px black;
      border-radius: 3px;
    }

    #point-rate {
      width: 50%;
      text-align: center;
      font-size: 15px;
    }
  }

  #container2 {
    margin-top: 20px;
  }

  #etc1 {
    width: 15%;
    height: 200px;
    padding: 30px 0px;
    margin-top: -260px;
    font-size: 20px;
    border: solid 1px #e6e6e6;
    border-radius: 14px;
    p {
      margin: 20px 20px;
    }
    hr {
      border: solid 1px #e6e6e6;
    }
    #arrow {
      width: 10px;
      height: 15px;
    }
  }

  #etc2 {
    width: 60%;
    flex-direction: row;
    .weight {
      font-size: 25px;
      button {
        border: none;
        background-color: white;
        font-size: 30px;
        cursor: pointer;
      }
    }
    #arrow {
      height: 20px;
    }
  }

  #surveyContainer {
    text-align: center;
    font-size: 20px;
    span {
      width: 33%;
    }

    .weight {
      font-size: 30px;
      margin: 10px;
      color: #3e77ff;
    }

    #lineCss {
      border: solid #bccfff;
      border-width: 0 1px 0;
    }
  }

  #pointContainer {
    gap: 100px;
  }
`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 80%;

  .imgContainer {
    display: flex;
    flex-wrap: wrap;
    background-color: #f2f5ff;
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

const Paragraph = styled.p`
  width: 100%;
  margin: 30px 0px;
  font-size: 20px;
  font-weight: bold;
`;

const Img = styled.div`
  img {
    width: 120px;
    height: auto;
  }
  /* #proImg {
    width: 130px;
    height: auto;
  } */
`;

const PageBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  border: solid #ccd2da;
  border-width: 0 0 2px;
  font-size: 25px;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#4C76FE" : "#ccd2da")};
  border-color: ${(props) => (props.$active ? "#4C76FE" : "#ccd2da")};
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: #011b6c;
  border-radius: 4px;
  margin-top: 20px;
`;

const ProgressPoint = styled.div`
  position: absolute;
  top: -6px;
  left: ${(props) => props.left}%;
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  border: 2px solid #3e77ff;
  border-radius: 50%;
  transform: translateX(-50%);
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  color: #3e77ff;
  span {
    margin-left: -10px;
  }
`;

const MyPage = () => {
  const [activePage, setActivePage] = useState("mypage");
  const userPoints = 2500; // 현재 사용자 포인트

  const imageCount = 12;
  const pointsRequired = [
    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500,
  ]; // 각 이미지 잠금 해제에 필요한 포인트

  // 캐릭터 이미지 배열
  const characterImages = [
    "src/assets/roundLogo1.png", // 0 포인트 이상
    "src/assets/roundLogo1.png", // 500 포인트 이상
    "src/assets/roundLogo1.png", // 1000 포인트 이상
    "src/assets/roundLogo1.png", // 1500 포인트 이상
    "src/assets/roundLogo1.png", // 2000 포인트 이상
    "src/assets/roundLogo1.png", // 2500 포인트 이상
    "src/assets/roundLogo1.png", // 3000 포인트 이상
    "src/assets/roundLogo1.png", // 3500 포인트 이상
    "src/assets/roundLogo1.png", // 4000 포인트 이상
    "src/assets/roundLogo1.png", // 4500 포인트 이상
    "src/assets/roundLogo1.png", // 5000 포인트 이상
    "src/assets/roundLogo1.png", // 5500 포인트 이상
    // 필요한 경우 추가 이미지 경로를 여기에 추가
  ];

  // 포인트페이지에서 포인트 이미지 불러오기 함수
  const images = Array.from({ length: imageCount }, (_, index) => {
    const src =
      userPoints >= pointsRequired[index]
        ? characterImages[index] // 포인트가 충분할 경우 해당 캐릭터 이미지
        : "src/assets/lock.png"; // 포인트가 부족할 경우 잠금 이미지

    return (
      <div key={index} className="image-container">
        <img src={src} alt={`Character ${index + 1}`} />
      </div>
    );
  });

  //마이페이지에서 포인트 이미지 불러오기 함수
  const getImageSrc = (index) => {
    return userPoints >= pointsRequired[index]
      ? characterImages[index] // 포인트가 충분할 경우 캐릭터 이미지
      : "src/assets/lock.png"; // 포인트가 부족할 경우 잠금 이미지
  };

  const calculateRank = () => {
    if (userPoints <= 1000) {
      return "평민";
    } else if (userPoints <= 2500) {
      return "기사";
    } else if (userPoints <= 4000) {
      return "남작";
    } else if (userPoints <= 5500) {
      return "백작";
    } else {
      return "최고";
    }
  };

  const calculateProgress = () => {
    const thresholds = [1000, 2500, 4000, 5500]; // 각 등급에 도달하기 위한 포인트 경계
    const progressPerLevel = 33.3; // 상태바에서 각 구간의 비율 (100 / 4)

    if (userPoints <= thresholds[0]) {
      return 0; // 평민 구간
    } else if (userPoints <= thresholds[1]) {
      return (
        ((userPoints - thresholds[0]) / (thresholds[1] - thresholds[0])) *
        progressPerLevel
      ); // 기사 구간
    } else if (userPoints <= thresholds[2]) {
      return (
        progressPerLevel +
        ((userPoints - thresholds[1]) / (thresholds[2] - thresholds[1])) *
          progressPerLevel
      ); // 남작 구간
    } else if (userPoints <= thresholds[3]) {
      return (
        2 * progressPerLevel +
        ((userPoints - thresholds[2]) / (thresholds[3] - thresholds[2])) *
          progressPerLevel
      ); // 백작 구간
    } else {
      return 100; // 최고 단계에 도달한 경우 (5500 포인트 이상)
    }
  };

  const nextLevelPoints = () => {
    const thresholds = [1000, 2500, 4000, 5500];
    for (let i = 0; i < thresholds.length; i++) {
      if (userPoints < thresholds[i]) {
        return thresholds[i] - userPoints;
      }
    }
    return 0; // 최고 레벨에 도달한 경우
  };

  const renderContent = () => {
    if (activePage === "mypage") {
      return (
        <MyPageContainer>
          <Navbar />
          <div id="container1">
            <div id="profile">
              <Img>
                <img
                  id="proImg"
                  src="src\assets\roundLogo1.png"
                  alt="Profile"
                />
              </Img>
              <div id="pro">
                <h1>아리 님</h1>
                <p className="greyColor">안녕, 오늘도 좋은 하루 보내세요!</p>
              </div>
            </div>
            <div id="rating">
              <Img>
                <img src="src\assets\roundLogo1.png" alt="Profile" />
              </Img>
              <div id="darkblueColor">
                <p>아리님의 등급</p>
                <p className="weight">{calculateRank()}</p>
              </div>
              <div id="point-rate">
                <span className="blueColor">
                  다음 캐릭터까지&nbsp;
                  <span className="weight">{nextLevelPoints()}p</span>
                  &nbsp;남았어요!
                </span>
                <ProgressBarWrapper>
                  <ProgressPoint left={calculateProgress()} />
                </ProgressBarWrapper>
                <Labels>
                  <span>평민</span>
                  <span>기사</span>
                  <span>남작</span>
                  <span>백작</span>
                </Labels>
              </div>
            </div>
          </div>
          <div id="container2">
            <div id="etc1">
              <div>
                <p className="weight">나의 계정 설정</p>
                <p className="greyColor">내 정보 수정</p>
              </div>
              <hr></hr>
              <div>
                <p className="weight">고객센터</p>
                <p className="greyColor">문의하기</p>
              </div>
            </div>
            <div id="etc2">
              <p className="weight">나의 설문지</p>
              <div id="surveyContainer">
                <span>
                  <p className="weight">10</p>
                  <p>설문 제작 수</p>
                </span>
                <span id="lineCss">
                  <p className="weight">18</p>
                  <p>설문 참여 수</p>
                </span>
                <span>
                  <p className="weight">{userPoints}p</p>
                  <p>포인트</p>
                </span>
              </div>
              <p className="weight">
                포인트 <span className="blueColor">{userPoints}p</span>
                &nbsp;&nbsp;
                <button
                  $active={activePage === "point"}
                  onClick={() => setActivePage("point")}
                >
                  <img src="src\assets\arrow.png" id="arrow"></img>
                </button>
              </p>
              <div id="pointContainer">
                <Img>
                  <img src={getImageSrc(0)} alt="Profile" />
                </Img>
                <Img>
                  <img src={getImageSrc(1)} alt="Profile" />
                </Img>
                <Img>
                  <img src={getImageSrc(2)} alt="Profile" />
                </Img>
                <Img>
                  <img src={getImageSrc(3)} alt="Profile" />
                </Img>
              </div>
            </div>
          </div>
        </MyPageContainer>
      );
    } else if (activePage === "point") {
      return (
        <PointContainer>
          <Navbar />
          <Paragraph>
            <p>
              포인트 <span className="blueColor">{userPoints}p</span>
            </p>
          </Paragraph>
          <div className="imgContainer">{images}</div>
        </PointContainer>
      );
    }
  };

  return (
    <Container>
      <PageBtnContainer>
        <Button
          id="mypageBtn"
          $active={activePage === "mypage"}
          onClick={() => setActivePage("mypage")}
        >
          마이페이지
        </Button>
        <Button
          id="pointBtn"
          $active={activePage === "point"}
          onClick={() => setActivePage("point")}
        >
          포인트
        </Button>
      </PageBtnContainer>
      {renderContent()}
    </Container>
  );
};

export default MyPage;
