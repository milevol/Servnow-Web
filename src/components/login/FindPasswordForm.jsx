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
  border: 2px solid #D9D9D9;
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
  const [validNumber, setValidNumber] = useState('');
  const [certificationSuccess, setCertificationSuccess] = useState(false);

//인증번호 전송 버튼 클릭 시 작동할 기능
  const handleVerificationSend = async () => {
    if(!email) {
      alert('이메일을 입력해주세요.');
      setError('');
      return
    }
    if (!verificationSent){
      try {
        const response = await axios.post(
          '/api/v1/find/email/identity-verification', 
          { 
            email: email
          },
        );
        
        if (response.data.code === 200) {
          setVerificationSent(true);
          alert('인증번호가 이메일로 전송되었습니다.');
          setError('');
        } else {
          alert('등록되지 않은 이메일입니다.');
          setVerificationSent(false);
        } 
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 500) {
            console.error("서버 내부 오류:", data.message);
            alert(data.message || "서버 내부 오류가 발생했습니다.");
          } else if (status === 404){
            console.error("인증번호 전송 중 오류 발생:", data.message);
            alert(data.message || "사용자를 찾을 수 없습니다.");
          } else {
            console.error("인증번호 전송 중 오류 발생:", data.message);
            alert("인증번호 전송 중 오류가 발생했습니다.");
          }
        } else {
          console.error("인증번호 전송 중 네트워크 오류 발생:", error.message);
          alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.");
        }
      }
    }
  };
  const handleVerificationConfirm = async () => {
    if (!validNumber) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    try {
      const response = await axios.post(
        '/api/v1/find/email/certification',
        {
          certificationNumber: validNumber
        },
      );
      if (response.data.code === 200) {
        setCertificationSuccess(true);
        alert('인증이 완료되었습니다.');
        setError('');
      } else {
        alert('인증번호가 일치하지 않습니다.');
      }
    } catch(error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500) {
          console.error("서버 내부 오류:", data.message);
          alert(data.message || "서버 내부 오류가 발생했습니다.");
        } else if (status === 404){
          console.error("인증번호 확인 중 오류 발생:", data.message);
          alert(data.message || "사용자를 찾을 수 없습니다.");
        } else {
          console.error("인증번호 확인 중 오류 발생:", data.message);
          alert("본인증번호 확인 중 오류가 발생했습니다.");
        }
      } else {
        console.error("인증번호 확인 중 네트워크 오류 발생:", error.message);
        alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.");
      }
    }
  } 
//비밀번호 변경 버튼 클릭시 작동 기능
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificationSuccess) {
      alert('먼저 이메일을 인증을 진행해주세요')
      return;
    }
    if(password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post(
        '/api/v1/change/pw', 
        { 
          password: password,
          repassword: passwordCheck
        });
        if (response.data.code === 200) {
          alert('비밀번호 변경이 완료되었습니다.');
          setError('');
        } else {
          alert('비밀번호 변경에 실패했습니다.');
        } 
    } catch(error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500) {
          console.error("서버 내부 오류:", data.message);
          alert(data.message || "서버 내부 오류가 발생했습니다.");
        } else if (status === 404){
          console.error("비밀번호 변경 중 오류 발생:", data.message);
          alert(data.message || "사용자를 찾을 수 없습니다.");
        } else {
          console.error("비밀번호 변경 중 오류 발생:", data.message);
          alert("본인증번호 확인 중 오류가 발생했습니다.");
        }
      } else {
        console.error("비밀번호 변경 중 네트워크 오류 발생:", error.message);
        alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.");
      }
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
          <SendButton type='button' onClick={handleVerificationConfirm}>인증확인</SendButton>
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
    </FormContainer>
  );
};

export default FindPasswordForm;