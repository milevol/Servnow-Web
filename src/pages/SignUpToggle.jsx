// 목적: 회원가입 화면 구현
// 기능: 토글 버튼
// 2024.07.21/곤/장고은

import React, { useState } from "react";
import styled from "styled-components";
import SignUp from "./SignUp";

const Container = styled.div`
  .pageName {
    padding: 20px 0px 0px 0px;
    text-align: center;
    font-size: 25px;
    font-weight: bolder;
  }
`;

const StateContainer = styled.div`
  // 약관동의, 회원가입, 가입완료 버튼 컨테이너 css
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 50px;
  width: 1190px;
  height: 60px;
  margin: 20px auto;
`;

const Button = styled.button`
  // 약관동의, 회원가입, 가입완료 버튼 css
  flex: 1;
  padding: 10px;
  margin: 0 -20px;
  border: none;
  border-radius: 50px;
  background-color: ${(props) => (props.active ? "#3e77ff" : "#DBE1E9")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  /* transition: background-color 0.5s; */
  position: relative;
  z-index: ${(props) => (props.active ? 10 : 1)};
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpToggle = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false);
  const steps = ["약관동의", "회원가입", "가입완료"];

  const handleButtonClick = (index) => {
    setActiveStep(index);
    if (index === 1) {
      // Show SignUp form when 'Sign Up' is clicked
      setShowSignUp(true);
    } else {
      setShowSignUp(false);
    }
  };

  return (
    <Container>
      <p className="pageName">회원가입</p>
      <StateContainer>
        {steps.map((step, index) => (
          <Button
            key={index}
            active={activeStep === index}
            onClick={() => handleButtonClick(index)}
          >
            {step}
          </Button>
        ))}
      </StateContainer>
      <PageWrapper>{showSignUp && <SignUp />}</PageWrapper>
    </Container>
  );
};

export default SignUpToggle;
