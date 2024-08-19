// 목적: 사용자 답변 페이지 중 섹션 카드 구현
// 기능: 사용자 답변 페이지 중 섹션 카드
// 2024.08.11/엠마/신윤지
// 추가되어야 할 기능: api 연결 후 받아온 데이터 연결
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px 50px 50px 50px;
  padding: 32px 35px;
  background-color: #c6d3ff;
  border-radius: 16px;
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 20%);
`;

const Title = styled.div`
  font-family: "Pretendard Bold";
  font-size: 24px;
  color: #061522;
  margin-bottom: 12px;
`;

const Desc = styled.div`
  font-size: 16px;
  color: #5d6670;
`;

const SectionCard = () => {
  return (
    <Container>
      <Title>섹션 1 제목이 들어갈 자리입니다.</Title>
      <Desc>섹션 1 내용이 들어갈 자리입니다.</Desc>
    </Container>
  );
};

export default SectionCard;
