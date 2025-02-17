// 목적: 설문지 등록 모달
// 기능: 설문지 등록
// 2024.08.23/곤/장고은, 엠마/신윤지

import React, { useState } from "react";
import styled from "styled-components";
import { IoLinkSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")}; /* 모달 표시 여부 */
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 900px; /* 너비를 설정하여 창 모드처럼 보이게 함 */
  max-width: 90%;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const HeaderTitle = styled.h2`
  font-size: 1.3rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background: white;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
`;

const ModalContentTitle = styled.div`
  width: 102%;
  margin: 0 -20px;
  padding: 20px 0;
  padding-left: 22px;
  text-align: center;
  background-color: #c6d3ff;
  font-weight: bold;
`;

const ModalForm = styled.div`
  margin: 40px 0;
`;

const ModalFormP = styled.p`
  margin: 30px 0 10px 0;
`;

const ModalInput = styled.input`
  width: 96.5%;
  margin-left: 5px;
  padding: 10px;
  color: #5d6670;
  background-color: #f2f5ff;
  border: none;
  border-radius: 5px;
  margin: ${(props) => (props.$isEmail ? "50px 0" : "0 0 0 5px")};
  padding: ${(props) => (props.$isEmail ? "15px" : "10px")};
`;

const OptionButton = styled.button`
  width: 54.4%;
  margin: -30px -20px 0px -20px;
  padding-left: 22px;
  background: white;
  border: solid;
  border-width: 0 0 2px;
  border-color: ${(props) => (props.selected ? "#4C76FE" : "#5D6670")};
  color: ${(props) => (props.selected ? "#4C76FE" : "#5D6670")};
  padding: 20px 20px;
  cursor: pointer;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin: 20px 0 0 27px;
`;

const NextButton = styled.button`
  float: right;
  background-color: #4c76fe;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  cursor: pointer;
  margin-left: 10px;
`;

const PrevButton = styled.button`
  float: right;
  background-color: #bfbfbf;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  cursor: pointer;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  margin-top: -6px;
  right: 20px;
  transform: translateY(-50%);
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  background: ${(props) => (props.isChecked ? "#4C76FE" : "#5D6670")};
  border-radius: 15px;
  cursor: pointer;
`;

const ToggleKnob = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isChecked ? "25px" : "2px")};
  width: 21px;
  height: 21px;
  background: white;
  border-radius: 50%;
  transition: left 0.3s;
`;

const SurveyModal = ({ isOpen, onClose, surveyData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [reward, setReward] = useState("");
  const [rewardCount, setRewardCount] = useState("");
  const [expiredAt, setExpiredAt] = useState("");
  const [distribution, setDistribution] = useState("link");
  const [emailContent, setEmailContent] = useState({
    email: "",
    recipient: "",
    subject: "",
    message: "",
  });
  const [isEmailCollectionEnabled, setIsEmailCollectionEnabled] = useState(false);

  const stringDate = new Date(expiredAt).toString();
  const data = {
    reward,
    rewardCount,
    stringDate,

    //emailContent,
    //distribution,
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDistributionChange = (type) => {
    setDistribution(type);
    if (type === "link") {
      setEmailContent({
        email: "",
        recipient: "",
        subject: "",
        message: "",
      });
    }
  };

  const handleToggleChange = () => {
    setIsEmailCollectionEnabled(!isEmailCollectionEnabled);
  };

  const getToken = () => {
    return sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
  };

  const handleSendClick = async () => {
    let dataList = surveyData;

    console.log("dataList: ", JSON.stringify(dataList, null, 2));
    console.log(dataList.title);

    try {
      const token = getToken();
      const body = {
        title: dataList.title,
        content1: dataList.content1,
        content2: dataList.content2,
        duration: dataList.duration,
        characterType: dataList.characterType,
        mainColor: dataList.mainColor,
        subColor: dataList.subColor,
        font: dataList.font,
        reward: data.reward,
        rewardCount: parseInt(data.rewardCount, 10),
        expiredAt: data.stringDate,
        sections: dataList.sections,
      };

      const response = await axios.post("/api/v1/survey", body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("설문지 제작 성공:", response.data);
      navigate("/");
    } catch (error) {
      //console.error(data.message);
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderTitle>{step === 1 ? "설문지 등록하기" : "설문지 배포하기"}</HeaderTitle>
          <CloseButton onClick={onClose} type="button">
            X
          </CloseButton>
        </ModalHeader>
        {step === 1 && <ModalContentTitle>리워드 여부</ModalContentTitle>}
        {step === 2 && <ModalContentTitle>설문지 마감 기간 설정</ModalContentTitle>}
        {step === 3 && (
          <ModalContentTitle>
            이메일 정보 수집{" "}
            <ToggleContainer>
              <ToggleSwitch onClick={handleToggleChange} isChecked={isEmailCollectionEnabled}>
                <ToggleKnob isChecked={isEmailCollectionEnabled} />
              </ToggleSwitch>
            </ToggleContainer>
          </ModalContentTitle>
        )}
        <ModalForm>
          {step === 1 && (
            <>
              <ModalFormP>리워드 명</ModalFormP>
              <ModalInput
                type="text"
                placeholder="리워드 명을 입력해 주세요."
                value={reward}
                onChange={(e) => setReward(e.target.value)}
              />
              <ModalFormP>리워드 갯수</ModalFormP>
              <ModalInput
                type="text"
                placeholder="리워드 갯수를 입력해 주세요."
                value={rewardCount}
                onChange={(e) => setRewardCount(e.target.value)}
              />
            </>
          )}
          {step === 2 && (
            <>
              <ModalFormP>마감 기간</ModalFormP>
              <ModalInput type="datetime-local" value={expiredAt} onChange={(e) => setExpiredAt(e.target.value)} />
            </>
          )}
          {step === 3 && (
            <>
              <OptionButton selected={distribution === "link"} onClick={() => handleDistributionChange("link")}>
                <IoLinkSharp /> 링크로 배포하기
              </OptionButton>
              <OptionButton selected={distribution === "email"} onClick={() => handleDistributionChange("email")}>
                ✉ 이메일로 배포하기
              </OptionButton>
              {distribution === "link" && (
                <ModalInput
                  type="text"
                  $isEmail={true}
                  placeholder="http://servenow/130492"
                  value={emailContent.email}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
              )}
              {distribution === "email" && (
                <>
                  <ModalFormP>이메일</ModalFormP>
                  <ModalInput
                    type="email"
                    value={emailContent.email}
                    onChange={(e) =>
                      setEmailContent({
                        ...emailContent,
                        email: e.target.value,
                      })
                    }
                    placeholder="이메일을 입력해 주세요."
                  />
                  <ModalFormP>받는 사람</ModalFormP>
                  <ModalInput
                    type="text"
                    value={emailContent.recipient}
                    onChange={(e) =>
                      setEmailContent({
                        ...emailContent,
                        recipient: e.target.value,
                      })
                    }
                    placeholder="받는 사람을 입력해 주세요."
                  />
                  <ModalFormP>제목</ModalFormP>
                  <ModalInput
                    type="text"
                    value={emailContent.subject}
                    onChange={(e) =>
                      setEmailContent({
                        ...emailContent,
                        subject: e.target.value,
                      })
                    }
                    placeholder="제목을 입력해 주세요."
                  />
                  <ModalFormP>내용</ModalFormP>
                  <ModalInput
                    value={emailContent.message}
                    onChange={(e) =>
                      setEmailContent({
                        ...emailContent,
                        message: e.target.value,
                      })
                    }
                    placeholder="내용을 입력해 주세요."
                  />
                </>
              )}
            </>
          )}
        </ModalForm>
        <ButtonContainer center={step === 3}>
          {step > 1 && (
            <PrevButton onClick={handlePrev} type="button">
              이전
            </PrevButton>
          )}
          {step < 3 && (
            <NextButton onClick={handleNext} type="button">
              다음
            </NextButton>
          )}
          {step === 3 && <NextButton onClick={handleSendClick}>보내기</NextButton>}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SurveyModal;
