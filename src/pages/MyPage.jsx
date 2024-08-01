// 목적: 마이페이지와 포인트 페이지 화면 구현
// 기능: 마이페이지, 포인트 페이지
// 2024.08.02/곤/장고은
// 추가되어야 할 기능: api 연결 후 필요한 데이터 전달, 등급 단계 표시, 포인트 별 이미지 잠금 여부, 내 정보 수정 링크 연결.. 등

import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  cursor: default;
  .blueColor {
    color: #3e77ff;
  }
`;

const MyPageContainer = styled.div`
  width: 100%;

  #darkblueColor {
    color: #011b6c;
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
    height: 200px;
    background-color: #f2f5ff;
    border-radius: 15px;
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
  }

  #container2 {
    margin-top: 20px;
  }

  #etc1 {
    width: 15%;
    height: 200px;
    padding: 30px 0px;
    margin-top: -310px;
    font-size: 20px;
    border: solid 1px #e6e6e6;
    border-radius: 5px;
    p {
      margin: 20px 20px;
    }
    hr {
      border: solid 1px #e6e6e6;
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
  }

  #surveyContainer {
    text-align: center;
    span {
      padding: 0 120px;
    }

    .weight {
      margin: 10px;
      color: #3e77ff;
    }

    #lineCss {
      border: solid #bccfff;
      border-width: 0 1px 0;
    }
  }

  #pointContainer {
    gap: 150px;
  }
`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 90%;

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
    width: 150px;
    height: auto;
  }
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

const MyPage = () => {
  const [activePage, setActivePage] = useState("mypage");
  const imageCount = 12;
  const images = Array.from({ length: imageCount }, (_, index) => {
    const src = index < 4 ? "src/assets/roundLogo1.png" : "src/assets/lock.png";
    return (
      <div key={index} className="image-container">
        <img src={src} alt="Profile" />
      </div>
    );
  });

  const renderContent = () => {
    if (activePage === "mypage") {
      return (
        <MyPageContainer>
          <div id="container1">
            <div id="profile">
              <Img>
                <img src="src\assets\roundLogo1.png" alt="Profile" />
              </Img>
              <div>
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
                <p className="weight">평민</p>
              </div>
              <div>
                <span className="blueColor">
                  다음 캐릭터까지&nbsp;<span className="weight">565p</span>
                  &nbsp;남았어요!
                </span>
                <hr></hr>
                <span id="rate">
                  <p className="blueColor">평민</p>
                  <p className="blueColor">기사</p>
                  <p className="blueColor">남작</p>
                  <p className="blueColor">백작</p>
                  <p className="blueColor">공작</p>
                </span>
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
                  <p className="weight">1,435</p>
                  <p>포인트</p>
                </span>
              </div>
              <p className="weight">
                포인트 <span className="blueColor">1,435p</span> &nbsp;&nbsp;
                <button
                  $active={activePage === "point"}
                  onClick={() => setActivePage("point")}
                >
                  &gt;
                </button>
              </p>
              <div id="pointContainer">
                <Img>
                  <img src="src\assets\roundLogo1.png" alt="Profile" />
                </Img>
                <Img>
                  <img src="src\assets\roundLogo1.png" alt="Profile" />
                </Img>
                <Img>
                  <img src="src\assets\roundLogo1.png" alt="Profile" />
                </Img>
                <Img>
                  <img src="src\assets\lock.png" alt="Profile" />
                </Img>
              </div>
            </div>
          </div>
        </MyPageContainer>
      );
    } else if (activePage === "point") {
      return (
        <PointContainer>
          <Paragraph>
            <p>
              포인트 <span className="blueColor">1,435p</span>
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
