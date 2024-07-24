//목적: 로그인 버튼 클릭 시 작동할 로그인 폼기능 로직과 스타일을 담당
//기능: 사용자 로그인 정보 입력 검증 처리
//2024.07.21 데이-이연


import React from 'react';
import { useState } from 'react';
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


const LoginButton= styled.button`
  width: 90%;
  padding: 0.8rem;
  margin-top: 2rem;
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


const KakaoButton = styled.button`
  width: 80%;
  height: 50px;
  padding: 0.8rem;
  margin: 1.5rem 0;
  background-color: #fccf03;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  background-image: url('/images/kakao_logo.png');
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 40px;

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
const ErrorText = styled.p`
  font-size: 1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  color: red;

`;

const LoginForm = () => {

  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  //서버에서 회원 정보 가져오기
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if(!email ) {
      setEmailError('이메일을 입력해주세요.');
      hasError = true;
    } 
    else if(!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      setEmailError('');
      hasError = true;
    } else {
      setEmailError('');
      setPasswordError('');
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', 
        {email,
         password});
     //토큰을 로컬스토리지에 저장하기
     localStorage.setItem('token', response.data.token);
     alert('로그인에 성공하셨습니다.');
    }
    catch (err) {
      setError('! 유효하지 않은 이메일 또는 비밀번호 입니다.')
    }
  }
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <EmailText>이메일</EmailText>
          <Input 
            type="email" 
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <PasswordText>비밀번호</PasswordText>
          <Input 
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            {error &&<ErrorText>{error}</ErrorText>}
            {emailError &&<ErrorText>{emailError}</ErrorText>}
            {passwordError &&<ErrorText>{passwordError}</ErrorText>}
        </InputContainer>
       
        <LoginButton type='submit'>로그인</LoginButton>
      </form>
      <Link>회원가입</Link>
      
      <KakaoText>간편로그인</KakaoText>
      <KakaoButton>카카오 로그인</KakaoButton>
    </FormContainer>
  );
};

export default LoginForm;