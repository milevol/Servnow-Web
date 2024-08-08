//목적: 설문조사 페이지의 색상등을 조정할 수 있는 꾸미기 담당 컴포넌트
//기능: 메인색상, 서브색상, 글꼴, 메인캐릭터 지정 기능
//2024.08.07 데이-이연
//더 추가할 기능: 전역으로 상태관리 지정, api 연결

import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

import character1 from '../assets/servnow_character/character1.png';
import character2 from '../assets/servnow_character/character2.png';
import character3 from '../assets/servnow_character/character3.png';
import character4 from '../assets/servnow_character/character4.png';
import character5 from '../assets/servnow_character/character5.png';
import character6 from '../assets/servnow_character/character6.png';
import character7 from '../assets/servnow_character/character7.png';
import character8 from '../assets/servnow_character/character8.png';
import character9 from '../assets/servnow_character/character9.png';
import character10 from '../assets/servnow_character/character10.png';
import character11 from '../assets/servnow_character/character11.png';

const CustomizationPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 500px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 75vh;
  overflow-y: auto;
`;
const TitleSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const Title = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: ${props => (props.selected ? '#4c76fe' : '#b6b6b6')};
  cursor: pointer;
  margin-left: 6rem;
  margin-right: 6rem;
`;

const HorizontalLine = styled.div`
  width: 520px;
  height: 2px;
  background: ${props =>
    props.selectedTab === 'customization'
    ? 'linear-gradient(to right, #4c76fe 50%, #b6b6b6 50%)'
    : 'linear-gradient(to right, #b6b6b6 50%, #4c76fe 50%)'
  };
  margin-bottom: 30px;
`;

const ColorSelection = styled.div`
  margin-bottom: 0px;
`;

const MainLabel = styled.label`
  display: block;
  color: #000000;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  color: #5D6670;
  margin-bottom: 10px;
  margin-top: 0.8rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const FontLabel = styled.label`
  display: block;
  color: #061522;
  margin-left: 0.5rem;
  margin-bottom: 10px;
  font-weight: bold;
`;

const ColorPickerWrapper = styled.div`
  margin-bottom: -10px;
  margin-left: 1.5rem;
  .chrome-picker {
    width: 95% !important;
    box-shadow: none !important;
    border-radius: 10px !important;
  }
`;

const ColorInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ColorInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const TextInputContainer = styled.div`
  position: relative;
  width: fit-content;
  margin-left: 0.5rem;
  margin-top: 5px;
`;

const TextInput = styled.input`
  width: 16rem;
  padding: 0.8rem;
  padding-right: 3rem;
  font-size: 0.9rem;
  border: 1px solid #E6E6E6;
  border-radius: 10px;
  box-sizing: border-box;
  font-weight: bold;
`;
const ColorBox = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background-color: ${ props => props.color || 'transparent'};
  border: 1px solid #ccc;
  border-radius: 5px;
`

const FontInput = styled.input`
  width: 29rem;
  font-size: 1rem;
  padding: 0.8rem;
  border: 1px solid #E6E6E6;
  border-radius: 10px;
  box-sizing: border-box;
  margin-left: 0.5rem;
  margin-top: 5px;
`;

const MainCharacterSelection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
`;

const CharacterLabel = styled.label`
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const CharacterSelectionContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px;
  margin-left: 0rem;
`
const CharacterImage = styled.div`
  width: 110px;
  height: 150px;
  border: 5px solid ${props => (props.selected ? '#007bff' : '#ccc')};
  border-radius: 10px;
  background-color: #BAC5ED;
  background-size: cover;
  background-position: center;
  margin-right: 10px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

const FontSelection = styled.div`
  margin-bottom: 20px;
`;

const CustomizationSidebar = () => {
  const [mainColor, setMainColor] = useState('#BAC5ED');
  const [subColor, setSubColor] = useState('#4C76FE');
  const [mainCharacter, setMainCharacter] = useState('');
  const [font, setFont] = useState('Pretendard');
  const [colorChoice, setColorChoice] = useState('main');
  const [selectedTab, setSelectedTab] = useState('customization');
  const characterImages = [
    character1,
    character2,
    character3,
    character4,
    character5,
    character6,
    character7,
    character8,
    character9,
    character10,
    character11,
  ]
  //메인색상 혹은 서브색상 필드를 눌렀을때 colorChoice state 확인해서 색상변경
  const handleColorChange = (color) => {
    if (colorChoice === 'main') {
      setMainColor(color.hex);
    } else if (colorChoice === 'sub') {
      setSubColor(color.hex);
    }
  };
  // 메인색상 혹은 서브색상 필드를 클릭했을때 colorChice의 상태를 변경
  const handleColorInputClick = (choice) => {
    setColorChoice(choice);
  };
  //메인 캐릭터가 변경됐을 때 mainCharacter의 상태를 변경
  const handleMainCharacterChange = (character) => {
    setMainCharacter(character);
  };

  return (
    <CustomizationPanel>
      <TitleSection>
      <TitleContainer>
        <Title
          selected={selectedTab === 'customization'} 
          onClick={() => setSelectedTab('customization')}>
            꾸미기
        </Title> 
        <Title
          selected={selectedTab === 'structure'}
          onClick={() => setSelectedTab('structure')}>
            구조도
          </Title>
      </TitleContainer>
      <HorizontalLine  selectedTab={selectedTab}/>
      </TitleSection>
      
      {selectedTab === 'customization' ? (
     <>
      <ColorSelection>
        <MainLabel htmlFor="color-picker">색상 선택</MainLabel>
        <ColorPickerWrapper>
          <ChromePicker
            color={colorChoice === 'main' ? mainColor : subColor}
            onChangeComplete={handleColorChange}
            disableAlpha
          />
        </ColorPickerWrapper>
      </ColorSelection>
      <ColorInputs>
        <ColorInput>
          <Label htmlFor="main-color">메인 색상</Label>
          <TextInputContainer>
            <TextInput
              type="text"
              id="main-color"
              value={mainColor}
              color={mainColor}
              readOnly
              onClick={() => handleColorInputClick('main')}
            />
            <ColorBox color={mainColor} />
          </TextInputContainer>
        </ColorInput>
        <ColorInput>
          <Label htmlFor="sub-color">서브 색상</Label>
          <TextInputContainer>
            <TextInput
              type="text"
              id="sub-color"
              value={subColor}
              color={subColor}
              readOnly
              onClick={() => handleColorInputClick('sub')}
            />
            <ColorBox color={subColor} />
          </TextInputContainer>
        </ColorInput>
      </ColorInputs>
      <FontSelection>
        <FontLabel htmlFor="font-select">글꼴 선택</FontLabel>
        <FontInput type="text" id="font-select" value={font} onChange={(e) => setFont(e.target.value)} />
      </FontSelection>
      <MainCharacterSelection>
        <CharacterLabel htmlFor="main-character">설문 커버 캐릭터 변경</CharacterLabel>
        <CharacterSelectionContainer>
          {characterImages.map((image, index) => (
            <CharacterImage
              key={index}
              style={{ backgroundImage: `url(${image})`}}
              selected={mainCharacter === image}
              onClick={() => handleMainCharacterChange(image)}
            />
          ))}
        </CharacterSelectionContainer>
      </MainCharacterSelection>
      </>
      ) :
      (
        <div></div>
      )}
    </CustomizationPanel>
  );
};

export default CustomizationSidebar;