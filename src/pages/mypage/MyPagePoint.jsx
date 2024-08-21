// 목적: 포인트 페이지 화면 구현
// 기능: 포인트 페이지
// 2024.08.21/곤/장고은
// 추가되어야 할 기능: api 연결, 링크 연결
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

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
const Paragraph = styled.p`
  width: 100%;
  margin: 30px 0px;
  font-size: 20px;
  font-weight: bold;
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

const MyPagePoint = () => {
  const navigate = useNavigate();

  const userPoints = 2500; // 현재 사용자 포인트

  const imageCount = 12;
  const pointsRequired = [
    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500,
  ];

  // 캐릭터 이미지 배열
  const characterImages = [
    "/roundLogo.png", // 0 포인트 이상
    "/roundLogo.png", // 500 포인트 이상
    "/roundLogo.png", // 1000 포인트 이상
    "/roundLogo.png", // 1500 포인트 이상
    "/roundLogo.png", // 2000 포인트 이상
    "/roundLogo.png", // 2500 포인트 이상
    "/roundLogo.png", // 3000 포인트 이상
    "/roundLogo.png", // 3500 포인트 이상
    "/roundLogo.png", // 4000 포인트 이상
    "/roundLogo.png", // 4500 포인트 이상
    "/roundLogo.png", // 5000 포인트 이상
    "/roundLogo.png", // 5500 포인트 이상
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
        <Paragraph>
          <p>
            포인트 <span className="blueColor">{userPoints}p</span>
          </p>
        </Paragraph>
        <div className="imgContainer">{images}</div>
      </PointContainer>
    </Container>
  );
};

export default MyPagePoint;
