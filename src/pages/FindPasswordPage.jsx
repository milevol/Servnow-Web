//목적: 비밀번호 찾기 시 작동할 비밀번호 찾기 레이아웃 화면 스타일 담당
//기능: 사용자 이메일 검증 및 비밀번호 찾기 기능
//2024.07.25 데이-이연

import React from 'react';
import styled from 'styled-components';
import FindPasswordForm from '../components/login/FindPasswordForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #4C76FE 50%, #f0f2f5 50%);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 2rem;
  font-size: 35px;
`;

const WelcomeText = styled.p`
  margin-bottom: 3rem; 
  color: white;
  font-size: 22px;
`;

const FindPasswordPage = () => {
  return (
    <Container>
      <Content>
        <Title>비밀번호 찾기</Title>
        <WelcomeText>이메일을 입력해주세요</WelcomeText>
        <FindPasswordForm />
      </Content>
    </Container>
  );
};


export default FindPasswordPage;
