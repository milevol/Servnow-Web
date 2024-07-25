//목적: 아이디 찾기 링크 클릭 시 작동할 아이디 찾기 폼기능 로직과 스타일을 담당
//기능: 사용자 개인정보 검증 및 아이디 찾기 기능
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
const SuccessMessage = styled.p`
  font-size: 1.2rem;
  margin-top: 2rem;
  font-woight: bold;
`

const FindIdForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setNameError('이름을 입력해주세요.');
      setError('');
      setPhoneError('');

      return;

    } else if(!phone) {
        setPhoneError('전화번호를 입력해주세요.')
        setError('');
        setNameError('');

        return;
    }

    setNameError('');
    setPhoneError('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/find-id', 
        { 
            name, 
            phone 
        });

      setUserId(response.data.userId);
      setSuccessMessage('아이디 찾기 요청이 성공했습니다. 이메일을 확인해주세요.');
    } catch (err) {
      setError('등록되지 않은 회원정보입니다.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="전화번호를 입력해주세요."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {nameError && <ErrorText>{nameError}</ErrorText>}
          {phoneError && <ErrorText>{phoneError}</ErrorText>}
          {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>

        <FindButton type="submit">아이디 찾기</FindButton>
      </form>
      
      {userId && <SuccessMessage>당신의 아이디는 {userId}입니다.</SuccessMessage>}
    </FormContainer>
  );
};

export default FindIdForm;