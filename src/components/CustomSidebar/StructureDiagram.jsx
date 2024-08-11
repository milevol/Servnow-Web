//목적: 꾸미기 구조도 사이드바의 구조도 컴포넌트 담당
//기능: 제작된 설문지의 구조를 보여줌
//2024.08.10 데이-이연
//

import React from 'react';
import styled from 'styled-components';

const StructureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Node = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  margin: 10px;
  background-color: #E1E7FD;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  color: #6683FD;
`;

const VerticalLine = styled.div`
  width: 2px;
  height: 20px;
  background-color: #ccc;
  margin: -10px 0;
`;

const DashedLine = styled.div`
  width: 2px;
  height: 20px;
  border-left: 1px dashed #ccc;
  margin: -10px 0;
`;

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
`;

const StructureDiagram = () => {
  return (
    <StructureContainer>
      <Node>메인</Node>
      <VerticalLine />
      <Node>질문의 내용이 들어갈 자리입니다.</Node>
      <VerticalLine />
      <Node>질문의 내용이 들어갈 자리입니다.</Node>
      <HorizontalContainer>
        <div>
          <DashedLine />
          <Node>섹션 2</Node>
        </div>
        <div>
          <DashedLine />
          <Node>섹션 3</Node>
          <VerticalLine />
          <Node>섹션 5</Node>
        </div>
        <div>
          <DashedLine />
          <Node>섹션 4</Node>
        </div>
      </HorizontalContainer>
    </StructureContainer>
  );
};

export default StructureDiagram;