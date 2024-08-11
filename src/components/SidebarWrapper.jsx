//목적: 꾸미기 구조도 사이드바를 화면에 표시해주기위한 컴포넌트
//기능: 사이드 div클릭하면 만들어둔 CustomizationSidebar
//2024.08.010 데이-이연

import React, { useState } from 'react';
import styled from 'styled-components';
import CustomizationSidebar from './CustomSidebar/CustomizationSidebar';

const CustomizationPanel = styled.div`
  position: fixed;
  top: 50px;
  right: -8px;
  display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')}; /* isOpen에 따라 display 속성 변경 */
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 170px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 834px;
  cursor: pointer;
  z-index: 997;
`;
const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const Title = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #000000;
  cursor: pointer;
  margin-left: 0.3rem;
  margin-right: 1rem;
`;
const SubTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #999999;
  cursor: pointer;
  margin-left: 1.7rem;
  margin-right: 0.5rem;
`;
const HorizontalLine = styled.div`
  width: 85px;
  height:2.5px;
  background: #000000;
  margin-bottom: 0px;
  margin-left: -20px; 
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 50px;
  right: ${({ isOpen }) => (isOpen ? '0' : '-815px')};
  transition: right 0.2s ease;
  height: 100%;
  z-index: 999;
`;

const Backdrop = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 998;
`;

const SidebarWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleBackdropClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <CustomizationPanel  isOpen={isOpen} onClick={toggleSidebar}>
        <TitleSection>
            <TitleContainer>
                <Title>꾸미기</Title>
                <SubTitle>구조도</SubTitle>
            </TitleContainer>
            <HorizontalLine></HorizontalLine>
        </TitleSection>
      </CustomizationPanel>
      <SidebarContainer isOpen={isOpen}>
        <CustomizationSidebar />
      </SidebarContainer>
      <Backdrop isOpen={isOpen} onClick={handleBackdropClick} />
    </>
  );
};

export default SidebarWrapper;