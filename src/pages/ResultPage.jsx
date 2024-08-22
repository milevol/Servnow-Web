// ResultPage.jsx
// 목적: 결과페이지 (컴포넌트 합치기)
// 기능: 결과페이지 전체 화면
// 작성자: 임사랑
// 작성일: 2024.08.05

import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ResultMain from "../components/ResultMain";
import InsightSection from "../components/InsightSection";

// 결과 페이지 전체를 감싸는 컨테이너 스타일링 컴포넌트
const ResultPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f2f5ff;
  display: flex;
  justify-content: space-between;
  padding-top: 125px;
  padding-bottom: 50px;
  box-sizing: border-box;
  align-items: flex-start;
`;

// ResultMain 컴포넌트를 감싸는 컨테이너 스타일링 컴포넌트
const ResultMainContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

// ResultMain의 최대 너비를 제한하는 래퍼 스타일링 컴포넌트
const ResultMainWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`;

// 결과 페이지 컴포넌트 정의
const ResultPage = () => {
  const { id } = useParams(); // URL 파라미터에서 id가져오기

  return (
    <ResultPageContainer>
      {/* ResultMain 컴포넌트를 가운데 정렬 */}
      <ResultMainContainer>
        <ResultMainWrapper>
          <ResultMain surveyId={id} />
        </ResultMainWrapper>
      </ResultMainContainer>
      {/* InsightSection 컴포넌트를 오른쪽에 위치 */}
      <InsightSection surveyId={id} />
    </ResultPageContainer>
  );
};

export default ResultPage;
