// 목적: 회원가입 화면 속 가입완료 화면 구현
// 기능: 약관동의페이지
// 2024.07.25/곤/장고은
// 추가되어야 할 기능: 로그인 버튼 클릭 시 로그인 페이지로 이동

import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/signup/AgreeModal";

// 약관 파일 불러오기
import TERMS_OF_SERVICE_CONTENT from "../../assets/Agreement/termsOfService";
import PRIVACY_POLICY_CONTENT from "../../assets/Agreement/privacyPolicy";
import MARKETING_CONTENT from "../../assets/Agreement/marketingConsent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

/* 약관동의 css */
const Title = styled.h2`
  margin-bottom: -20px;
  font-size: 25px;
  font-weight: blod;
  color: #061522;
`;

/* 전체 동의합니다 아래 세부 내용 css */
const AgreementContainer = styled.div`
  width: 80%;
  margin-bottom: 20px;

  #pStyle {
    margin-top: 25px;
    margin-left: 78px;
    color: #5d6670;
  }
`;

/* 체크박스 + 세부 항목 css */
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 60px -80px 10px 0;
`;

/* 체크박스 css */
const CustomCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #c5ccd5;
  margin-right: 10px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #3e77ff;
  }
`;

/* 세부 항목 css */
const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 23px;
  font-weight: bold;
`;

/* 내용보기 버튼 css */
const TermsDetailsButton = styled.button`
  margin-left: auto;
  background-color: #3e77ff;
  border: none;
  border-radius: 7px;
  color: #fff;
  padding: 8px 31px 7px;
  cursor: pointer;
`;

/* 다음 버튼 css */
const SubmitButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #3e77ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
`;

/* 메인 컴포넌트 */

const SignUpTermsAgreement = ({ setActiveStep }) => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  });

  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const handleAgreeAllChange = (e) => {
    const checked = e.target.checked;
    setAgreeAll(checked);
    setAgreements({
      termsOfService: checked,
      privacyPolicy: checked,
      marketing: checked,
    });
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  React.useEffect(() => {
    setAgreeAll(
      agreements.termsOfService &&
        agreements.privacyPolicy &&
        agreements.marketing
    );
  }, [agreements]);

  const isNextEnabled = agreements.termsOfService && agreements.privacyPolicy;

  const handleModalOpen = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
  };

  const handleModalClose = () => {
    setModalContent(null);
  };

  return (
    <Container>
      <Title>약관동의</Title>
      <AgreementContainer>
        <CheckboxContainer>
          <CustomCheckbox
            type="checkbox"
            checked={agreeAll}
            onChange={handleAgreeAllChange}
          />
          <CheckboxLabel>전체 동의합니다.</CheckboxLabel>
        </CheckboxContainer>
        <p id="pStyle">
          전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
          개별적으로도 동의를 선택하실 수 있습니다. 선택항목에 대한 동의를
          거부하는 경우에도 회원가입 서비스는 이용 가능합니다.
        </p>
      </AgreementContainer>
      <AgreementContainer>
        <CheckboxContainer>
          <CustomCheckbox
            type="checkbox"
            name="termsOfService"
            checked={agreements.termsOfService}
            onChange={handleAgreementChange}
          />
          <CheckboxLabel>이용약관 동의 (필수)</CheckboxLabel>
          <TermsDetailsButton
            onClick={() =>
              handleModalOpen("이용약관", TERMS_OF_SERVICE_CONTENT)
            }
          >
            내용보기
          </TermsDetailsButton>
        </CheckboxContainer>
        <CheckboxContainer>
          <CustomCheckbox
            type="checkbox"
            name="privacyPolicy"
            checked={agreements.privacyPolicy}
            onChange={handleAgreementChange}
          />
          <CheckboxLabel>
            개인정보 수집 및 이용에 대한 동의 (필수)
          </CheckboxLabel>
          <TermsDetailsButton
            onClick={() =>
              handleModalOpen(
                "개인정보 수집 및 이용 동의",
                PRIVACY_POLICY_CONTENT
              )
            }
          >
            내용보기
          </TermsDetailsButton>
        </CheckboxContainer>
        <CheckboxContainer>
          <CustomCheckbox
            type="checkbox"
            name="marketing"
            checked={agreements.marketing}
            onChange={handleAgreementChange}
          />
          <CheckboxLabel>마케팅 활용 동의 (선택)</CheckboxLabel>
          <TermsDetailsButton
            onClick={() =>
              handleModalOpen("마케팅 활용 동의", MARKETING_CONTENT)
            }
          >
            내용보기
          </TermsDetailsButton>
        </CheckboxContainer>
      </AgreementContainer>
      <SubmitButton disabled={!isNextEnabled} onClick={() => setActiveStep(1)}>
        다음
      </SubmitButton>

      {/* 모달 창 */}
      <Modal
        show={!!modalContent}
        onClose={handleModalClose}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </Container>
  );
};

export default SignUpTermsAgreement;
