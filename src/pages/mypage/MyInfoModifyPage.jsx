//목적: 마이페이지 내정보 수정의 로직과 레이아웃 담당(일반 로그임)
//기능: 사용자가 내정보 수정을 할 수 있도록 한다.(일반 로그인)
//2024.07.31 데이-이연
//더 추가할기능: api 연결

import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
//import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';

const PageContainer = styled.div`
  margin-top: -10px;
  padding: 5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  overflow-x: hidden;
  white-space: nowrap;
`;

const Header = styled.h2`
  font-size: 30px;
  color: #4C76FE;
  margin-bottom: 1rem;
`;

const HorizontalLine = styled.hr`
  margin-left: -80px;
  width: 100vw;
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
const HiddenFileInput = styled.input`
  display: none;
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
  margin-left:100px;
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
  width: 320px;
  padding: 0.8rem;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  font-size: 1rem;
  margin-right: 2rem;
  margin-bottom: 7px;
`;

const PasswordSection = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 0;
`;

const SecondSectionTitle = styled.p`
  font-size: 20px;
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
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: -40px;
`;

const PrevButton = styled.button`
   width: 278px;
  height: 74px;
  padding: 1rem 2rem;
  background-color: #C5CCD5;
  color: #061522;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  margin-right: 1rem;
  font-weight: bold;
`;

const SaveButton = styled.button`
  width: 278px;
  height: 74px;
  padding: 1rem 2rem;
  background-color: #3E77FF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
`;

const HorizontalSemiLine = styled.hr`
  width: 600px;
  border: none;
  border-top: 1px solid #C8D5FF;
  margin: 2rem 0 1rem;
`;
const ErrorMessage = styled.p`
  margin-top: -16px;
  margin-left: 175px;
  color: #011b6c;
  font-size: 14px;
`;

const MyInfoModifyPage = () => {
  const navigate = useNavigate();
  const { stayedLoggedIn } = useSelector((state) => state.auth);

  const [profileImage, setProfileImage] = useState('/roundLogo1.png');
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(true);
  const [userId, setUserId] = useState('');
  const [validUserId, setValiduserId] = useState(true);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [validNumber, setValidNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailChange, setEmailChange] = useState(false);
 
  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = stayedLoggedIn
      ? localStorage.getItem('accessToken')
      : sessionStorage.getItem('accessToken');

      if (!accessToken) {
        console.log("Access token not found.");
        alert("액세스 토큰을 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get(
          '/api/v1/users/me/info', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.data.code === 200) {
            console.log(response.data.data);
            const { profile_url, nickname, serialId, email } = response.data.data;
            setProfileImage(profile_url);
            setNickname(nickname);
            setUserId(serialId);
            setEmail(email);
        } else {
            console.error("내정보 불러오기 중 오류 발생", response.data.message);
            alert(response.data.message);
          }
      } catch (error) {
        console.error("내정보 불러오기 중 오류 발생", error.response ? (error.response.data.message, error.response.status) : error.message);
        alert(error.response.data.message);

      }
    };
    
    fetchUserInfo();
  },[]);
  //이미지 오류 시 핸들러
  const handleImageError = () => {
    setProfileImage('/roundLogo1.png');
  };
  //프로필 이미지 변경
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  const handleIdChange = (e) => {
    setUserId(e);
    setValiduserId(false);
  };

  const handleIdDuplicateCheck = async () => {
    try{
      const response = await axios.post('/api/v1/auth/duplicate/id', {
        serialId: userId
        }
      );
      
      if (response.status === 200) {
        if (response.data.data) {
          alert("이미 사용중인 아이디입니다.");
          setValiduserId(false);
        } else {
          alert("사용 가능한 아이디입니다.");
          setValiduserId(true);
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        alert(error.response.data.message);
        setValiduserId(false);
      } else {
        console.error("아이디 중복확인 중 오류 발생:", error.message);
        alert("아이디 중복확인 중 오류가 발생했습니다.");
        setValiduserId(false);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e);
    setEmailValid(false);
    setValidNumber(''); // 인증번호 입력 필드 초기화
  };

//이메일로 인증번호 전송 api
  const handleEmailVerification = async () => {
    const accessToken = stayedLoggedIn
    ? localStorage.getItem('accessToken')
    : sessionStorage.getItem('accessToken');

    if (!accessToken) {
      console.log("Access token not found.");
      alert("액세스 토큰을 찾을 수 없습니다.");
      return;
    }

    try{
      const response = await axios.post(
        '/api/v1/users/me/info/identity-verification',
        {
          email: email
        }, {
          headers: {
          Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      if (response.data.code === 200) {
        alert('이메일로 인증번호가 전송되었습니다.');
        console.log("Email verification success");
        setEmailValid(false);
      }
      else {
        console.error("Failed to Email verification:", response.data.message);
        alert(response.data.message);
        setEmailValid(false);
      }
    } catch(error) {
      console.error("Email verification failed:", error.response ? (error.response.data.message, error.response.status) : error.message);
      alert("이메일 인증번호 전송에 실패했습니다.");
      setEmailValid(false);
    }
  };

  //이메일 인증번호 검증 api
  const handleEmailCertification = async () => {
    const accessToken = stayedLoggedIn
    ? localStorage.getItem('accessToken')
    : sessionStorage.getItem('accessToken');

    if (!accessToken) {
      console.log("Access token not found.");
      alert("액세스 토큰을 찾을 수 없습니다.");
      return;
    }
    try {
      const response = await axios.post('/api/v1/users/me/info/certification', {
        certificationNumber: validNumber
      }, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        }
      });
      if (response.data.code === 200) {
        alert('이메일 인증이 완료되었습니다.');
        console.log("email certification success");
        setEmailValid(true);
      } else {
        console.error("Failed to Email certification:", response.data.message, response.data.code);
        alert(response.data.message);
        setEmailValid(false);
      }
    } catch(error) {
      console.error("Email certification failed:", error.response ? (error.response.data.message, error.response.status) : error.message);
      alert("이메일 인증 요청에 실패했습니다.");
      setEmailValid(false);
    }
  };
//비밀번호 검증
  const passwordValidation = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    passwordValidate(password)
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
  };

  const passwordValidate = (newPassword) => {
    if (newPassword.trim() === '') {
      setPasswordError('');
      setPasswordValid(true);
    } else if (!passwordValidation.test(newPassword)) {
      setPasswordError('비밀번호는 8~20자, 영문, 숫자, 특수문자 혼합으로 입력해주세요.');
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
      setPasswordError('');
    }
  };

  const handleSave = async () => {
      // 각 필드의 유효성 상태를 확인
    if (!validUserId) {
      alert("아이디 중복 확인이 필요합니다.");
      return;
    }

    if (!emailValid) {
      alert("이메일 인증이 필요합니다.");
      return;
    }

    if (!passwordValid) {
      alert("비밀번호를 올바르게 입력해주세요.");
      return;
    }
    const accessToken = stayedLoggedIn
    ? localStorage.getItem('accessToken')
    : sessionStorage.getItem('accessToken');

      if (!accessToken) {
        console.log("Access token not found.");
        alert("액세스 토큰을 찾을 수 없습니다.");
        return;
      }
    try {
      const response = await axios.patch(
        '/api/v1/users/me/info/save', {
          profileUrl: profileImage,
          serialId: userId,
          email: email,
          certificationNumber: validNumber,
          password: newPassword,
          reconfirmPassword: confirmPassword
        }, {
          headers: {
          Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      if (response.data.code === 200) {
        alert("내 정보 수정이 완료 되었습니다.");
        console.log(response.data.message);
      } else {
        console.error("Failed to saving changed info:", response.data.message, response.data.code);
        alert(response.data.message);
      }
    } catch(error) {
      console.error("saving changed info failed:", error.response ? (error.response.data.message, error.response.status) : error.message);
      alert(error.response.data.message);
    }
  };

  const handlePreviousButton = () => {
    navigate('/mypage')
  }


  return (
  <>
    <PageContainer>
      <Header>내 정보 수정</Header>
      <HorizontalLine />
      <ProfileImageWrapper>
        <ProfileImage 
          src={profileImage} 
          alt="Profile"
          onError={handleImageError} />
        <HiddenFileInput 
          type='file'
          accept='image/*'
          id='profileImageInput'
          onChange={handleImageChange}
        />
        <IconButton 
          onClick={ () => document.getElementById('profileImageInput').click()}
          style={{ position: 'absolute', top: '70px', right: '0', width: '25px', height: '25px', padding: '0' }}>✎</IconButton>
      </ProfileImageWrapper>

      <InfoContainer>
        <InfoItem>
          <InfoLabel>닉네임</InfoLabel>
          <InfoInput type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </InfoItem>
        <InfoItem>
          <InfoLabel>아이디 *</InfoLabel>
          <InfoInput type="text" value={userId} onChange={(e) => handleIdChange(e.target.value)}/>
          <OverlapButton onClick={handleIdDuplicateCheck}>중복확인</OverlapButton>
        </InfoItem>
        {emailChange ? (
            <>
              <InfoItem>
                <InfoLabel>이메일 *</InfoLabel>
                <InfoInput
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="이메일을 입력해 주세요."
                />
                <VerifyButton onClick={handleEmailVerification}>본인인증</VerifyButton>
              </InfoItem>
              <InfoItem>
                <InfoLabel>인증번호</InfoLabel>
                <InfoInput
                  type="text"
                  value={validNumber}
                  onChange={(e) => setValidNumber(e.target.value)}
                />
                <VerifyButton onClick={handleEmailCertification}>인증확인</VerifyButton>
              </InfoItem>
            </>
          ) : (
            <InfoItem>
              <InfoLabel>이메일 *</InfoLabel>
              <InfoInput
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="이메일을 입력해 주세요."
              />
              <OverlapButton onClick={() => setEmailChange(true)}>변경하기</OverlapButton>
            </InfoItem>
          )}
      </InfoContainer>
      <HorizontalSemiLine />
      <PasswordSection>
        <SecondSectionTitle>비밀번호 변경하기</SecondSectionTitle>
        <PasswordContainer>
          <InfoItem>
            <InfoLabel>새로운 비밀번호 *</InfoLabel>
            <PasswordInput 
              type="password" 
              value={newPassword} 
              onChange={(e) => handlePasswordChange(e.target.value)} 
              placeholder="영문 숫자 특수문자 포함 8~20자 입니다."  />
          </InfoItem>
          <InfoItem>
            <InfoLabel>비밀번호 재확인 *</InfoLabel>
            <PasswordInput 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => handleConfirmPasswordChange(e.target.value)} 
            />
          </InfoItem>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </PasswordContainer>
      </PasswordSection>
      <ButtonContainer>
        <PrevButton onClick={handlePreviousButton}>이전</PrevButton>
        <SaveButton onClick={handleSave}>저장하기</SaveButton>
      </ButtonContainer>
    </PageContainer>
    </>
  );
};

export default MyInfoModifyPage;