// 목적: 설문지 등록 모달
// 기능: 설문지 등록
// 2024.08.02/곤/장고은
// 추가되어야 할 기능:

import React, { useState } from "react";
import SurveyModal from "../components/SurveyModal";

const SurveyModalPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        id="open"
        onClick={() => {
          console.log("모달이 켜짐");
          setModalOpen(true);
        }}
      >
        등록/배포하기
      </button>
      <SurveyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
export default SurveyModalPage;
