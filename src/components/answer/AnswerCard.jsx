import styled from "styled-components";
import PropTypes from "prop-types";

//  prettier-ignore
const Container = styled.div`
  margin: 50px;
  padding: 50px 35px 25px 35px;
  background-color: white;
  border-radius: 24px;
  opacity: ${(props) => (props.disabled ? "50%" : "100%")};
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

const AnswerContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  div:has(input:checked) {
    background-color: #c6d3ff;
    border: 1px solid #4c76fe;
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
    background: url("../../../public/check.png") no-repeat 50%/20px;

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

const Text = styled.input``;

// 데이터 props로 받아와서 map 예정
// key/name = 문제 번호, id/value = 선택지명 혹은 선택지번호
const Answer = ({ type }) => {
  switch (type) {
    case "radio":
      // 객관식, 한 개 선택
      return (
        <AnswerContainer>
          <ChoiceContainer>
            <ChoiceInput type="radio" name="1" id="a" value="a" />
            <ChoiceLabel htmlFor="a">1번</ChoiceLabel>
          </ChoiceContainer>
          <ChoiceContainer>
            <ChoiceInput type="radio" name="1" id="b" value="b" />
            <ChoiceLabel htmlFor="b">2번</ChoiceLabel>
          </ChoiceContainer>
          <ChoiceContainer>
            <ChoiceInput type="radio" name="1" id="c" value="c" />
            <ChoiceLabel htmlFor="c">3번</ChoiceLabel>
          </ChoiceContainer>
          <ChoiceContainer>
            <ChoiceInput type="radio" name="1" id="d" value="d" />
            <ChoiceLabel htmlFor="d">4번</ChoiceLabel>
          </ChoiceContainer>
        </AnswerContainer>
      );

    case "checkbox":
      // 객관식, 여러 개 선택
      return (
        <AnswerContainer>
          <div />
        </AnswerContainer>
      );

    case "text":
      // 주관식
      return (
        <AnswerContainer>
          <Text />
        </AnswerContainer>
      );

    default:
      // error
      break;
  }
};

const AnswerCard = (props) => {
  return (
    // 현재 답변하고 있는 질문이 아닐 시 Container에 "disabled" props 전달
    <Container>
      <QuestionContainer>
        <QuestionTitle>
          <QuestionNumber>3.</QuestionNumber>
          질문 3의 내용이 들어갈 자리입니다.
        </QuestionTitle>
        <QuestionDescription>질문 3의 설명이 들어갈 내용입니다.</QuestionDescription>
      </QuestionContainer>
      <Answer type={props.type} />
    </Container>
  );
};

AnswerCard.propTypes = {
  type: PropTypes.string,
};

Answer.propTypes = {
  type: PropTypes.string,
};

export default AnswerCard;
