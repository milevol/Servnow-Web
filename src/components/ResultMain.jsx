// ResultMain.jsx
// 목적:
// 기능:
// 작성자: 임사랑
// 작성일: 2024.08.07

import React, { useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import resultMascot from "../assets/resultMascot.png";

const MainContainer = styled.div`
  width: 783.26px;
  height: 204px;
  background: #4c76fe;
  border-radius: 8.56px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ResponseCount = styled.div`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #ffffff;
  margin-right: 20px;
`;

const ActivationContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 11px;
  width: 159px;
  height: 52px;
  padding: 0 10px;
`;

const ActivationText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #ffffff;
  margin-right: 10px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 74px;
  height: 36px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #5d6670;
  }

  &:checked + span:before {
    transform: translateX(38px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #5d6670;
  transition: 0.4s;
  border-radius: 22.34px;

  &:before {
    position: absolute;
    content: "";
    height: 29px;
    width: 29px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SortContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const SortButton = styled.button`
  width: 97px;
  height: 39px;
  background: #c6d3ff;
  border-radius: 8.56px;
  border: none;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #4c76fe;
  margin-right: 10px;
  cursor: pointer;
`;

const MascotImage = styled.img`
  height: 100%;
  object-fit: contain;
  align-self: flex-end;
`;

const AdditionalSection = styled.div`
  position: relative;
  width: 783.26px;
  height: 158.36px;
  background: #c6d3ff;
  border-radius: 8.56023px;
  margin-top: 20px;
`;

const BlueRectangle = styled.div`
  position: absolute;
  width: 319.3px;
  height: 55.64px;
  left: 17.98px;
  top: 23.11px;
  background: #4c76fe;
  border-radius: 10.2723px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlueRectangleText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20.5446px;
  line-height: 25px;
  text-align: center;
  color: #f0f0f0;
`;

const LongBlueRectangle = styled.div`
  position: absolute;
  width: 741.32px;
  height: 43.66px;
  left: 17.98px;
  top: 97.59px;
  background: #4c76fe;
  border-radius: 10.2723px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LongBlueRectangleText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17.1205px;
  line-height: 20px;
  text-align: center;
  color: #f0f0f0;
`;

const QuestionCard = styled.div`
  width: 783.26px;
  height: 332.99px;
  background: #ffffff;
  border-radius: 8.56023px;
  position: relative;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionInfo = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionNumber = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 27.3927px;
  line-height: 33px;
  text-align: center;
  color: #4c76fe;
  margin-right: 20px;
`;

const QuestionTitle = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20.5446px;
  line-height: 25px;
  color: #5d6670;
`;

const QuestionDescription = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 13.6964px;
  line-height: 16px;
  color: #5d6670;
  margin-top: 5px;
`;

const ChartChangeDropdown = styled.select`
  width: 150px;
  height: 36px;
  background: #4c76fe;
  border-radius: 6.84819px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 15.4084px;
  line-height: 18px;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const ChartContainer = styled.div`
  position: absolute;
  width: 365.5px;
  height: 226.88px;
  left: 209px;
  top: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartWrapper = styled.div`
  width: 200px;
  height: 200px;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  background: ${(props) => props.color};
  border-radius: 2px;
  margin-right: 10px;
`;

const LegendText = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: #323232;
`;

const ResultMain = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [sortType, setSortType] = useState("질문 순");
  const [chartType, setChartType] = useState("pie");

  const data = [
    { name: "예", value: 65.6, color: "#4C76FE" },
    { name: "아니오", value: 34.4, color: "#C6D3FF" },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <LegendWrapper>
        {payload.map((entry, index) => (
          <LegendItem key={`item-${index}`}>
            <LegendColor color={entry.color} />
            <LegendText>{entry.name}</LegendText>
          </LegendItem>
        ))}
      </LegendWrapper>
    );
  };

  return (
    <>
      <MainContainer>
        <ContentWrapper>
          <LeftContent>
            <TopSection>
              <ResponseCount>응답 108개</ResponseCount>
              <ActivationContainer>
                <ActivationText>응답 활성화</ActivationText>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={isActivated}
                    onChange={() => setIsActivated(!isActivated)}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </ActivationContainer>
            </TopSection>
            <SortContainer>
              <SortButton onClick={() => setSortType("질문 순")}>
                질문 순
              </SortButton>
              <SortButton onClick={() => setSortType("최신 순")}>
                최신 순
              </SortButton>
            </SortContainer>
          </LeftContent>
          <MascotImage src={resultMascot} alt="Result Mascot" />
        </ContentWrapper>
      </MainContainer>
      <AdditionalSection>
        <BlueRectangle>
          <BlueRectangleText>섹션 내용을 입력해 주세요.</BlueRectangleText>
        </BlueRectangle>
        <LongBlueRectangle>
          <LongBlueRectangleText>
            섹션 내용을 입력해 주세요.
          </LongBlueRectangleText>
        </LongBlueRectangle>
      </AdditionalSection>
      <QuestionCard>
        <QuestionHeader>
          <QuestionInfo>
            <QuestionNumber>1.</QuestionNumber>
            <QuestionTitle>질문 1의 내용이 들어갈 자리입니다.</QuestionTitle>
          </QuestionInfo>
          <ChartChangeDropdown
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="pie">파이 차트</option>
            <option value="bar">막대 차트</option>
            <option value="line">라인 차트</option>
          </ChartChangeDropdown>
        </QuestionHeader>
        <QuestionDescription>
          질문 1의 설명이 들어갈 자리입니다. (선택)
        </QuestionDescription>
        <ChartContainer>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>
          <CustomLegend payload={data} />
        </ChartContainer>
      </QuestionCard>
      <QuestionCard>
        <QuestionHeader>
          <QuestionInfo>
            <QuestionNumber>2.</QuestionNumber>
            <QuestionTitle>질문 2의 내용이 들어갈 자리입니다.</QuestionTitle>
          </QuestionInfo>
          <ChartChangeDropdown
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="pie">파이 차트</option>
            <option value="bar">막대 차트</option>
            <option value="line">라인 차트</option>
          </ChartChangeDropdown>
        </QuestionHeader>
        <QuestionDescription>
          질문 2의 설명이 들어갈 자리입니다. (선택)
        </QuestionDescription>
        <ChartContainer>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>
          <CustomLegend payload={data} />
        </ChartContainer>
      </QuestionCard>
    </>
  );
};

export default ResultMain;
