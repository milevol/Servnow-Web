//목적: 로그인 버튼 클릭 시 작동할 로그인페이지 레이아웃 화면을 담당
//기능: 사용자 로그인 정보 입력
//2024.07.21 데이-이연

import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/login/LoginForm'; // 파일 경로와 default export 확인

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
  margin-bottom: 1rem;
  font-size: 35px;
`;

const WelcomeText = styled.p`
  margin-bottom: 3rem; 
  color: white;
  font-size: 1.1rem;
`;

const LoginPage = () => {
  return (
    <Container>
      <Content>
        <Title>로그인</Title>
        <WelcomeText>서브나우에 오신 것을 환영합니다.</WelcomeText>
        <LoginForm />
      </Content>
    </Container>
  );
};


export default LoginPage;
