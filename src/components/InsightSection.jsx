// InsightSection.jsx
// 목적:
// 기능:
// 작성자: 임사랑
// 작성일: 2024.08.07

import React, { useState } from "react";
import styled from "styled-components";

const InsightContainer = styled.div`
  width: 559px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 0px 0px 10px;
  padding: 20px;
  position: relative;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  padding: 20px 0 0;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #b6b6b6;
    z-index: 1;
  }
`;

const SectionTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: ${(props) => (props.active ? "#4C76FE" : "#B6B6B6")};
  padding-bottom: 15px;
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${(props) => (props.active ? "#4C76FE" : "transparent")};
    transition: background-color 0.3s;
    z-index: 2;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.div`
  width: 76px;
  height: 33px;
  background: ${(props) => (props.active ? "#8EA9FF" : "transparent")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => (props.active ? "#011B6C" : "#B6B6B6")};
  cursor: pointer;
  margin: 0 10px;
`;

const InsightCard = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const QuestionContainer = styled.div`
  background: #dbe1e9;
  border-radius: 4px;
  padding: 12px 107px 12px 17px;
  margin-bottom: 40px;
  display: inline-block;
`;

const QuestionText = styled.div`
  color: #061522;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
`;

const QuestionNumber = styled.span`
  color: #4c76fe;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 5px;
`;

const QuestionContent = styled.span`
  color: #061522;
`;

const ChartContainer = styled.div`
  width: 141px;
  height: 141px;
  background: #e1e8ff;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  margin-bottom: 46px;
`;

const PercentageText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #061522;
  align-self: flex-start;
  padding: 10px;
`;

const ChartContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InsightSection = () => {
  const [activeTab, setActiveTab] = useState("insight");
  const [activeButton, setActiveButton] = useState("질문 순");

  return (
    <InsightContainer>
      <SectionTitleContainer>
        <SectionTitleWrapper>
          <SectionTitle
            active={activeTab === "insight"}
            onClick={() => setActiveTab("insight")}
          >
            인사이트
          </SectionTitle>
          <SectionTitle
            active={activeTab === "structure"}
            onClick={() => setActiveTab("structure")}
          >
            설문 구조도
          </SectionTitle>
        </SectionTitleWrapper>
      </SectionTitleContainer>

      <ButtonGroup>
        <Button
          active={activeButton === "질문 순"}
          onClick={() => setActiveButton("질문 순")}
        >
          질문 순
        </Button>
        <Button
          active={activeButton === "최신 순"}
          onClick={() => setActiveButton("최신 순")}
        >
          최신 순
        </Button>
        <Button
          active={activeButton === "직접 나열"}
          onClick={() => setActiveButton("직접 나열")}
        >
          직접 나열
        </Button>
      </ButtonGroup>

      <InsightCard>
        <QuestionContainer>
          <QuestionText>
            <QuestionNumber>01</QuestionNumber>
            <QuestionContent>질문을 적어주세요</QuestionContent>
          </QuestionText>
        </QuestionContainer>
        <ChartContainer>
          <PercentageText>예 65.6%</PercentageText>
          <ChartContent>{/* 차트 내용 */}</ChartContent>
        </ChartContainer>
      </InsightCard>

      <InsightCard>
        <QuestionContainer>
          <QuestionText>
            <QuestionNumber>02</QuestionNumber>
            <QuestionContent>질문을 적어주세요</QuestionContent>
          </QuestionText>
        </QuestionContainer>
        <ChartContainer>
          <PercentageText>예 65.6%</PercentageText>
          <ChartContent>{/* 차트 내용 */}</ChartContent>
        </ChartContainer>
      </InsightCard>

      <InsightCard>
        <QuestionContainer>
          <QuestionText>
            <QuestionNumber>03</QuestionNumber>
            <QuestionContent>질문을 적어주세요</QuestionContent>
          </QuestionText>
        </QuestionContainer>
        <ChartContainer>
          <PercentageText>예 65.6%</PercentageText>
          <ChartContent>{/* 차트 내용 */}</ChartContent>
        </ChartContainer>
      </InsightCard>
    </InsightContainer>
  );
};

export default InsightSection;
