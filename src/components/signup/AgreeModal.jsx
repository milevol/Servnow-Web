// 목적: 회원가입 기능 구현
// 기능: 회원가입 약관동의 페이지 모달
// 2024.08.18/곤/장고은

import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: ${(props) => props.width || "1000px"};
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h3`
  margin-top: 20px;
  font-size: 24px;
  color: #000;
`;

const ModalLine = styled.hr`
  margin-top: 30px;
  border: 1.5px solid #3e77ff;
`;
const ModalBody = styled.div`
  margin: 20px 0;
  font-size: 16px;
  color: #333;
  white-space: pre-wrap; /* 줄 바꿈과 공백을 그대로 유지 */
`;

const ModalCloseButton = styled.button`
  background-color: #3e77ff;
  border: none;
  border-radius: 7px;
  color: #fff;
  padding: 8px 20px;
  cursor: pointer;
  float: right;
`;

const AgreeModal = ({ show, onClose, title, children, width }) => {
  if (!show) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} width={width}>
        <ModalHeader>{title}</ModalHeader>
        <ModalLine />
        <ModalBody>{children}</ModalBody>
        <ModalCloseButton onClick={onClose}>닫기</ModalCloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AgreeModal;
