import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ResultStructureDiagram from "./CustomSidebar/ResultStructureDiagram"; // **설문 구조도 임포트 자리**

const InsightContainer = styled.div`
  width: 565px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 0px 0px 10px;
  padding: 20px;
  position: relative;
  display: block;
  flex-shrink: 0;
  align-self: flex-start;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
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
  margin: 10px 0 20px 0;
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
  padding: 1px 0;
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

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #4c76fe;
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    color: #4c76fe;
    transform: scale(1.2);
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
  position: relative;
  overflow: hidden;

  &:hover ${DeleteButton} {
    opacity: 1;
  }
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
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
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
  cursor: ${(props) => (props.isDirectlyOrdered ? "grab" : "default")};
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

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const SaveButton = styled.button`
  background-color: #4c76fe;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #365bb7;
  }
`;

const InsightCard = ({
  questionNumber,
  questionText,
  notes,
  onNoteChange,
  onAddNote,
  onDeleteNote,
  onSave,
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
    canDrag: isDirectlyOrdered,
  });

  if (isDirectlyOrdered) {
    drag(drop(ref));
  }

  return (
    <InsightCardContainer
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      isDirectlyOrdered={isDirectlyOrdered}
    >
      <QuestionContainer>
        <QuestionText>
          <QuestionNumber>{questionNumber}</QuestionNumber>
          <QuestionContent>{questionText}</QuestionContent>
        </QuestionText>
      </QuestionContainer>
      <NoteRow>
        {notes.map((note, noteIndex) => (
          <NoteContainer key={noteIndex}>
            <NoteContent
              value={note.content}
              onChange={(e) => onNoteChange(index, noteIndex, e.target.value)}
              placeholder="메모를 입력하세요"
              maxLength={300}
            />
            <DeleteButton
              onClick={() => onDeleteNote(index, noteIndex, note.id)}
            >
              x
            </DeleteButton>
          </NoteContainer>
        ))}
        {notes.length < 4 && (
          <AddNoteContainer onClick={() => onAddNote(index)}>
            <AddNoteIcon>+</AddNoteIcon>
          </AddNoteContainer>
        )}
      </NoteRow>
      <SaveButtonContainer>
        <SaveButton onClick={() => onSave(index)}>저장</SaveButton>
      </SaveButtonContainer>
    </InsightCardContainer>
  );
};

const InsightSection = ({ surveyId }) => {
  const [activeTab, setActiveTab] = useState("insight");
  const [activeButton, setActiveButton] = useState("질문 순");
  const [questions, setQuestions] = useState([]);
  const [reorderedQuestions, setReorderedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemos();
  }, [surveyId]);

  const fetchMemos = async () => {
    try {
      const token = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `/api/v1/users/me/survey/${surveyId}/memo/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      setReorderedQuestions(data);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : "Network error");
      setLoading(false);
    }
  };

  const handleNoteChange = (questionIndex, noteIndex, value) => {
    const newQuestions = [...reorderedQuestions];
    newQuestions[questionIndex].notes[noteIndex].content = value;
    setReorderedQuestions(newQuestions);

    localStorage.setItem("tempMemos", JSON.stringify(newQuestions));
  };

  const handleAddNote = (questionIndex) => {
    const newQuestions = [...reorderedQuestions];
    if (newQuestions[questionIndex].notes.length < 4) {
      newQuestions[questionIndex].notes.push({ id: null, content: "" });
      setReorderedQuestions(newQuestions);
      localStorage.setItem("tempMemos", JSON.stringify(newQuestions));
    } else {
      alert("각 질문당 최대 4개의 메모만 추가할 수 있습니다.");
    }
  };

  const handleDeleteNote = async (questionIndex, noteIndex, noteId) => {
    if (!noteId) {
      const newQuestions = [...reorderedQuestions];
      newQuestions[questionIndex].notes.splice(noteIndex, 1);
      setReorderedQuestions(newQuestions);
      localStorage.setItem("tempMemos", JSON.stringify(newQuestions));
      return;
    }

    try {
      const token = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("토큰이 저장되어 있지 않습니다.");
      }

      await axios.delete(`/api/v1/users/me/survey/${noteId}/memo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newQuestions = [...reorderedQuestions];
      newQuestions[questionIndex].notes.splice(noteIndex, 1);
      setReorderedQuestions(newQuestions);
      localStorage.setItem("tempMemos", JSON.stringify(newQuestions));

      console.log("메모 삭제 성공:", noteId);
    } catch (error) {
      console.error("메모 삭제 실패:", error.message);
    }
  };

  const saveMemos = async (questionIndex) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("토큰이 저장되어 있지 않습니다.");
      }

      const updatedQuestion = reorderedQuestions[questionIndex];

      const newMemos = updatedQuestion.notes
        .filter((note) => note.id === null && note.content.trim() !== "")
        .map((note) => note.content);

      if (newMemos.length === 0) {
        console.log("새로운 메모가 없어서 저장하지 않습니다.");
        setLoading(false);
        return;
      }

      const requestBody = {
        questions: [
          {
            questionId: updatedQuestion.questionId,
            questionOrder: updatedQuestion.questionOrder,
            memos: newMemos,
          },
        ],
      };

      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      const response = await axios.post(
        `/api/v1/users/me/survey/${surveyId}/memo`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("메모 저장 성공:", response.data);

      await fetchMemos();

      localStorage.removeItem("tempMemos");
    } catch (error) {
      if (error.response) {
        console.error("메모 저장 실패:", error.response.data);
        console.error("상태 코드:", error.response.status);
        console.error("헤더:", error.response.headers);
      } else {
        console.error("메모 저장 실패:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateMemos = async (questionIndex) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("토큰이 저장되어 있지 않습니다.");
      }

      const updatedQuestion = reorderedQuestions[questionIndex];

      const modifiedMemos = updatedQuestion.notes
        .filter((note) => note.id !== null && note.content.trim() !== "")
        .map((note) => ({ id: note.id, content: note.content }));

      if (modifiedMemos.length === 0) {
        console.log("수정된 메모가 없어서 업데이트하지 않습니다.");
        setLoading(false);
        return;
      }

      const requestBody = {
        memos: modifiedMemos,
      };

      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      const response = await axios.patch(
        `/api/v1/users/me/survey/memo`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("메모 수정 성공:", response.data);

      await fetchMemos();

      localStorage.removeItem("tempMemos");
    } catch (error) {
      if (error.response) {
        console.error("메모 수정 실패:", error.response.data);
        console.error("상태 코드:", error.response.status);
        console.error("헤더:", error.response.headers);
      } else {
        console.error("메모 수정 실패:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const newOrder = [...reorderedQuestions];
    const [draggedItem] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedItem);
    setReorderedQuestions(newOrder);

    const orderIds = newOrder.map((q) => q.questionId);
    localStorage.setItem("questionOrder", JSON.stringify(orderIds));
  };

  useEffect(() => {
    if (activeButton === "질문 순") {
      setReorderedQuestions([...questions]);
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
        <InnerContainer>
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

          {activeTab === "insight" ? (
            <>
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
                      activeButton === "질문 순"
                        ? question.questionOrder
                        : index + 1
                    }
                    questionText={question.title}
                    notes={question.notes}
                    onNoteChange={handleNoteChange}
                    onAddNote={handleAddNote}
                    onDeleteNote={handleDeleteNote}
                    onSave={() => {
                      saveMemos(index);
                      updateMemos(index);
                    }}
                    moveCard={moveCard}
                    isDirectlyOrdered={activeButton === "직접 나열"}
                  />
                ))
              )}
            </>
          ) : (
            <ResultStructureDiagram />
          )}
        </InnerContainer>
      </InsightContainer>
    </DndProvider>
  );
};

export default InsightSection;
