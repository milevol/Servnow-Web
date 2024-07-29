// 목적: 사용자 답변 페이지 화면 구현
// 기능: 사용자 답변 페이지
// 2024.07.25/엠마/신윤지
// 추가되어야 할 기능: api 연결 후 카드 컴포넌트로 데이터 props 전달, 현재 진행하는 문제 번호 progress에 작성
import React from "react";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";
import AnswerCard from "../components/answer/AnswerCard";

const Container = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background-color: #f2f5ff;
`;

const Progress = styled.div`
  text-align: right;
  margin: 30px 70px 20px 0;
  font-size: 20px;
  color: #bfbfbf;
`;

const Current = styled.div`
  display: inline;
  color: #4c76fe;
`;

const AnswerPage = () => {
  return (
    <Container>
      <ProgressBar percentage="30%" />
      <Progress>
        <Current>3</Current>
        /10
      </Progress>
      <AnswerCard type="radio" />
      <AnswerCard type="checkbox" />
      <AnswerCard type="text" />
    </Container>
  );
};

export default AnswerPage;
