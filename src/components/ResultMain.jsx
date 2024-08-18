// ResultMain.jsx
// 목적: 결과페이지의 응답화면 구현
// 기능: 응답 활성화 버튼, 그래프(파이, 막대, 버블)
// 작성자: 임사랑
// 작성일: 2024.08.07

import React, { useState } from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  ZAxis,
  ResponsiveContainer,
} from "recharts";
import Select from "react-select";
import resultMascot from "../assets/resultMascot.png";

// 페이지 전체를 감싸는 스타일링 컴포넌트
const PageWrapper = styled.div`
  width: 783.26px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 주요 컨테이너 스타일링 컴포넌트
const MainContainer = styled.div`
  width: 783.26px;
  height: 204px;
  background: #4c76fe;
  border-radius: 8.56px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
`;

const ResponseCount = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #ffffff;
`;

// 응답 활성화 토글 컨테이너
const ActivationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 11px;
  width: 140px;
  height: 52px;
  padding: 0 10px;
  margin-top: 31px;
`;

const ActivationText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #ffffff;
  margin-right: 10px;
`;

// 토글 스위치 스타일링 컴포넌트
const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 74px;
  height: 36px;
`;

// 토글 입력 스타일링 (hidden 처리)
const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #25479d;
  }

  &:checked + span:before {
    transform: translateX(38px);
  }

  &:checked + span:after {
    content: "ON";
    left: 14px;
    color: #ffffff;
  }
`;

// 토글 슬라이더 스타일링 컴포넌트
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
    height: 28px;
    width: 28px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  &:after {
    content: "OFF";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #ffffff;
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    font-size: 13px;
  }
`;

// 마스코트 이미지 스타일링 컴포넌트
const MascotImage = styled.img`
  height: 110%;
  object-fit: contain;
`;

// 추가 섹션 스타일링 컴포넌트
const AdditionalSection = styled.div`
  width: 783.26px;
  height: 158.36px;
  background: #c6d3ff;
  border-radius: 8.56023px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BlueRectangle = styled.div`
  width: 300px;
  height: 55.64px;
  background: #4c76fe;
  border-radius: 10.2723px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
`;

const BlueRectangleText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20.5446px;
  line-height: 25px;
  color: #f0f0f0;
`;

const LongBlueRectangle = styled.div`
  width: 712px;
  height: 43.66px;
  background: #4c76fe;
  border-radius: 10.2723px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
`;

const LongBlueRectangleText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17.1205px;
  line-height: 20px;
  color: #f0f0f0;
`;

// 질문 카드 스타일링 컴포넌트
const QuestionCard = styled.div`
  width: 783.26px;
  height: 332.99px;
  background: #ffffff;
  border-radius: 8.56023px;
  position: relative;
  padding: 35px 25px;
  box-sizing: border-box;
`;

// 질문 카드의 헤더 영역 스타일링
const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

// 그래프가 들어갈 컨테이너 스타일링 컴포넌트
const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 226.88px;
`;

// 범례와 그래프를 감싸는 그룹 컨테이너
const ChartLegendGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
`;

const ChartWrapper = styled.div`
  width: ${(props) => (props.isBarChart ? "500px" : "300px")};
  height: 200px;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 80px;
`;

// 범례 항목 스타일링 컴포넌트
const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 5px;
  border-radius: 2px;
`;

const LegendText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: #5d6670;
`;

// 커스텀 스타일을 적용한 Select 컴포넌트의 스타일링 설정
const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 150,
    height: 36,
    backgroundColor: "#4C76FE",
    borderRadius: "6.85px",
    border: "1px solid #4C76FE",
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: "15.408px",
    lineHeight: "normal",
    color: "#FFF",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#4C76FE",
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
    borderRadius: "0 0 6.85px 6.85px",
    border: "1px solid #4C76FE",
    borderTop: "none",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Pretendard",
    fontWeight: 600,
    fontSize: "14px",
    color: state.isSelected ? "#3E77FF" : "#061522",
    backgroundColor: state.isSelected
      ? "rgba(47, 53, 61, 0.1)"
      : state.isFocused
      ? "rgba(47, 53, 61, 0.05)"
      : "#FFFFFF",
    "&:hover": {
      backgroundColor: "rgba(47, 53, 61, 0.05)",
    },
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

// 드롭다운 래퍼 스타일링 컴포넌트
const DropdownWrapper = styled.div`
  width: 150px;
`;

// 차트 타입 변경 드롭다운 컴포넌트
const ChartChangeDropdown = ({ value, onChange }) => {
  const options = [
    { value: "pie", label: "파이 차트" },
    { value: "bar", label: "막대 차트" },
    { value: "bubble", label: "버블 차트" },
  ];

  return (
    <DropdownWrapper>
      <Select
        styles={customStyles}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) =>
          onChange({ target: { value: selectedOption.value } })
        }
        options={options}
        isSearchable={false}
      />
    </DropdownWrapper>
  );
};

// 결과 페이지 메인 컴포넌트
const ResultMain = () => {
  // 응답 활성화 상태 관리
  const [isActivated, setIsActivated] = useState(false);

  // 첫 번째 질문의 차트 타입 상태 관리
  const [chartType1, setChartType1] = useState("pie");

  // 두 번째 질문의 차트 타입 상태 관리
  const [chartType2, setChartType2] = useState("bar");

  // 첫 번째 질문에 대한 데이터
  const data1 = [
    { name: "1번", value: 78.3, color: "#4C76FE", z: 400 },
    { name: "2번", value: 15.4, color: "#8EA9FF", z: 200 },
    { name: "3번", value: 6.3, color: "#E1E8FF", z: 100 },
  ];

  // 두 번째 질문에 대한 데이터
  const data2 = [
    { name: "A", value: 45.3, color: "#4C76FE", z: 300 },
    { name: "B", value: 30.1, color: "#8EA9FF", z: 250 },
    { name: "C", value: 24.6, color: "#E1E8FF", z: 150 },
  ];

  // 커스터마이즈된 라벨 렌더링 함수
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
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

  // 선택된 차트 타입에 따라 적절한 차트를 렌더링하는 함수
  const renderChart = (chartType, data) => {
    switch (chartType) {
      case "pie":
        return (
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
        );
      case "bar":
        return (
          <ChartContainer>
            {/* 수평 막대 차트 */}
            <BarChart
              width={300}
              height={200}
              data={data}
              margin={{ top: 20, right: 60, left: 0, bottom: 30 }}
              layout="horizontal"
            >
              <XAxis dataKey="name" hide axisLine={false} tick={false} />
              <YAxis hide axisLine={false} tick={false} />
              <Tooltip />
              <Bar
                dataKey="value"
                radius={[4, 4, 4, 4]}
                label={({ x, y, width, height, value, index }) => (
                  <g>
                    <text
                      x={x + width / 2}
                      y={y + height + 15}
                      fill={data[index].color}
                      textAnchor="middle"
                    >
                      {data[index].name}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y - 10}
                      fill={data[index].color}
                      textAnchor="middle"
                    >
                      {value}%
                    </text>
                  </g>
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>

            {/* 수직 막대 차트 */}
            <BarChart
              width={300}
              height={200}
              data={data}
              margin={{ top: 20, right: 50, left: 30, bottom: 30 }}
              layout="vertical"
            >
              <XAxis type="number" hide axisLine={false} tick={false} />
              <YAxis
                dataKey="name"
                type="category"
                hide
                axisLine={false}
                tick={false}
              />
              <Tooltip />
              <Bar
                dataKey="value"
                radius={[4, 4, 4, 4]}
                label={({ x, y, width, height, value, index }) => (
                  <g>
                    <text
                      x={x - 5}
                      y={y + height / 2}
                      fill={data[index].color}
                      textAnchor="end"
                      dominantBaseline="middle"
                    >
                      {data[index].name}
                    </text>
                    <text
                      x={x + width + 5}
                      y={y + height / 2}
                      fill={data[index].color}
                      textAnchor="start"
                      dominantBaseline="middle"
                    >
                      {value}%
                    </text>
                  </g>
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        );
      case "bubble":
        return (
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
              type="number"
              dataKey="value"
              hide
              axisLine={false}
              tick={false}
            />
            <YAxis
              type="number"
              dataKey="z"
              hide
              axisLine={false}
              tick={false}
            />
            <ZAxis type="number" range={[100, 500]} dataKey="z" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Data" data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        );
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      {/* 상단 응답 활성화 섹션 */}
      <MainContainer>
        <div>
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
        </div>
        <MascotImage src={resultMascot} alt="Result Mascot" />
      </MainContainer>

      {/* 추가 설명 섹션 */}
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

      {/* 질문 1 섹션 */}
      <QuestionCard>
        <QuestionHeader>
          <QuestionInfo>
            <QuestionNumber>1.</QuestionNumber>
            <QuestionTitle>질문 1의 내용이 들어갈 자리입니다.</QuestionTitle>
          </QuestionInfo>
          <ChartChangeDropdown
            value={chartType1}
            onChange={(e) => setChartType1(e.target.value)}
          />
        </QuestionHeader>
        <QuestionDescription>
          질문 1의 설명이 들어갈 자리입니다. (선택)
        </QuestionDescription>
        <ChartContainer>
          <ChartLegendGroup>
            <ChartWrapper isBarChart={chartType1 === "bar"}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart(chartType1, data1)}
              </ResponsiveContainer>
            </ChartWrapper>
            <LegendWrapper>
              {data1.map((entry, index) => (
                <LegendItem key={index}>
                  <LegendColor color={entry.color} />
                  <LegendText>{entry.name}</LegendText>
                </LegendItem>
              ))}
            </LegendWrapper>
          </ChartLegendGroup>
        </ChartContainer>
      </QuestionCard>

      {/* 질문 2 섹션 */}
      <QuestionCard>
        <QuestionHeader>
          <QuestionInfo>
            <QuestionNumber>2.</QuestionNumber>
            <QuestionTitle>질문 2의 내용이 들어갈 자리입니다.</QuestionTitle>
          </QuestionInfo>
          <ChartChangeDropdown
            value={chartType2}
            onChange={(e) => setChartType2(e.target.value)}
          />
        </QuestionHeader>
        <QuestionDescription>
          질문 2의 설명이 들어갈 자리입니다. (선택)
        </QuestionDescription>
        <ChartContainer>
          <ChartLegendGroup>
            <ChartWrapper isBarChart={chartType2 === "bar"}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart(chartType2, data2)}
              </ResponsiveContainer>
            </ChartWrapper>
            <LegendWrapper>
              {data2.map((entry, index) => (
                <LegendItem key={index}>
                  <LegendColor color={entry.color} />
                  <LegendText>{entry.name}</LegendText>
                </LegendItem>
              ))}
            </LegendWrapper>
          </ChartLegendGroup>
        </ChartContainer>
      </QuestionCard>
    </PageWrapper>
  );
};

export default ResultMain;
