//목적: 비밀번호 찾기 클릭 시 작동할 비밀번호 변경 폼기능 로직과 스타일을 담당
//기능: 사용자 이메일 검증 및 비밀번호 변경 기능
//2024.07.25 데이-이연
//더 필요한기능: api연결, 비밀번호 검증

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  width: 800px;
  padding: 2rem;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0.1, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
  margin-left:0px;
  width: 700px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%
`;
const InputText = styled.p`
  font-size: 1.1rem;
  margin-right: 1rem;
  color: #5D6670;
  width:20%;
  text-align: left;
`
const Input = styled.input`
  width: 23rem;
  padding: 0.8rem;
  border: 3px solid #c2e0f2;
  border-radius: 8px;
  font-size: 1rem;
`;

const SendButton = styled.button`
  width: 18%;
  padding: 0.8rem 0;
  background-color: #011b6c;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 1rem;
  font-weight: bold;
  `

const FindButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 5rem;
  margin-bottom: 2rem;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  &:hover {
    background-color: #4b6bd1;
  }
`;

const ErrorText = styled.p`
  font-size: 1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  color: red;

`;
const Password = styled.p`
  font-size: 1.2rem;
  margin-top: 2rem;
  font-weight: bold;
`

const Line = styled.hr`
  width: 80%;
  border:none;
  border-top: 1px solid #c2e0f2;
  margin: 4rem;
`

const FindPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [certificationCode, setCertificationCode] = useState('');
  const [validNumber, setValidNumber] = useState('');

//인증번호 전송 버튼 클릭 시 작동할 기능
  const handleVerificationSend = async () => {
    if(!email) {
      alert('이메일을 입력해주세요.');
      setError('');
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/api/send-verification-code', { email });
      
      if (response.data.success) {
        setVerificationSent(true);
        setCertificationCode(response.data.certificationCode)
        alert('인증번호가 이메일로 전송되었습니다.');

      } else {
        alert('이메일 전송에 실패했습니다.');
        setVerificationSent(false);
      } 
    } catch (err) {
      alert('등록되지 않은 이메일입니다.')
      setVerificationSent(false);
    }
  };
//비밀번호 변경 버튼 클릭시 작동 기능
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationSent) {
      alert('먼저 이메일을 인증을 진행해주세요')
      return;
    }
    if (!certificationCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    if(password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if(validNumber !== certificationCode) {
      alert('인증번호가 일치하지 않습니다.');
      return;
    }
    
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/find/pw', 
        { email, 
          validNumber, 
          password 
        });
      setPassword(response.data.password)
      setSuccessMessage('비밀번호 변경 요청이 성공했습니다.');
    } catch (err) {
      setError('인증번호가 올바르지 않거나 다른 오류가 발생했습니다..');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
      <InputWrapper>
      <InputText>이메일</InputText>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />     
      <SendButton type='button' onClick={handleVerificationSend}>인증번호 전송</SendButton>
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      <InputWrapper>
      <InputText>인증번호</InputText>
          <Input
            type="text"
            placeholder="인증번호를 입력해주세요."
            value={validNumber}
            onChange={(e) => setValidNumber(e.target.value)}
          />     
      </InputWrapper>
      <Line></Line>
      <InputWrapper>
      <InputText>새로운 비밀번호</InputText>
          <Input
            type="password"
            placeholder="영문 숫자 특수문자 포함 8~20자 입니다."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />     
      </InputWrapper>

      <InputWrapper>
      <InputText>비밀번호 확인</InputText>
          <Input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />     
      </InputWrapper>
        <FindButton type="submit">비밀번호 변경</FindButton>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {password && <Password>당신의 비밀번호는 {password}입니다.</Password>}
    </FormContainer>
  );
};

export default FindPasswordForm;