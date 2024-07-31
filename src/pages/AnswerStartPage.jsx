import React from "react";
import styled from "styled-components";
import character from "../assets/logo1.png";
import menu from "../assets/menu.png";

const Container = styled.div`
  padding: 48px;
  background-color: #f2f5ff;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;

  div:last-child {
    padding: 48px 40px;
    margin-top: 24px;
  }
`;

const SurveyWrapper = styled.div`
  display: flex;

  div {
    display: flex;
    align-items: center;
  }

  div:nth-child(2) {
    padding: 24px 36px;
    margin: 0 0 0 12px;
  }
`;

const Survey = styled.div`
  width: fit-content;
  padding: 16px 32px;
  border-radius: 12px;
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 10%);
  background-color: white;
  color: #061522;
  font-size: 22px;

  span {
    margin: 0 8px 0 0;
    font-size: 32px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Pretendard Bold";
  font-size: 26px;

  img {
    width: 32px;
    margin: 0 0 0 36px;
  }
`;

const Term = styled.p`
  margin-top: 12px;
  color: #5d6670;
  font-size: 20px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 432px;
  }
`;

const Description = styled.div`
  width: 40%;
  padding: 2% 15% 2% 4%;
  margin: 24px 36px;
  border-radius: 24px 24px 24px 0;
  background-color: #3e77ff;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
  word-break: keep-all;
`;

const AnswerStartPage = () => {
  return (
    <Container>
      <SurveyContainer>
        <SurveyWrapper>
          <Survey>
            <span>🕘</span> 약 2분, 10개 질문
          </Survey>
          <Survey>
            <span>🎁</span> 스타벅스 아메리카노 기프티콘 추첨 10명
          </Survey>
        </SurveyWrapper>
        <Survey>
          <Title>
            도서관에서의 가상현실(VR) 콘텐츠 이용자 경험 및 만족도 조사
            <img src={menu} />
          </Title>
          <Term>2024.06.19. 오후 12:00~ 2024.07.19 오후 5:59</Term>
        </Survey>
      </SurveyContainer>
      <DescriptionContainer>
        <img src={character} />
        <div>
          <Description>
            안녕하세요 ! 대학생 개발 연합동아리 UMC 트리지부 아이디어톤을 준비하고 있는 동덕여자대학교 PM
            아리/우예진입니다.
          </Description>
          <Description>
            해당 설문조사는 설문 서비스 플랫폼 관련 인식조사입니다. 설문 서비스 플랫폼 커뮤니티 기획안 작성 외의
            용도로는 사용되지 않음을 약속드립니다.
          </Description>
        </div>
      </DescriptionContainer>
    </Container>
  );
};

export default AnswerStartPage;
