//목적: 마이페이지 내정보 수정의 로직과 레이아웃 담당(카카오로그인 버전)
//기능: 사용자가 내정보 수정을 할 수 있도록 한다.(카카오로그인 버전)
//2024.07.31 데이-이연
//더 추가할기능: api 연결

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import kakaoLogo from "../../../src/assets/kakao_logo.png";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

const PageContainer = styled.div`
  margin-top: -10px;
  padding-top: 5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  white-space: nowrap;
  overflow-x: hidden;
`;

const Header = styled.h2`
  font-size: 30px;
  color: #4c76fe;
  margin-bottom: 1rem;
`;

const HorizontalLine = styled.hr`
  margin-left: 0;
  width: 100vw;
  border: none;
  border-top: 3px solid #4c76fe;
  margin-bottom: 1.5rem;
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
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
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
const IconButton = styled.button`
  width: 120px;
  height: 35px;
  background-color: #4c76fe;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 1rem;
`;
const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -1rem;
  position: relative;
`;

const NicknameInput = styled.input`
  width: 300px;
  padding: 0.8rem;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 1rem;
  margin-right: 3rem;
`;
const UpdateButtonPlaceholder = styled.div`
  width: 139px; /* 버튼과 동일한 폭 */
  height: 47px; /* 버튼과 동일한 높이 */
`;
const UpdateButton = styled.button`
  width: 139px;
  height: 47px;
  padding: 0.8rem 1.55rem;
  background-color: #4c76fe;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  right: -150px; /* 오른쪽에 고정 */
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const Section = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #3a3a3a;
  margin-bottom: 1.5rem;
`;
const SectionSubTitle = styled.p`
  font-size: 1rem;
  color: #3a3a3a;
  margin-bottom: 18px;
`;
const KakaoButton = styled.button`
  width: 411px;
  height: 66px;
  padding: 0.8rem;
  background-color: #ffe617;
  margin-bottom: 0.6rem;
  color: #3a3a3a;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
`;

const SecondSectionTitle = styled.p`
  font-size: 20px;
  margin-top: 0rem;
  margin-bottom: 2.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InfoLabel = styled.label`
  width: 100px;
  font-size: 1rem;
  color: #3a3a3a;
  margin-right: 4rem;
  text-align: left;
`;

const InfoInput = styled.input`
  width: 348px;
  padding: 0.8rem;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 11rem;
  margin-bottom: 40px; // 페이지 하단에서 40px 위에 위치
`;

const PrevButton = styled.button`
  width: 278px;
  height: 74px;
  padding: 1rem 2rem;
  background-color: #c5ccd5;
  color: #061522;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  margin-right: 1rem;
  font-weight: bold;
`;

const ReAuthButton = styled.button`
  width: 278px;
  height: 74px;
  padding: 1rem 2rem;
  background-color: #3e77ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
`;
const HorizontalSemiLine = styled.hr`
  width: 570px;
  border: none;
  border-top: 3px solid #c8d5ff;
  margin-top: 2rem;
`;
const MyInfoModifyKakaoPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("/roundLogo1.png");
  const [originalNickname, setOriginalNickname] = useState("");

  useEffect(() => {
    const fetchUserInfoKakao = async () => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("Access token not found.");
        alert("액세스 토큰을 찾을 수 없습니다.");
        return;
      }
      try {
        const response = await axios.get("/api/v1/users/me/info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.code === 200) {
          console.log(response.data.data);
          const { nickname, profile_url } = response.data.data;
          setProfileImage(profile_url);
          setOriginalNickname(nickname);
          setNickname(nickname);
        } else {
          console.error("내정보 불러오기 중 오류 발생", response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        console.error(
          "내정보 불러오기 중 오류 발생",
          error.response ? (error.response.data.message, error.response.status) : error.message
        );
        alert(error.response.data.message);
      }
    };

    fetchUserInfoKakao();
  }, []);

  //이미지 오류 시 핸들러
  const handleImageError = () => {
    setProfileImage("/roundLogo1.png");
  };

  //프로필 이미지 변경
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleIconButtonClick = async () => {
    const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!accessToken) {
      alert("액세스 토큰을 찾을 수 없습니다.");
      return;
    }
    //이미지파일가져오기
    const fileInput = document.getElementById("profileImageInput");
    const file = fileInput.files[0];
    console.log("프로필파일", fileInput.files[0]);
    if (!file) {
      alert("업로드할 이미지를 선택해주세요.");
      return;
    }
    //전송할 폼데이타 준비
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.patch("/api/v1/users/me/info/profile-img", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.code === 200) {
        alert("프로필 이미지가 변경되었습니다.");
        console.log("Profile Image changed");
      } else {
        alert("프로필 이미지 변경에 실패했습니다.");
        console.log(response.data.message, response.data.code);
      }
    } catch (error) {
      console.error(
        "fail to saving profile image: ",
        error.response ? (error.response.data.message, error.response.status) : error.message
      );
      alert(error.response.data.message);
    }
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("Access token not found.");
      alert("액세스 토큰을 찾을 수 없습니다.");
      return;
    }
    try {
      const response = await axios.patch(
        "/api/v1/users/me/info/save",
        {
          serialId: nickname,
          email: "",
          certificationNumber: "",
          password: "",
          reconfirmPassword: "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.code === 200) {
        alert("내 정보 수정이 완료 되었습니다.");
        console.log(response.data.message);
      } else {
        console.error("Failed to saving changed info:", response.data.message, response.data.code);
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response.data.code === 401 && error.response.data.message === "인증번호가 일치하지 않습니다.") {
        alert("변경 사항을 저장했습니다.");
      } else {
        console.error(
          "saving changed info failed:",
          error.response ? (error.response.data.message, error.response.status) : error.message
        );
        alert(error.response.data.message);
      }
    }
  };

  const handlePreviousButton = () => {
    navigate("/mypage");
  };

  return (
    <PageContainer>
      <Navbar />
      <Header>내 정보 수정</Header>
      <HorizontalLine></HorizontalLine>
      <ProfileImageWrapper>
        <ProfileImage
          src={profileImage}
          alt="Profile"
          onClick={() => document.getElementById("profileImageInput").click()} //클릭 시 파일 선택 창 열기
          onError={handleImageError}
        />
        <HiddenFileInput type="file" accept="image/*" id="profileImageInput" onChange={handleImageChange} />
        <IconButton
          onClick={handleIconButtonClick}
          style={{ position: "absolute", top: "70px", right: "0", width: "25px", height: "25px", padding: "0" }}
        >
          ✎
        </IconButton>
      </ProfileImageWrapper>
      <ProfileContainer>
        <NicknameContainer>
          <InfoLabel>닉네임</InfoLabel>
          <NicknameInput type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} readOnly />
          {/* {nickname !== originalNickname && (
              <UpdateButton 
                type='button' 
                onClick={handleUpdateNickname}
                visible={nickname !== originalNickname}
                >수정하기</UpdateButton>
              )
            } */}
        </NicknameContainer>
      </ProfileContainer>
      <HorizontalSemiLine />
      <Section>
        <SectionTitle>SNS 연결</SectionTitle>
        <SectionSubTitle>연결된 SNS 계정으로 로그인 되었습니다.</SectionSubTitle>
        <KakaoButton>
          <KakaoIcon src={kakaoLogo} alt="Kakao Logo" /> 카카오로 연결
        </KakaoButton>
      </Section>
      <HorizontalSemiLine />
      {/* <Section>
        <SecondSectionTitle>본인 인증된 회원 정보</SecondSectionTitle>
        <InfoContainer>
          <InfoItem>
            <InfoLabel>성명</InfoLabel>
            <InfoInput type="text" value={userName} readOnly />
          </InfoItem>
          <InfoItem>
            <InfoLabel>연락처</InfoLabel>
            <InfoInput type="text" value={phoneNumber} readOnly />
          </InfoItem>
        </InfoContainer>
      </Section> */}
      <ButtonContainer>
        <PrevButton onClick={handlePreviousButton}>이전</PrevButton>
        <ReAuthButton>저장하기</ReAuthButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default MyInfoModifyKakaoPage;
