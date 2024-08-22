//목적: 설문조사 페이지의 색상등을 조정할 수 있는 꾸미기 담당 컴포넌트
//기능: 메인색상, 서브색상, 글꼴, 메인캐릭터 지정 기능
//2024.08.07 데이-이연
//더 추가할 기능: 전역으로 상태관리 지정, api 연결

import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import StructureDiagram from './StructureDiagram';
import { useSelector, useDispatch } from 'react-redux';
import { setMainColor, setSubColor, setFont, setMainCharacter } from '../../redux/customizationSlice';

const CustomizationPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 773px;  
  height: 730px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  margin-left: 10rem;
  margin-right: 10rem;
`;

const HorizontalLine = styled.div`
  width: 795px;
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
  font-size: 18px;
`;

const Label = styled.label`
  display: block;
  color: #5D6670;
  margin-bottom: 10px;
  margin-top: 0.8rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const ColorPickerWrapper = styled.div`
  margin-bottom: -10px;
  margin-left: 4rem;
  .chrome-picker {
    width: 90% !important;
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
    margin-left: 1rem;
`;

const TextInputContainer = styled.div`
  position: relative;
  width: fit-content;
  margin-left: 0.5rem;
  margin-top: 5px;
`;

const TextInput = styled.input`
  width: 18rem;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  border: 1px solid #E6E6E6;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
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

const FontLabel = styled.label`
  display: block;
  color: #061522;
  margin-left: 1rem;
  margin-bottom: 10px;
  font-weight: bold;
`;

const FontInput = styled.input`
  width: 46rem;
  font-size: 1.1rem;
  padding: 1rem;
  border: 1px solid #E6E6E6;
  border-radius: 10px;
  box-sizing: border-box;
  margin-left: 1rem;
  margin-top: 5px;
`;

const MainCharacterSelection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  margin-left: 0.5rem;
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
  width: 150px;
  height: 200px;
  border: 5px solid ${props => (props.selected ? '#007bff' : '#ccc')};
  border-radius: 10px;
  background-color: #BAC5ED;
  background-size: cover;
  background-position: center;
  margin-right: 15px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border-color: #007bff;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 102px;
  height: 42px;
  padding: 10px;
  border: none;
  border-radius: 8px;
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

  const dispatch = useDispatch();
  const { mainColor, subColor, font, mainCharacter } = useSelector(state => state.customization);
  // const [mainColor, setMainColor] = useState('#BAC5ED');
  // const [subColor, setSubColor] = useState('#4C76FE');
  // const [mainCharacter, setMainCharacter] = useState('/character1.png');
  // const [font, setFont] = useState('Pretendard');
  const [colorChoice, setColorChoice] = useState('main');
  const [selectedTab, setSelectedTab] = useState('customization');
  
  const characterImages = [
    '/character1.png',
    '/character2.png',
    '/character3.png',
    '/character4.png',
    '/character5.png',
    '/character6.png',
    '/character7.png',
    '/character8.png',
    '/character9.png',
    '/character10.png',
    '/character11.png',
  ]

  //메인색상 혹은 서브색상 필드를 눌렀을때 colorChoice state 확인해서 색상변경
  const handleColorChange = (color) => {
    if (colorChoice === 'main') {
      dispatch(setMainColor(color.hex));
    } else if (colorChoice === 'sub') {
      dispatch(setSubColor(color.hex));
    }
  };
  // 메인색상 혹은 서브색상 필드를 클릭했을때 colorChice의 상태를 변경
  const handleColorInputClick = (choice) => {
    setColorChoice(choice);
  };
  const handleFontChange = (font) => {
    dispatch(setFont(font));
  }
  //메인 캐릭터가 변경됐을 때 mainCharacter의 상태를 변경
  const handleMainCharacterChange = (character) => {
    dispatch(setMainCharacter(character));
  };
  const handleSave = () => {
    // 필요한 경우 저장 동작 구현
    console.log('Settings saved:', { mainColor, subColor, font, mainCharacter });
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
        <FontInput type="text" id="font-select" value={font} onChange={(e) => handleFontChange(e.target.value)} />
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
      <ButtonContainer>
        <SubmitButton onClick={handleSave}>저장</SubmitButton>
      </ButtonContainer>
      </>
      ) :
      (
        <StructureDiagram />
      )}
    </CustomizationPanel>
  );
};

export default CustomizationSidebar;