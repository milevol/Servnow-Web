// InsightSection.jsx
// 목적: 결과페이지의 인사이트 부분 구현
// 기능: 인사이트&설문 구조도 토글, 질문 순 직접 나열, 메모장 자동저장
// 작성자: 임사랑
// 작성일: 2024.08.07

import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 스타일링된 컴포넌트들 정의
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
  justify-content: space-between;
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
  cursor: pointer;
  position: relative;
  flex: 1;
  text-align: center;

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
  margin: 0 60px;
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

const NoteContainer = styled.div`
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

const NoteContent = styled.textarea`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: #061522;
  resize: none;
  outline: none;
`;

// InsightSection 컴포넌트 정의
const InsightSection = () => {
  // 활성화된 탭 (인사이트/설문 구조도) 상태 관리
  const [activeTab, setActiveTab] = useState("insight");

  // 활성화된 버튼 (질문 순/직접 나열) 상태 관리
  const [activeButton, setActiveButton] = useState("질문 순");

  // 메모 내용 상태 관리 (로컬 스토리지에서 초기값을 가져옴)
  const [notes, setNotes] = useState(() => {
    const savedNotes = {
      note1: localStorage.getItem("note1") || "",
      note2: localStorage.getItem("note2") || "",
      note3: localStorage.getItem("note3") || "",
    };
    return savedNotes;
  });

  // notes 상태가 변경될 때마다 로컬 스토리지에 자동 저장
  useEffect(() => {
    localStorage.setItem("note1", notes.note1);
    localStorage.setItem("note2", notes.note2);
    localStorage.setItem("note3", notes.note3);
  }, [notes]);

  // 메모 내용 변경 시 호출되는 함수
  const handleNoteChange = (e, noteKey) => {
    setNotes({ ...notes, [noteKey]: e.target.value });
  };

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
        <NoteContainer>
          <NoteContent
            value={notes.note1}
            onChange={(e) => handleNoteChange(e, "note1")}
            placeholder="메모를 입력하세요"
          />
        </NoteContainer>
      </InsightCard>

      <InsightCard>
        <QuestionContainer>
          <QuestionText>
            <QuestionNumber>02</QuestionNumber>
            <QuestionContent>질문을 적어주세요</QuestionContent>
          </QuestionText>
        </QuestionContainer>
        <NoteContainer>
          <NoteContent
            value={notes.note2}
            onChange={(e) => handleNoteChange(e, "note2")}
            placeholder="메모를 입력하세요"
          />
        </NoteContainer>
      </InsightCard>

      <InsightCard>
        <QuestionContainer>
          <QuestionText>
            <QuestionNumber>03</QuestionNumber>
            <QuestionContent>질문을 적어주세요</QuestionContent>
          </QuestionText>
        </QuestionContainer>
        <NoteContainer>
          <NoteContent
            value={notes.note3}
            onChange={(e) => handleNoteChange(e, "note3")}
            placeholder="메모를 입력하세요"
          />
        </NoteContainer>
      </InsightCard>
    </InsightContainer>
  );
};

export default InsightSection;
