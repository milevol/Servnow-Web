//목적: 로그인 버튼 클릭 시 작동할 로그인 폼기능 로직과 스타일을 담당
//기능: 사용자 로그인 정보 입력 검증 처리
//2024.07.21 데이-이연
//더 필요한기능: api연결

import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import kakaoLogo from "../../assets/kakao_logo.png";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

const FormContainer = styled.div`
  width: 500px;
  height: 670px;
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
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 430px;
  height: 1.5rem;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 1.5px solid #C8D5FF;
  border-radius: 10px;
  font-size: 18px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const RadioLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 2rem;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 10px;
  border: 2px solid #4C76FE;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: #4b6bd1;
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  background-color: white;
  color: #061522;
  border: 2px solid #4C76FE;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: white;
  }
`;

const KakaoButton = styled.button`
  width: 65px;
  height: 65px;
  margin: 1rem 0;
  background: url(${kakaoLogo}) no-repeat center center / cover;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Hr = styled.hr`
  width: 90%;
  border: none;
  border-top: 1px solid #C8D5FF;
  margin: 0.7rem 0 0.8rem 0;
`;

const SnsText = styled.p`
  font-size: 1.2rem;
  margin-top: 2.5rem;
`;

const SnsSmallText = styled.span`
  font-size: 0.8rem;
  margin-top: 0.8rem;
  color: #666666;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  margin-top: 0.3rem;
  color: red;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const SearchLink = styled(Link)`
  margin: 0 1rem;
  font-size: 1rem;
  color: #666666;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 30px;
  background-color: #C8D5FF;
  margin: 0 1rem;
`;

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [stayedLoggedIn, setStayedLoggedIn] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 서버에서 회원 정보 가져오기 검증
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!id) {
      setIdError('! 아이디를 입력해주세요.');
      setError('');
      setPasswordError('');
      hasError = true; // 에러 존재하는지 확인
    } else if (!password) {
      setPasswordError('! 비밀번호를 입력해주세요.');
      setIdError('');
      setError('');
      hasError = true;
    } else { 
      setIdError('');
      setPasswordError('');
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post(
        "/api/v1/auth/login",
        {
           serialId: id,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000, // 타임아웃 5초 설정
        }
      );

      if (response.status === 200) {
        console.log("로그인 요청 성공:", response.data.message);

        const { accessToken, refreshToken, isRegistered } = response.data.data;


        if (isRegistered) {
          alert('로그인에 성공하셨습니다.');

          // 토큰을 로컬스토리지에 저장하기
          if (stayedLoggedIn) {
            dispatch(login({ stayedLoggedIn: true }));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log('Access Token (localStorage):', localStorage.getItem('accessToken'));
          } else {
            dispatch(login({ stayedLoggedIn: false }));
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
            console.log('Access Token (sessionStorage):', sessionStorage.getItem('accessToken'));
          }
     
          navigate('/');
        } else {
          alert('등록되지 않은 사용자입니다.');
          navigate('/signup');
        }
      } 
      
    } catch (error) {
      setError('! 유효하지 않은 이메일 또는 비밀번호 입니다.');
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          console.error("로그인 오류: 사용자를 찾을 수 없습니다.");
          alert("사용자를 찾을 수 없습니다.");
        } 
        else if(status === 401) {
          console.error("로그인 중 오류 발생:", data.message);
          alert(data.message || "로그인 중 오류가 발생했습니다.");
        }
        else {
          console.error("기타 에러발생:", status);
          alert(`로그인 중 오류가 발생했습니다. 상태 코드: ${status}`);
        }
      } 
      else {
        // 네트워크 오류 등 기타 오류 처리
        console.error("로그인 중 네트워크 오류 발생:", error.message);
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }

  const handleSignupClick = () => {
    navigate('/signup');
  };

  // 카카오 간편로그인 REST API 이용 기능
const handleKakaoLogin = () => {
    const REST_API_KEY = '81edc8661035881efc3646c4d8737c10';
    const REDIRECT_URI = 'http://localhost:5173/oauth/kakao';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };  

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorText>{error}</ErrorText>}
          {idError && <ErrorText>{idError}</ErrorText>}
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </InputContainer>

        <RadioContainer>
          <input
            type="checkbox"
            checked={stayedLoggedIn}
            onChange={() => setStayedLoggedIn(!stayedLoggedIn)}
          />
          <RadioLabel>로그인 상태 유지</RadioLabel>
        </RadioContainer>

        <LoginButton type="submit">로그인</LoginButton>
        <SignupButton type="button" onClick={handleSignupClick}>
          회원가입
        </SignupButton>
      </form>

      <LinksContainer>
        <SearchLink to="/find-pswd">비밀번호 찾기</SearchLink>
        <Separator />
        <SearchLink to="/find-id">아이디 찾기</SearchLink>
      </LinksContainer>
      <Hr />

      <SnsText>SNS 계정으로 로그인</SnsText>
      <SnsSmallText>비회원은 회원 가입 화면으로 이동합니다.</SnsSmallText>
      <KakaoButton onClick={handleKakaoLogin}></KakaoButton>
    </FormContainer>
  );
};

export default LoginForm;
