// 목적: 사용자 답변 페이지 중 섹션 카드 구현
// 기능: 사용자 답변 페이지 중 섹션 카드
// 2024.08.20/엠마/신윤지
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 50px 48px 50px;
  padding: 24px 32px;
  background-color: #c6d3ff;
  border-radius: 16px;
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 20%);
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

const SectionCard = (props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Desc>{props.desc}</Desc>
    </Container>
  );
};

export default SectionCard;
