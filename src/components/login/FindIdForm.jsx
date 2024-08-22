//목적: 아이디 찾기 링크 클릭 시 작동할 아이디 찾기 폼기능 로직과 스타일을 담당
//기능: 사용자 개인정보 검증 및 아이디 찾기 기능
//2024.07.25 데이-이연
//더 추가할기능: api 연결

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [certificationSuccess, setCertificationSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [validNumber, setValidNumber] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [userIdExist, setUserIdExist] = useState(false);

  // 인증번호 전송 버튼 클릭시 작동할 기능
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
        console.log('User ID:', response.data.data);
        console.log('message:', response.data.message);
        setUserId(response.data.data);
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
  
// 아이디찾기 버튼 클릭 시 작동할 기능
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificationSuccess) {
      alert('이메일 인증을 먼저 진행해주세요.');
      return;
    }
      if(certificationSuccess){
        setUserIdExist(true);
      }
  };

  const handleFindPasswordClick = () => {
    navigate('/find-pswd');
  };

  return (
    <FormContainer>
        {userIdExist ? (
            <FindWrapper>
                <FindText>입력하신 정보와 일치하는 아이디는 다음과 같습니다.</FindText>
                <SuccessContainer>
                  <SuccessMessage>아이디는 <HighlightedUserId>{userId}</HighlightedUserId> 입니다.</SuccessMessage>
                </SuccessContainer>

                <ButtonContainer>
                    <ConfirmButton>확인</ConfirmButton>
                    <FindPswdButton onClick={handleFindPasswordClick}>비밀번호 찾기</FindPswdButton>
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
           <SendButton type='button' onClick={handleVerificationConfirm}>
            인증확인
            </SendButton>
        </InputWrapper>
        <FindButton type="submit">아이디 찾기</FindButton>
      </form>
    )}
    </FormContainer>
  
  );
};

export default FindIdForm;