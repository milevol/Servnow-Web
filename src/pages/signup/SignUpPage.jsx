// 목적: 회원가입 화면 구현
// 기능: 토글 버튼
// 2024.07.21/곤/장고은

import React, { useState } from "react";
import styled from "styled-components";
import SignUp from "./SignUpInputInfo";
import SignUpComplete from "./SignUpComplete";
import SignUpTermsAgreement from "./SignUpTermsAgreement";

const Container = styled.div`
  .pageName {
    padding: 20px 0px 0px 0px;
    text-align: center;
    font-size: 25px;
    font-weight: bolder;
  }
`;

const StateContainer = styled.div`
  // 약관동의, 정보입력, 가입완료 버튼 컨테이너 css
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 50px;
  width: 1190px;
  height: 60px;
  margin: 20px auto;
`;

const Button = styled.button`
  // 약관동의, 정보입력, 가입완료 버튼 css
  flex: 1;
  padding: 10px;
  margin: 0 -20px;
  border: none;
  border-radius: 50px;
  background-color: ${(props) => (props.active ? "#3e77ff" : "#DBE1E9")};
  color: ${(props) => (props.active ? "white" : "#5d6670")};
  cursor: pointer;
  position: relative;
  z-index: ${(props) => (props.active ? 10 : 1)};

  &.no-cursor-change {
    cursor: default; /* 포커스 시 커서 변경 없음 */
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["약관동의", "정보입력", "가입완료"];

  // const handleButtonClick = (index) => {
  //   setActiveStep(index);
  // };

  return (
    <Container>
      <p className="pageName">회원가입</p>
      <StateContainer>
        {steps.map((step, index) => (
          <Button
            id="btn"
            key={index}
            className="no-cursor-change"
            active={activeStep === index}
            // onClick={() => handleButtonClick(index)}
            disabled
          >
            {step}
          </Button>
        ))}
      </StateContainer>
      <PageWrapper>
        {activeStep === 0 && (
          <div>
            <SignUpTermsAgreement setActiveStep={setActiveStep} />
          </div>
        )}
        {activeStep === 1 && <SignUp setActiveStep={setActiveStep} />}
        {activeStep === 2 && <SignUpComplete />}
      </PageWrapper>
    </Container>
  );
};

export default SignUpPage;
