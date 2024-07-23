//목적: 로그인 버튼 클릭 시 작동할 로그인 폼기능 로직과 스타일을 담당
//기능: 사용자 로그인 정보 입력 검증 처리
//2024.07.21 데이-이연


import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 500px;
  height: 600px;
  padding: 2rem;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0.1, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Input = styled.input`
  width: 400px;
  height: 50;
  padding: 0.8rem;
  margin: 1rem 0 0e.5rem 0;
  border: 3px solid #c2e0f2;
  border-radius: 4px;
  font-size: 1.2rem;
`;


const Button1 = styled.button`
  width: 90%;
  padding: 0.8rem;
  margin-top: 4rem;
  background-color: #236ffc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #1c86ee;
  }
`;


const Button2 = styled.button`
  width: 90%;
  padding: 0.8rem;
  margin: 1.5rem 0;
  background-color: #fccf03;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #ebc415;
  }
`;

const Link = styled.a`
  display: block;
  margin: 1em 0 0 0;
  color: #1e90ff;
  cursor: pointer;
  font-size: 1.3rem;
`;
const KakaoText = styled.p`
  font-size: 1.2rem;
  margin-top: 3rem;
`
const EmailText = styled.p`
  font-size: 1.2rem;
  margin-top: 3rem;
  margin-bottom: 0.8rem;
`
const PasswordText = styled.p`
  font-size: 1.2rem;
  margin-top: 2.3rem;
  margin-bottom: 0.8rem;

`
const LoginForm = () => {
  return (
    <FormContainer>

      <InputContainer>
        <EmailText>이메일</EmailText>
        <Input type="email" placeholder="이메일을 입력해주세요." />
      </InputContainer>
      <InputContainer>
        <PasswordText>비밀번호</PasswordText>
        <Input type="password" placeholder="비밀번호를 입력해주세요." />
      </InputContainer>
      <Button1>로그인</Button1>
      <Link>회원가입</Link>
      
      <KakaoText>간편로그인</KakaoText>
      <Button2>카카오로 로그인</Button2>
    </FormContainer>
  );
};

export default LoginForm;