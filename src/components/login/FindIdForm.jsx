//목적: 아이디 찾기 링크 클릭 시 작동할 아이디 찾기 폼기능 로직과 스타일을 담당
//기능: 사용자 개인정보 검증 및 아이디 찾기 기능
//2024.07.25 데이-이연
//더 추가할기능: api 연결

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

const ConfirmButton = styled.button`
  width: 50%;
  padding: 0.8rem;
  background-color: #4C76FE;
  margin-right: 1.5rem;
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
const FindPswdButton = styled.button`
  width: 50%;
  padding: 0.8rem;
  background-color: white;
  margin-left: 1.5rem;
  border: 2.3px solid #4C76FE ;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  &:hover {
    background-color: white;
  }
`;
const ButtonContainer =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5rem;
  width: 550px;
`

const FindText = styled.p`
  font-size: 1.2rem;
  margin-top: 4rem;
  margin-bottom: 3.5rem;
`;
const SuccessMessage = styled.p`
  font-size: 1.5rem;
  margin: 2.5rem;
  font-woight: bold;
`
const SuccessContainer = styled.div`
  width: 550px;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  border: 3px solid #4C76FE;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FindWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
const HighlightedUserId = styled.span`
  color: #4C76FE;
`;

const FindIdForm = () => {

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [validNumber, setValidNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // 인증번호 전송 버튼 클릭시 작동할 기능
  const handleVerificationSend = async () => {
    if(!email) {
      alert('이메일을 입력해주세요.');
      setError('');
      return
    }
    if (verificationSent === false){
      try {
        const response = await axios.post('', { email });
        
        if (response.data.success) {
          setVerificationSent(true);
          setVerificationCode(response.data.verificationCode)
          alert('인증번호가 이메일로 전송되었습니다.');
          setError('');
        } else {
          alert('이메일 전송에 실패했습니다.');
          setVerificationSent(false);
        } 
      } catch (err) {
        alert('등록되지 않은 이메일입니다.')
        setVerificationSent(false);
      }
    }
  };
  
// 아이디찾기 버튼 클릭 시 작동할 기능
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !validNumber) {
      alert('모든 필드를 작성해주세요.');
      return;
    }

    if (validNumber !== verificationCode) {
      alert('인증번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('', 
        { 
           email,
           validNumber
        });

      setUserId(response.data.userId);
    } catch (err) {

      alert('등록되지 않은 이메일입니다.');
    }
  };

  return (
    <FormContainer>
        {userId ? (
            <FindWrapper>
                <FindText>입력하신 정보와 일치하는 아이디는 다음과 같습니다.</FindText>
                <SuccessContainer>
                  <SuccessMessage>아이디는 <HighlightedUserId>{userId}</HighlightedUserId> 입니다.</SuccessMessage>
                </SuccessContainer>

                <ButtonContainer>
                    <ConfirmButton>확인</ConfirmButton>
                    <FindPswdButton>비밀번호 찾기</FindPswdButton>
                </ButtonContainer>
            </FindWrapper>
        ) : (
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
           <SendButton type='button'>인증확인</SendButton>
        </InputWrapper>
        <FindButton type="submit">아이디 찾기</FindButton>
      </form>
    )};
      
    </FormContainer>
  
  );
};

export default FindIdForm;