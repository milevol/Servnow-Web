// SurveyCard.jsx
// 목적: 개별 설문 조사 정보를 카드 형태로 표시
// 기능: 설문 제목, D-day, 날짜, 참여자 수 표시 및 참여 버튼 제공
// 작성자: 임사랑
// 작성일: 2024.07.19

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import peopleImage from "../assets/people.png";

// 카드 컨테이너 스타일 정의
const CardContainer = styled.div`
  width: 100%;
  max-width: 1235px;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(95, 108, 126, 0.25);
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 50px;
  margin-bottom: 25px;
  box-sizing: border-box;
  height: 180px;
`;

// 좌측 섹션 스타일
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// 우측 섹션 스타일
const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// 설문 제목 스타일
const Title = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 1.2;
  color: #061522;
  margin-bottom: 13px;
`;

// 정보 컨테이너 스타일
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 13px;
`;

// 날짜 스타일
const DateInfo = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 22px;
  color: #5d6670;
`;

// D-day 텍스트 스타일
const DdayText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #5d6670;
`;

// 참여자 수 컨테이너 스타일
const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 참여자 수 텍스트 스타일
const Percentage = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
`;

// 현재 참여자 수 스타일
const CurrentParticipants = styled.span`
  color: #4c76fe;
  font-weight: 600;
`;

// 총 참여자 수 스타일
const TotalParticipants = styled.span`
  color: #000000;
  font-weight: 400;
`;

// 참여자 아이콘 스타일
const PeopleIcon = styled.div`
  width: 26px;
  height: 20px;
  background: url(${peopleImage}) no-repeat center center;
  background-size: contain;
`;

// 참여 버튼 스타일
const Button = styled.div`
  width: 150px;
  height: 70px;
  background: ${({ completed }) => (completed ? "#AAAAAA" : "#4c76fe")};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ completed }) => (completed ? "default" : "pointer")};
`;

// 버튼 텍스트 스타일
const ButtonText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 22px;
  color: #ffffff;
`;

// SurveyCard 컴포넌트 함수
function SurveyCard({ title, day, date, people, completed }) {
  const navigate = useNavigate();

  const handleParticipation = () => {
    if (!completed) {
      navigate("/participation");
    }
  };

  return (
    <CardContainer>
      <LeftSection>
        <Title>{title}</Title>
        <InfoContainer>
          <DdayText>D-{day}</DdayText>
          <DateInfo>{date}</DateInfo>
        </InfoContainer>
        <PercentageContainer>
          <PeopleIcon />
          <Percentage>
            <CurrentParticipants>{people}</CurrentParticipants>
            <TotalParticipants>/100</TotalParticipants>
          </Percentage>
        </PercentageContainer>
      </LeftSection>
      <RightSection>
        <Button completed={completed} onClick={handleParticipation}>
          <ButtonText>{completed ? "참여 완료" : "참여 하기"}</ButtonText>
        </Button>
      </RightSection>
    </CardContainer>
  );
}

export default SurveyCard;
