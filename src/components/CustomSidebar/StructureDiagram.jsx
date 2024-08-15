//목적: 꾸미기 구조도 사이드바의 구조도 컴포넌트 담당
//기능: 제작된 설문지의 구조를 보여줌
//2024.08.10 데이-이연
import React from 'react';
import styled from 'styled-components';

const StructureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const MainNode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 177px;
  height: 64px;
  margin: 0 10px;
  background-color: #8EA9FF;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  color: #5D6670;
`;

const QuestionNode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 272px;
  height: 64px;
  margin: 0 10px;
  background-color: #C6D3FF;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  color: #5D6670;
`;

const SectionNodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SectionNode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 177px;
  height: 64px;
  margin: 0 25px;
  background-color: #E1E8FF;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  color: #5D6670;

`;

const VerticalLineContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerticalLine = styled.div`
  position: relative;
  width: 2px;
  height: 45px;
  border-left: 2px dashed #8F9AA4;
  margin-bottom: 15px;
  margin-top: 3px;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: -6px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 9px solid #8F9AA4;
  }
`;

const HorizontalDashedLineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 450px;  
  position: relative;
`;

const HorizontalDashedLine = styled.div`
  width: 100%;
  height: 2px;
  border-top: 2px dashed #8F9AA4;
  position: absolute;
  top: -35PX;
  transform: translateY(-50%);
`;

const VerticalLineSmallOne = styled.div`
  width: 2px;
  height: 20px;
  border-left: 2px dashed #8F9AA4;
  position: absolute;
  top: -35px;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px; /* 화살표 위치 조정 */
    left: -6px; /* 화살표를 수직선 중앙에 맞추기 위해 조정 */
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 9px solid #8F9AA4; /* 화살표 색상 */
  }
`;
const VerticalLineSmallTwo = styled.div`
  width: 2px;
  height: 20px;
  border-left: 2px dashed #8F9AA4;
  position: absolute;
  left: 449px;
  top: -35px;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px; /* 화살표 위치 조정 */
    left: -6px; /* 화살표를 수직선 중앙에 맞추기 위해 조정 */
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 9px solid #8F9AA4; /* 화살표 색상 */
  }
`;

const StructureDiagram = () => {
  return (
    <StructureContainer>
      <MainNode>메인</MainNode>
      <VerticalLine />
      <QuestionNode>질문의 내용이 들어갈 자리입니다.</QuestionNode>
      <VerticalLine />
      <QuestionNode>질문의 내용이 들어갈 자리입니다.</QuestionNode>
      <VerticalLineContainer>
        <VerticalLine /> 
        <HorizontalDashedLineContainer>
          <VerticalLineSmallOne />
          <HorizontalDashedLine />
          <VerticalLineSmallTwo />
        </HorizontalDashedLineContainer>
      </VerticalLineContainer>
      <SectionNodeContainer>
        <SectionNode>섹션 2</SectionNode>
        <SectionNode>섹션 3</SectionNode>
        <SectionNode>섹션 4</SectionNode>
      </SectionNodeContainer>
      <VerticalLine />
      <SectionNodeContainer>
        <SectionNode>섹션 5</SectionNode>
      </SectionNodeContainer>
    </StructureContainer>
  );
};

export default StructureDiagram;