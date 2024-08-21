import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

const ReorderButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: 0 5px;
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
  cursor: grab;
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
  index,
  moveCard,
  isDirectlyOrdered,
}) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDirectlyOrdered, // 직접 나열일 때만 드래그 가능
  });

  if (isDirectlyOrdered) {
    drag(drop(ref));
  }

  return (
    <InsightCardContainer ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
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
              value={note.content}
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
};

const InsightSection = ({ isActivated }) => {
  const [activeTab, setActiveTab] = useState("insight");
  const [activeButton, setActiveButton] = useState("질문 순");
  const [questions, setQuestions] = useState([]);
  const [reorderedQuestions, setReorderedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemos();
  }, [isActivated]);

  const fetchMemos = async () => {
    try {
      const token = isActivated
        ? localStorage.getItem("accessToken")
        : sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("토큰이 저장되어 있지 않습니다.");
      }

      const response = await axios.get("/api/v1/users/me/survey/1/memo/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data.questions.map((question) => ({
        questionId: question.questionId,
        questionOrder: question.questionOrder,
        title: question.title,
        notes: question.memos.map((memo) => {
          const [id, content] = Object.entries(memo)[0];
          return { id, content };
        }),
      }));

      setQuestions(data);

      // "직접 나열"이 선택된 상태에서 로컬 스토리지에 저장된 순서를 반영
      if (activeButton === "직접 나열") {
        const savedOrder = JSON.parse(localStorage.getItem("questionOrder"));
        if (savedOrder) {
          const orderedData = savedOrder.map((orderId) =>
            data.find((q) => q.questionId === orderId)
          );
          setReorderedQuestions(orderedData);
        } else {
          setReorderedQuestions(data);
        }
      } else {
        setReorderedQuestions(data);
      }

      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : "Network error");
      setLoading(false);
    }
  };

  const handleNoteChange = (questionIndex, noteIndex, value) => {
    const newQuestions = [...reorderedQuestions]; // reorderedQuestions에서 가져옴
    newQuestions[questionIndex].notes[noteIndex].content = value;
    setReorderedQuestions(newQuestions);
    saveMemos(newQuestions);
  };

  const handleAddNote = (questionIndex) => {
    const newQuestions = [...reorderedQuestions]; // reorderedQuestions에서 가져옴
    if (newQuestions[questionIndex].notes.length < 4) {
      newQuestions[questionIndex].notes.push({ id: null, content: "" });
      setReorderedQuestions(newQuestions);
      saveMemos(newQuestions);
    } else {
      alert("각 질문당 최대 4개의 메모만 추가할 수 있습니다.");
    }
  };

  const saveMemos = async (updatedQuestions) => {
    try {
      const token = isActivated
        ? localStorage.getItem("accessToken")
        : sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("토큰이 저장되어 있지 않습니다.");
      }

      const requestBody = {
        questions: updatedQuestions
          .map((q) => ({
            questionId: q.questionId,
            questionOrder: q.questionOrder,
            memos: q.notes
              .filter((note) => note.content.trim() !== "")
              .slice(0, 4)
              .reduce((acc, note) => {
                acc[note.id] = note.content;
                return acc;
              }, {}),
          }))
          .filter((q) => Object.keys(q.memos).length > 0),
      };

      const response = await axios.post(
        "/api/v1/users/me/survey/1/memo",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const moveCard = (dragIndex, hoverIndex) => {
    const newOrder = [...reorderedQuestions];
    const [draggedItem] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedItem);
    setReorderedQuestions(newOrder);

    // 로컬 스토리지에 순서 저장
    const orderIds = newOrder.map((q) => q.questionId);
    localStorage.setItem("questionOrder", JSON.stringify(orderIds));
  };

  useEffect(() => {
    if (activeButton === "질문 순") {
      setReorderedQuestions([...questions]); // 질문 순으로 돌아갔을 때 원래 순서로 복원
    } else {
      const savedOrder = JSON.parse(localStorage.getItem("questionOrder"));
      if (savedOrder) {
        const orderedData = savedOrder.map((orderId) =>
          questions.find((q) => q.questionId === orderId)
        );
        setReorderedQuestions(orderedData);
      } else {
        setReorderedQuestions([...questions]);
      }
    }
  }, [activeButton, questions]);

  const displayQuestions =
    activeButton === "질문 순" ? questions : reorderedQuestions;

  return (
    <DndProvider backend={HTML5Backend}>
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
          displayQuestions.map((question, index) => (
            <InsightCard
              key={question.questionId}
              index={index}
              questionNumber={
                activeButton === "질문 순" ? question.questionOrder : index + 1
              }
              questionText={question.title}
              notes={question.notes}
              onNoteChange={(noteIndex, value) =>
                handleNoteChange(index, noteIndex, value)
              }
              onAddNote={() => handleAddNote(index)}
              moveCard={moveCard}
              isDirectlyOrdered={activeButton === "직접 나열"} // 직접 나열일 때만 드래그 가능
            />
          ))
        )}
      </InsightContainer>
    </DndProvider>
  );
};

export default InsightSection;
