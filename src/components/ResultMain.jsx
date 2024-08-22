// ResultMain.jsx
// 목적: 결과페이지의 응답화면 구현
// 기능: 응답 활성화 버튼, 그래프(파이, 막대, 버블)
// 작성자: 임사랑
// 작성일: 2024.08.07

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";
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
import resultMascot from "../assets/resultMascot.png";

// 페이지 전체를 감싸는 스타일링 컴포넌트
const PageWrapper = styled.div`
  width: 810px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 주요 컨테이너 스타일링 컴포넌트
const MainContainer = styled.div`
  width: 810px;
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
const AdditionalSectionWrapper = styled.div`
  width: 810px;
  background: #c6d3ff;
  border-radius: 8.56023px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BlueRectangle = styled.div`
  display: flex;
  height: 55.64px;
  background: #4c76fe;
  border-radius: 10.2723px;
  align-items: center;
  padding: 0 15px;
  white-space: nowrap;
  box-sizing: border-box;
  width: fit-content;
`;

const BlueRectangleText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20.5446px;
  line-height: 25px;
  color: #f0f0f0;
  white-space: nowrap;
`;

const LongBlueRectangle = styled.div`
  width: 740px;
  height: 43.66px;
  background: #4c76fe;
  border-radius: 10.2723px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  margin-top: 15px;
`;

const LongBlueRectangleText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17.1205px;
  line-height: 20px;
  color: #f0f0f0;
`;

// AdditionalSection 컴포넌트
const AdditionalSection = ({ title, description }) => (
  <AdditionalSectionWrapper>
    <BlueRectangle>
      <BlueRectangleText>{title}</BlueRectangleText>
    </BlueRectangle>
    <LongBlueRectangle>
      <LongBlueRectangleText>{description}</LongBlueRectangleText>
    </LongBlueRectangle>
  </AdditionalSectionWrapper>
);

// 질문 카드 스타일링 컴포넌트
const QuestionCardWrapper = styled.div`
  width: 810px;
  background: #ffffff;
  border-radius: 8.56023px;
  position: relative;
  padding: 35px 25px;
  box-sizing: border-box;
  margin-bottom: 20px;
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
  margin-right: 10px;
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

// 주관식 응답을 감싸는 컨테이너 스타일링 컴포넌트
const SubjectiveResponsesContainer = styled.div`
  max-height: 210px; // 주관식 답변 영역의 최대 높이 설정
  overflow-y: auto; // 세로 스크롤 허용
  margin-top: 30px;

  &::-webkit-scrollbar {
    width: 6px; // 스크롤바의 너비
  }

  &::-webkit-scrollbar-track {
    background: transparent; // 스크롤바 트랙의 배경
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); // 스크롤바 색상
    border-radius: 10px; // 스크롤바 모서리 둥글게
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3); // 스크롤바 호버 시 색상
  }
`;

// 주관식 응답 스타일링 컴포넌트
const ResponseBox = styled.div`
  position: relative;
  width: 741.32px;
  min-height: 43.66px;
  margin-bottom: 20px;
  background: #e1e8ff;
  border-radius: 6.32px;
  padding: 15px 20px;
  box-sizing: border-box;
  word-wrap: break-word; // 단어가 너무 길어서 박스를 넘칠 경우 줄바꿈
  word-break: break-word; // 단어 단위로 줄바꿈
  overflow-wrap: break-word; // 긴 단어나 URL이 박스를 넘치지 않게 줄바꿈
`;

const ResponseText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 13.6964px;
  line-height: 16px;
  color: #5d6670;
  word-wrap: break-word;
  padding: 5px 0;
`;

const SubjectiveResponses = ({ responses }) => {
  return (
    <SubjectiveResponsesContainer>
      {responses.map((response, index) => (
        <ResponseBox key={index}>
          <ResponseText>{response.responseContent}</ResponseText>
        </ResponseBox>
      ))}
    </SubjectiveResponsesContainer>
  );
};

// QuestionCard 컴포넌트
const QuestionCard = ({
  questionNumber,
  title,
  description,
  chartType,
  setChartType,
  data,
  questionType,
  responses,
}) => {
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
        const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
        const percentageData = data.map((entry) => ({
          ...entry,
          value: ((entry.value / totalValue) * 100).toFixed(1),
        }));
        return (
          <ChartContainer>
            <BarChart
              width={300}
              height={200}
              data={percentageData}
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
                      fill={percentageData[index].color}
                      textAnchor="middle"
                    >
                      {percentageData[index].name}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y - 10}
                      fill={percentageData[index].color}
                      textAnchor="middle"
                    >
                      {value}%
                    </text>
                  </g>
                )}
              >
                {percentageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
            <BarChart
              width={300}
              height={200}
              data={percentageData}
              margin={{ top: 20, right: 50, left: 70, bottom: 30 }}
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
                      fill={percentageData[index].color}
                      textAnchor="end"
                      dominantBaseline="middle"
                    >
                      {percentageData[index].name}
                    </text>
                    <text
                      x={x + width + 5}
                      y={y + height / 2}
                      fill={percentageData[index].color}
                      textAnchor="start"
                      dominantBaseline="middle"
                    >
                      {value}%
                    </text>
                  </g>
                )}
              >
                {percentageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        );

      case "bubble":
        return (
          <ScatterChart
            width={400}
            height={200}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis type="number" dataKey="x" name="X" hide />
            <YAxis type="number" dataKey="y" name="Y" hide />
            <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Z" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Data" data={data} fill="#8884d8">
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
    <QuestionCardWrapper>
      <QuestionHeader>
        <QuestionInfo>
          <QuestionNumber>{questionNumber}.</QuestionNumber>
          <QuestionTitle>{title}</QuestionTitle>
        </QuestionInfo>
        {questionType !== "SUBJECTIVE_SHORT" && (
          <ChartChangeDropdown
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          />
        )}
      </QuestionHeader>
      <QuestionDescription>{description}</QuestionDescription>
      {questionType === "SUBJECTIVE_SHORT" ? (
        <SubjectiveResponses responses={responses} />
      ) : (
        <ChartContainer>
          <ChartLegendGroup>
            <ChartWrapper isBarChart={chartType === "bar"}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart(chartType, data)}
              </ResponsiveContainer>
            </ChartWrapper>
            <LegendWrapper>
              {data.map((entry, index) => (
                <LegendItem key={index}>
                  <LegendColor color={entry.color} />
                  <LegendText>{entry.name}</LegendText>
                </LegendItem>
              ))}
            </LegendWrapper>
          </ChartLegendGroup>
        </ChartContainer>
      )}
    </QuestionCardWrapper>
  );
};

// 결과 페이지 메인 컴포넌트
// surveyId를 받아서 API 요청에 사용
const ResultMain = ({ surveyId }) => {
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionCards, setQuestionCards] = useState([]);
  const [isActivated, setIsActivated] = useState(false); // 응답 활성화 상태

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const token = localStorage.getItem("accessToken")
          ? localStorage.getItem("accessToken")
          : sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `/api/v1/users/me/survey/${surveyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedSurveyData = response.data.data;
        setSurveyData(fetchedSurveyData);

        const initialQuestionCards = fetchedSurveyData.sections.map(
          (section) => ({
            sectionTitle: section.sectionTitle,
            sectionContent: section.sectionContent,
            questions: section.questions.map((question) => {
              const chartData =
                question.questionType === "MULTIPLE_CHOICE"
                  ? question.choices.map((choice, index) => ({
                      name: choice.multipleChoiceContent,
                      value: choice.response,
                      color: ["#4C76FE", "#8EA9FF", "#E1E8FF"][index % 3],
                      x: index + 1,
                      y: choice.response,
                      z: choice.response * 10,
                    }))
                  : [];

              return {
                questionNumber: question.questionNumber,
                title: question.questionTitle,
                description: question.questionContent,
                chartType: "pie",
                data: chartData,
                questionType: question.questionType,
                responses: question.responses,
              };
            }),
          })
        );

        setQuestionCards(initialQuestionCards);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [surveyId]); // surveyId가 변경될 때마다 데이터를 다시 가져옴

  const handleToggleChange = () => {
    setIsActivated(!isActivated);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const responseCount = surveyData.response;

  return (
    <PageWrapper>
      <MainContainer>
        <div>
          <ResponseCount>응답 {responseCount}개</ResponseCount>
          <ActivationContainer>
            <ActivationText>응답 활성화</ActivationText>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={isActivated}
                onChange={handleToggleChange}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ActivationContainer>
        </div>
        <MascotImage src={resultMascot} alt="Result Mascot" />
      </MainContainer>

      {questionCards.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <AdditionalSectionWrapper>
            <BlueRectangle>
              <BlueRectangleText>{section.sectionTitle}</BlueRectangleText>
            </BlueRectangle>
            <LongBlueRectangle>
              <LongBlueRectangleText>
                {section.sectionContent}
              </LongBlueRectangleText>
            </LongBlueRectangle>
          </AdditionalSectionWrapper>
          {section.questions.map((question, questionIndex) => (
            <QuestionCard
              key={questionIndex}
              questionNumber={question.questionNumber}
              title={question.title}
              description={question.description}
              chartType={question.chartType}
              setChartType={(newType) => {
                const newQuestionCards = [...questionCards];
                newQuestionCards[sectionIndex].questions[
                  questionIndex
                ].chartType = newType;
                setQuestionCards(newQuestionCards);
              }}
              data={question.data}
              questionType={question.questionType}
              responses={question.responses}
            />
          ))}
        </div>
      ))}
    </PageWrapper>
  );
};

export default ResultMain;
