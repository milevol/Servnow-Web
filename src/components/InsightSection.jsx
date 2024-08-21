// InsightSection.jsx
// 목적: 결과페이지의 인사이트 부분 구현
// 기능: 인사이트&설문 구조도 토글, 질문 순 직접 나열, 메모장 자동저장
// 작성자: 임사랑
// 작성일: 2024.08.07

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
  color: ${(props) => (props.$active ? "#4C76FE" : "#B6B6B6")};
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
    background-color: ${(props) => (props.$active ? "#4C76FE" : "transparent")};
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

const Button = styled.div.attrs((props) => ({
  active: undefined,
}))`
  width: 76px;
  height: 33px;
  background: ${(props) => (props.$active ? "#8EA9FF" : "transparent")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => (props.$active ? "#011B6C" : "#B6B6B6")};
  cursor: pointer;
  margin: 0 60px;
`;

const NoteRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const NoteContainer = styled.div`
  width: 141px;
  height: 141px;
  background: #e1e8ff;
  display: inline-block;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  margin-right: 10px;
  flex-shrink: 0;
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

const AddNoteContainer = styled.div`
  width: 141px;
  height: 141px;
  background: none;
  border: 1px dashed #b6b6b6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  flex-shrink: 0;
  padding: 9px;
`;

const AddNoteIcon = styled.div`
  font-size: 24px;
  color: #b6b6b6;
`;

const InsightCardContainer = styled.div`
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

const InsightCard = ({
  questionNumber,
  questionText,
  notes,
  onNoteChange,
  onAddNote,
}) => (
  <InsightCardContainer>
    <QuestionContainer>
      <QuestionText>
        <QuestionNumber>{questionNumber}</QuestionNumber>
        <QuestionContent>{questionText}</QuestionContent>
      </QuestionText>
    </QuestionContainer>
    <NoteRow>
      {notes.map((note, index) => (
        <NoteContainer key={index}>
          <NoteContent
            value={note}
            onChange={(e) => onNoteChange(index, e.target.value)}
            placeholder="메모를 입력하세요"
            maxLength={300} // 최대 글자수 300자 제한
          />
        </NoteContainer>
      ))}
      {notes.length < 4 && ( // 메모장이 4개 미만일 때만 추가 버튼 표시
        <AddNoteContainer onClick={onAddNote}>
          <AddNoteIcon>+</AddNoteIcon>
        </AddNoteContainer>
      )}
    </NoteRow>
  </InsightCardContainer>
);

const InsightSection = () => {
  const [activeTab, setActiveTab] = useState("insight");
  const [activeButton, setActiveButton] = useState("질문 순");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
        if (!storedToken) {
          throw new Error("토큰이 로컬 스토리지에 저장되어 있지 않습니다.");
        }

        const response = await axios.get(
          "/api/v1/users/me/survey/1/memo/list",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const data = response.data.data.questions.map((question) => ({
          questionId: question.questionId,
          questionOrder: question.questionOrder,
          title: question.title,
          notes: question.memos,
        }));
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "Network error"
        );
        setLoading(false);
      }
    };

    fetchMemos();
  }, []);

  const handleNoteChange = (questionIndex, noteIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].notes[noteIndex] = value;
    setQuestions(newQuestions);

    // 자동 저장
    saveMemos(newQuestions);
  };

  const handleAddNote = (questionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].notes.length < 4) {
      newQuestions[questionIndex].notes.push("");
      setQuestions(newQuestions);
      saveMemos(newQuestions);
    } else {
      alert("각 질문당 최대 4개의 메모만 추가할 수 있습니다.");
    }
  };

  const saveMemos = async (updatedQuestions) => {
    try {
      const storedToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
      if (!storedToken) {
        throw new Error("토큰이 로컬 스토리지에 저장되어 있지 않습니다.");
      }

      const requestBody = {
        questions: updatedQuestions
          .map((q) => ({
            questionId: q.questionId,
            questionOrder: q.questionOrder,
            memos: q.notes
              .filter((note) => note.trim() !== "") // 빈 메모 필터링
              .slice(0, 4), // 메모 개수를 최대 4개로 제한
          }))
          .filter((q) => q.memos.length > 0), // memos가 비어있지 않은 질문만 포함
      };

      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      const response = await axios.post(
        "/api/v1/users/me/survey/1/memo",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("메모 저장 성공:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("메모 저장 실패:", error.response.data);
        console.error("상태 코드:", error.response.status);
        console.error("헤더:", error.response.headers);
      } else {
        console.error("메모 저장 실패:", error.message);
      }
    }
  };

  return (
    <InsightContainer>
      <SectionTitleContainer>
        <SectionTitleWrapper>
          <SectionTitle
            $active={activeTab === "insight"}
            onClick={() => setActiveTab("insight")}
          >
            인사이트
          </SectionTitle>
          <SectionTitle
            $active={activeTab === "structure"}
            onClick={() => setActiveTab("structure")}
          >
            설문 구조도
          </SectionTitle>
        </SectionTitleWrapper>
      </SectionTitleContainer>

      <ButtonGroup>
        <Button
          $active={activeButton === "질문 순"}
          onClick={() => setActiveButton("질문 순")}
        >
          질문 순
        </Button>
        <Button
          $active={activeButton === "직접 나열"}
          onClick={() => setActiveButton("직접 나열")}
        >
          직접 나열
        </Button>
      </ButtonGroup>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        questions.map((question, questionIndex) => (
          <InsightCard
            key={question.questionId}
            questionNumber={question.questionOrder}
            questionText={question.title}
            notes={question.notes}
            onNoteChange={(noteIndex, value) =>
              handleNoteChange(questionIndex, noteIndex, value)
            }
            onAddNote={() => handleAddNote(questionIndex)}
          />
        ))
      )}
    </InsightContainer>
  );
};

export default InsightSection;
