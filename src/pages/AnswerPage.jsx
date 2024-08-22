// 목적: 사용자 답변 페이지
// 기능: 사용자 답변 페이지 구현
// 2024.08.22/엠마/신윤지
// 추가 기능 : TODO 주석 참고
import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import TextAreaAutoSize from "react-textarea-autosize";
import ProgressBar from "../components/ProgressBar";
import SectionCard from "../components/answer/SectionCard";

const Container = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  padding-bottom: 50px;
  background-color: #f2f5ff;
`;

const Progress = styled.div`
  text-align: right;
  margin: 24px 70px 12px 0;
  font-size: 20px;
  color: #bfbfbf;
`;

const Current = styled.div`
  display: inline;
  color: #4c76fe;
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 102px;

  button {
    display: block;
    text-align: center;
    width: 12%;
    padding: 24px 0;
    border: 0px;
    border-radius: 18px;
    font-size: 24px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const PrevButton = styled.button`
  margin: 0 23px 0 0;
  background-color: #c5ccd5;
  color: #061522;
`;

const NextButton = styled.button`
  background-color: #4c76fe;
  color: white;
`;

const SubmitButton = styled.input`
  display: block;
  text-align: center;
  padding: 24px 12px;
  border: 0px;
  border-radius: 16px;
  font-size: 24px;
  color: white;
  background-color: #4c76fe;

  &:hover {
    cursor: pointer;
  }
`;

const AnswerCardContainer = styled.div`
  margin: 24px 50px 36px 50px;
  padding: 32px 32px 8px 32px;
  background-color: white;
  border-radius: 24px;
  opacity: ${(props) => (props.disabled ? "50%" : "100%")};
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 10%);
`;

const QuestionContainer = styled.div``;

const QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  color: #061522;
  font-size: 24px;
  font-weight: bold;
  font-family: "Pretendard Bold";
`;

const QuestionNumber = styled.span`
  color: #4c76fe;
  font-size: 32px;
  margin: 0 8px 0 0;
  font-family: "Pretendard Bold";
`;

const QuestionDescription = styled.div`
  color: #5d6670;
  font-size: 16px;
  font-weight: normal;
  margin-top: 24px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  div:has(input:checked) {
    background-color: #c6d3ff;
    border: 1px solid #4c76fe;
  }

  textarea {
    width: 100%;
    margin-top: 32px;
    padding: 16px 8px;
    border: 0px;
    border-bottom: 6px solid #e1e8ff;
    font-family: "Pretendard Thin";
    font-size: 20px;
    color: #5d6670;
    outline: none;
    resize: none;
  }
`;

const ChoiceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f2f5ff;
  margin: 12px 0;
  padding: 16px 8px;
  border: 1px solid #f2f5ff;
  border-radius: 8px;
  transition: all 0.05s ease-in-out;
`;

const ChoiceInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  margin: 0 8px 0 4px;
  border: 3px solid #c5ccd5;
  border-radius: 36px;

  &:checked {
    border: 3px solid #4c76fe;
    background: url("/check.png") no-repeat 50%/20px;

    &:after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
`;

const ChoiceLabel = styled.label`
  font-family: "Pretendard Bold";
  font-size: 16px;
  color: #5d6670;
`;

const Answer = ({ type, answers, name, setNextSection, setSavedAnswer, savedAnswer }) => {
  const handleChange = (e, nextSectionNo) => {
    const { value, checked } = e.target;

    let updatedAnswers = [...savedAnswer];
    if (type === "radio") {
      updatedAnswers = [value];
    } else if (type === "checkbox") {
      if (checked) {
        if (!updatedAnswers.includes(value)) {
          updatedAnswers.push(value);
        }
      } else {
        updatedAnswers = updatedAnswers.filter((i) => i !== value);
        console.log("??" + updatedAnswers);
      }
    } else {
      updatedAnswers = [value];
    }

    setSavedAnswer(updatedAnswers);
    setNextSection(nextSectionNo);
  };

  switch (type) {
    case "radio":
      return (
        <AnswerContainer>
          {answers.map((a, index) => (
            <ChoiceContainer key={index}>
              <ChoiceInput
                type="radio"
                name={name}
                id={a.answerContent}
                value={index}
                checked={savedAnswer.includes(index.toString())}
                onChange={(e) => handleChange(e, a.nextSectionNo)}
              />
              <ChoiceLabel htmlFor={a.answerContent}>{a.answerContent}</ChoiceLabel>
            </ChoiceContainer>
          ))}
        </AnswerContainer>
      );

    case "checkbox":
      return (
        <AnswerContainer>
          {answers.map((a, index) => {
            const tempA = savedAnswer.length > 0 ? savedAnswer[0] : [];

            return (
              <ChoiceContainer key={index}>
                <ChoiceInput
                  type="checkbox"
                  name={name}
                  id={a.answerContent}
                  value={index}
                  checked={tempA.includes(index.toString())}
                  onChange={(e) => handleChange(e, a.nextSectionNo)}
                />
                <ChoiceLabel htmlFor={a.answerContent}>{a.answerContent}</ChoiceLabel>
              </ChoiceContainer>
            );
          })}
        </AnswerContainer>
      );

    case "text":
      console.log(savedAnswer);
      return (
        <AnswerContainer>
          <TextAreaAutoSize cacheMeasurements name={name} value={savedAnswer} onChange={(e) => handleChange(e, null)} />
        </AnswerContainer>
      );

    default:
      return null;
  }
};

const AnswerPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  // 현재 섹션 페이지
  const [sectionPage, setSectionPage] = useState(1);
  // 이동한 섹션 페이지들을 순차적으로 저장, index를 사용해 이동
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sectionList, setSectionList] = useState([]);
  const [nextSection, setNextSection] = useState(null);
  // 데이터 받아온 거 저장
  const [data, setData] = useState({});
  const [savedAnswer, setSavedAnswer] = useState([]);
  // TODO : essential 여부에 따라 막는 거
  // const [isNextDisabled, setIsNextDisabled] = useState(true);
  // const [isFilled, setIsFilled] = useState({});
  // 답변 보낼 때 쓸 거
  const [response, setResponse] = useState();
  const formRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [ref, inView] = useInView({
    // 0.8 이상 보일 때 delay 이후 실행
    threshold: 0.8,
    delay: 100,
  });

  const getSectionData = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : sessionStorage.getItem("accessToken");

      const res = await (isLoggedIn
        ? axios.get(`/api/v1/survey/1/sections/${sectionPage}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : axios.get(`/api/v1/survey/guest/1/sections/${sectionPage}`, {}));
      setData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [sectionPage, isLoggedIn]);

  const postAnswer = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

      const allAnswers = [];

      for (let i = 0; i < sectionList.length; i++) {
        const savedData = JSON.parse(localStorage.getItem(sectionList[i] || {}) || {});

        for (const [questionId, answer] of Object.entries(savedData)) {
          // console.log(answer);
          // value === object, 즉 checkbox
          if (answer !== null) {
            if (typeof answer === "object") {
              for (let i = 0; i < answer.length; i++) {
                allAnswers.push({
                  question_id: parseInt(questionId),
                  multipleChoiceId: parseInt(answer[i]),
                  subjective_result_content: null,
                });
              }
            } // parseInt 했을 때 NaN이 아니다, 즉 choice
            else if (!isNaN(parseInt(answer))) {
              allAnswers.push({
                question_id: parseInt(questionId),
                multipleChoiceId: parseInt(answer),
                subjective_result_content: null,
              });
            } // parseInt 했을 때 NaN이다, 즉 text
            else {
              allAnswers.push({
                question_id: parseInt(questionId),
                multipleChoiceId: null,
                subjective_result_content: answer,
              });
            }
          }
        }
      }

      let requestBody = {};
      if (isLoggedIn) {
        requestBody = {
          answers: allAnswers,
        };
      } else {
        requestBody = {
          email: "email@a.com",
          answers: allAnswers,
        };
      }
      console.log(JSON.stringify(requestBody, null, 2));

      const res = await (isLoggedIn
        ? axios.post(`/api/v1/result/${id}`, requestBody, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        : axios.post(`/api/v1/result/guest/1`, requestBody, {
            headers: {
              "Content-Type": "application/json",
            },
          }));
      // setData(res.data);
      // setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getType = (type, isDuplicate) => {
    if (type !== "MULTIPLE_CHOICE") return "text";
    return isDuplicate ? "checkbox" : "radio";
  };

  useEffect(() => {
    // 로그인 여부에 따라 fetch url 등 변경
    getSectionData();
  }, [sectionPage, isLoggedIn]);

  useEffect(() => {
    if (sectionIndex >= sectionList.length) {
      // 다음 버튼 클릭 시: sectionList에 현재 페이지 추가
      setSectionList((prevList) => [...prevList, sectionPage]);
    }
  }, [sectionPage]);

  useEffect(() => {
    if (!inView) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [inView]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(sectionPage)) || {};
    setSavedAnswer(Object.values(savedData));
    setNextSection(null);
  }, [sectionPage]);

  const saveTemporary = () => {
    if (formRef.current) {
      const formElements = formRef.current.elements;
      const data = {};

      for (const element of formElements) {
        if (element.type === "checkbox") {
          if (!data[element.name]) {
            data[element.name] = [];
          }
          if (element.checked) {
            data[element.name].push(element.value);
          }
        } else {
          data[element.name] = element.value;
        }
      }

      localStorage.setItem(sectionPage, JSON.stringify(data));
    }
  };

  const onPrevClick = () => {
    saveTemporary();
    if (sectionIndex > 0) {
      const prevIndex = sectionIndex - 1;
      const prevSection = sectionList[prevIndex];
      setSectionPage(prevSection);
      setSectionIndex(prevIndex);
    }
  };

  const onNextClick = () => {
    saveTemporary();

    if (nextSection) {
      setSectionList((prevList) => {
        const updatedList = [...prevList];
        updatedList[sectionIndex + 1] = nextSection;
        return updatedList;
      });
      setSectionPage(nextSection);
      setSectionIndex((prevIndex) => prevIndex + 1);
    } else {
      const newSection = sectionPage + 1;
      setSectionList((prevList) => {
        const updatedList = [...prevList];
        updatedList[sectionIndex + 1] = newSection;
        return updatedList;
      });
      setSectionPage(newSection);
      setSectionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onSubmit = () => {
    saveTemporary();
    postAnswer();
  };

  return (
    <Container>
      {isLoading ? (
        <></>
      ) : (
        <>
          <ProgressBar percentage={Math.round((data.sectionOrder / data.sectionTotalCount) * 100) + "%"} />
          <Progress>
            <Current>{data.sectionOrder}</Current>/{data.sectionTotalCount}
          </Progress>
          <SectionCard title={data.sectionTitle} desc={data.sectionContent} />
          <form ref={formRef}>
            {data.questions.map((q) => (
              // 현재 답변하고 있는 질문이 아닐 시 Container에 "disabled" props 전달
              <AnswerCardContainer key={q.questionId} ref={ref} disabled={disabled}>
                <QuestionContainer>
                  <QuestionTitle>
                    <QuestionNumber>{q.questionOrder}.</QuestionNumber>
                    {q.questionTitle}
                  </QuestionTitle>
                  <QuestionDescription>{q.questionContent}</QuestionDescription>
                </QuestionContainer>
                <Answer
                  type={getType(q.questionType, q.isDuplicate)}
                  answers={q.answers}
                  name={q.questionId}
                  setNextSection={setNextSection}
                  setSavedAnswer={setSavedAnswer}
                  savedAnswer={savedAnswer}
                />
              </AnswerCardContainer>
            ))}
          </form>
          <ButtonWrapper>
            {sectionPage === data.sectionTotalCount ? (
              <>
                <PrevButton onClick={onPrevClick}>이전</PrevButton>
                <SubmitButton value={"제출 하기"} onClick={onSubmit} />
              </>
            ) : (
              <>
                {sectionPage !== 1 && <PrevButton onClick={onPrevClick}>이전</PrevButton>}
                <NextButton onClick={onNextClick}>다음</NextButton>
              </>
            )}
          </ButtonWrapper>
        </>
      )}
    </Container>
  );
};

export default AnswerPage;
