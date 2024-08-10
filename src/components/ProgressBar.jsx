// 목적: 사용자 답변 페이지 중 상단 진행상황 바 구현
// 기능: 진행상황 바
// 2024.07.26/엠마/신윤지
import React from "react";
import styled from "styled-components";
import character from "../assets/logo1.png";

const ProgressContainer = styled.div`
  position: sticky;
  top: 0px;
  height: 12px;
  z-index: 10;
  background-color: #bfbfbf;
`;

const Progress = styled.div`
  position: relative;
  height: 100%;
  width: ${(props) => props.percentage};
  background-color: #4c76fe;
`;

const Current = styled.img`
  position: absolute;
  top: -12px;
  left: 96%;
  width: 36px;
`;

const ProgressBar = ({ percentage }) => {
  return (
    <ProgressContainer>
      <Progress percentage={percentage}>
        <Current src={character} />
      </Progress>
    </ProgressContainer>
  );
};

export default ProgressBar;
