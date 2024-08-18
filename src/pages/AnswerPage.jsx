// 목적: 사용자 답변 페이지 화면 구현
// 기능: 사용자 답변 페이지
// 2024.07.25/엠마/신윤지
// 추가되어야 할 기능: api 연결 후 카드 컴포넌트로 데이터 props 전달, 현재 진행하는 문제 번호 progress에 작성
import React from "react";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";
import SectionCard from "../components/answer/SectionCard";
import AnswerCard from "../components/answer/AnswerCard";

const Container = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  padding-bottom: 50px;
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

const Button = styled.input`
  display: block;
  text-align: center;
  padding: 24px 0;
  margin: auto;
  border: 0px;
  border-radius: 24px;
  font-size: 30px;
  color: white;
  background-color: #4c76fe;
`;

const AnswerPage = () => {
  return (
    <Container>
      <ProgressBar percentage="30%" />
      <Progress>
        <Current>3</Current>
        /10
      </Progress>
      <SectionCard />
      <AnswerCard type="radio" />
      <AnswerCard type="checkbox" />
      <AnswerCard type="text" />
      <Button value={"제출 하기"} />
    </Container>
  );
};

export default AnswerPage;
