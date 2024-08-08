// ResultPage.jsx
// 목적: 사용자의 설문 결과 인사이트를 표시하는 페이지 구현
// 기능: 결과 메인과 인사이트 부분을 렌더링
// 작성자: 임사랑
// 작성일: 2024.08.06

import React from "react";
import styled from "styled-components";
import InsightSection from "../components/InsightSection";
import ResultMain from "../components/ResultMain";

const ResultPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f2f5ff;
  display: flex;
  justify-content: flex-end;
  padding-top: 87px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1400px;
`;

const ResultMainWrapper = styled.div`
  margin-right: 20px;
`;

const ResultPage = () => {
  return (
    <ResultPageContainer>
      <ContentWrapper>
        <ResultMainWrapper>
          <ResultMain />
        </ResultMainWrapper>
        <InsightSection />
      </ContentWrapper>
    </ResultPageContainer>
  );
};

export default ResultPage;
