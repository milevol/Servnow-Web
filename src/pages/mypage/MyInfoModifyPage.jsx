//목적: 마이페이지 내정보 수정의 로직과 레이아웃 담당
//기능: 사용자가 내정보 수정을 할 수 있도록 한다.
//2024.07.31 데이-이연
//더 추가할기능: api 연결

import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';


const PageContainer = styled.div`
  margin: 0 auto;
  padding: 5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const Header = styled.h2`
  font-size: 1.8rem;
  color: #4C76FE;
  margin-bottom: 1rem;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 3px solid #4C76FE;
  margin-bottom: 1.5rem;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 2rem;
  object-fit: cover;
`;

const IconButton = styled.button`
  width: 120px;
  height: 35px;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 1rem;
`;
const OverlapButton = styled.button`
  width: 120px;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.8rem;
`;
const VerifyButton = styled.button`
  width: 120px;
  background-color: #011B6C;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.8rem;
`;


const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
    align-items: flex-start;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InfoLabel = styled.label`
  width: 130px;
  font-size: 1rem;
  color: #3a3a3a;
  margin-right: 2.5rem;
  text-align: left;
`;

const InfoInput = styled.input`
  width: 270px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const PasswordSection = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 0;
`;

const SecondSectionTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PasswordInput = styled(InfoInput)`
  width: 300px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
`;

const PrevButton = styled.button`
  width: 20%;
  padding: 1rem 2rem;
  background-color: #ddd;
  color: #3a3a3a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 1rem;
`;

const SaveButton = styled.button`
  width: 20%;
  padding: 1rem 2rem;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;

const HorizontalSemiLine = styled.hr`
  width: 600px;
  border: none;
  border-top: 1px solid #ddd;
  margin: 2rem 0 1rem;
`;

const MyInfoModifyPage = () => {
  const [nickname, setNickname] = useState('아리');
  const [userId, setUserId] = useState('12345ari');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('../../../src/assets/logo1.png')
  return (
    <PageContainer>
      <Header>내 정보 수정</Header>
      <HorizontalLine />

        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="Profile" />
          <IconButton style={{ position: 'absolute', top: '70px', right: '0', width: '25px', height: '25px', padding: '0' }}>✎</IconButton>
        </ProfileImageWrapper>

      <InfoContainer>
        <InfoItem>
          <InfoLabel>닉네임</InfoLabel>
          <InfoInput type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </InfoItem>
        <InfoItem>
          <InfoLabel>아이디 *</InfoLabel>
          <InfoInput type="text" value={userId} readOnly />
          <OverlapButton>중복확인</OverlapButton>
        </InfoItem>
        <InfoItem>
          <InfoLabel>이메일 *</InfoLabel>
          <InfoInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력해 주세요." />
          <VerifyButton>본인인증</VerifyButton>
        </InfoItem>
        <InfoItem>
          <InfoLabel>인증번호</InfoLabel>
          <InfoInput type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
        </InfoItem>
      </InfoContainer>
      <HorizontalSemiLine />
      <PasswordSection>
        <SecondSectionTitle>비밀번호 변경하기</SecondSectionTitle>
        <PasswordContainer>
          <InfoItem>
            <InfoLabel>새로운 비밀번호 *</InfoLabel>
            <PasswordInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="영문 숫자 특수문자 포함 8~20자 입니다." />
          </InfoItem>
          <InfoItem>
            <InfoLabel>비밀번호 재확인 *</InfoLabel>
            <PasswordInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </InfoItem>
        </PasswordContainer>
      </PasswordSection>
      <ButtonContainer>
        <PrevButton>이전</PrevButton>
        <SaveButton>저장하기</SaveButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default MyInfoModifyPage;