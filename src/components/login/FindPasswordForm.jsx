//목적: 비밀번호 찾기 시 작동할 비밀번호 찾기 폼기능 로직과 스타일을 담당
//기능: 사용자 이메일 검증 및 비밀번호 찾기 기능
//2024.07.25 데이-이연

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  width: 500px;
  height: 400px;
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
  margin-top: 2.5rem;
`;

const Input = styled.input`
  width: 430px;
  height: 30px;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 3px solid #c2e0f2;
  border-radius: 4px;
  font-size: 1.1rem;
`;

const FindButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 2rem;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;

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
  font-woight: bold;
`

const FindPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      setError('');
      return;
    }

    setEmailError('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/find-pswd', { email });

      setPassword(response.data.password)
      setSuccessMessage('비밀번호 찾기 요청이 성공했습니다. 이메일을 확인해주세요.');
    } catch (err) {
      setError('등록되지 않은 이메일입니다.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
          {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>

        <FindButton type="submit">비밀번호 찾기</FindButton>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {password && <Password>당신의 비밀번호는 {password}입니다.</Password>}
    </FormContainer>
  );
};

export default FindPasswordForm;