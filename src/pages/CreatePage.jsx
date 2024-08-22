import React, { useState } from "react";
import styled from "styled-components";
import pageIcon from "../assets/paper.png";
import timeIcon from "../assets/time.png";
import duplicateIcon from "../assets/duplicate.png";
import deleteIcon from "../assets/delete.png";

const Container = styled.div`
  height: 100%;
  padding: 48px 0;
  background-color: #f2f5ff;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  gap: 30px;
  font-size: 18px;
  margin-bottom: 60px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 13%;
  text-align: center;
`;

const Label = styled.div`
  width: 50%;
  padding: 6% 0;
  border-radius: 8px;
  background-color: ${(props) => (props.$isTitle ? "#8EA9FF" : "#C6D3FF")};
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  padding: 30px 40px;
  border-radius: 8px;
  background-color: white;
  color: #5d6670;

  :hover {
    cursor: ${(props) => (props.$isTitle ? "default" : "pointer")};
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;

  img {
    height: 16px;
    margin-right: 8px;
  }
`;

const CardContainer = styled.div`
  display: ${(props) => (props.$isTitle ? "flex" : "block")};
  flex-direction: ${(props) => (props.$isTitle ? "row" : "column")};
  gap: ${(props) => (props.$isTitle ? "2%" : "0")};
  width: 60%;
  padding: 24px;
  color: #5d6670;
  border-radius: 8px;
  background-color: ${(props) =>
    props.$isTitle ? "#8EA9FF" : props.$isContent ? "#fff" : "#C6D3FF"};

  div {
    border-radius: 8px;
    background-color: ${(props) =>
      props.$isTitle
        ? "transparent"
        : props.$isContent
        ? "#C6D3FF"
        : "#8EA9FF"};

    div {
      display: ${(props) => (props.$isTitle ? "flex" : "block")};
      align-items: ${(props) => (props.$isTitle ? "center" : "")};
      height: ${(props) => (props.$isTitle ? "16%" : "")};
      background-color: ${(props) =>
        props.$isTitle ? "#c6d3ff7e" : "#8EA9FF"};
    }
  }
  .backWhite {
    background-color: #fff;
  }

  #character {
    background-color: #06299e2a;
  }
`;

const ContentContainer = styled.div`
  width: 75%;
`;
const CharacterContainer = styled.div`
  width: 23%;
  border-radius: 8px;
  margin-top: 4%;
  padding-bottom: 20px;
  text-align: center;
`;

const CharacterContent = styled.p`
  font-size: 16px;
`;

const Title = styled.div`
  width: 40%;
  margin-bottom: 24px;
  padding: 20px 16px;
  input {
    font-size: 20px;
    font-family: "Pretendard Bold";
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding: 24px 16px;
  input {
    font-size: 14px;
  }
`;

const Select = styled.select`
  width: 50%;
  padding: 6% 0;
  border-radius: 8px;
  border: 1px solid #5f6c7225;
  text-align: center;
  font: 18px bold;
  cursor: pointer;
`;

const QuestionContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const QContainer = styled.div`
  width: 90%;
  margin-top: 20px;
`;

const QuestionTitle = styled.div`
  align-items: center;
  color: #061522;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;

  input::placeholder {
    font-weight: bold;
    font-size: 24px;
    color: #5d6670;
  }

  input {
    height: 40px;
    padding-left: 10px;
    font-size: 24px;
  }
`;

const QuestionNumber = styled.span`
  color: #4c76fe;
  font-size: 32px;
  margin: 0 8px 0 0;
`;

const QuestionDescription = styled.div`
  color: #5d6670;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 24px;
`;

const Textarea = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0);

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const ShortTextarea = styled.textarea`
  width: 100%;
  margin-top: 100px;
  border: 0px;
  border-bottom: 6px solid #e1e8ff;
  font-family: "Pretendard Blod";
  font-size: 15px;
  color: #5d6670;

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const Input = styled.input`
  width: 80%;
  border: none;
  background-color: rgb(0, 0, 0, 0);

  &:focus::placeholder {
    opacity: 0; /* 포커스를 받을 때 placeholder를 투명하게 만듦 */
  }

  &:focus {
    outline: none; /* 포커스 시 기본 아웃라인 제거 */
  }
`;

const ButtonContainer = styled.div`
  width: 10%;

  button {
    display: block;
    width: 100%;
    margin: 10px 0 5px 0;
  }

  .plural {
    background-color: #c5ccd5;
    color: #000;
  }

  .required {
    background-color: #4c76fe;
  }
`;

const Button = styled.button`
  width: 10%;
  height: 40px;
  border-radius: 8px;
  margin: 25px 30px 0 0;
  color: #fff;
  border: none;
  background-color: #001b6c;
  cursor: pointer;
`;
const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 30px;
  margin-right: 1%;
`;

const SelectContainer = styled.div`
  width: 17%;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  margin-left: 15%;
  border-radius: 8px;
  gap: 15px;

  label {
    font-weight: bold;
    width: 80px;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;

  /* 드롭다운 화살표 아이콘 추가 */
  background-image: url(${(props) =>
    props.isOpen ? "/arrowUp.png" : "/arrowDown.png"});
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;

  &:focus {
    border-color: #8ea9ff;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const AddButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 62.5%;
  margin: 30px 0 50px 15%;
  background-color: #fff;
  border-radius: 8px;
`;

const AddDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e5e5e5;
  margin: 0 40px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: 20px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  .icon {
    width: 20px;
    margin-right: 5px;
  }
`;

const AddContainer = styled.div``;

const CreatePage = () => {
  const MoveSection = () => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedSection, setSelectedSection] =
      useState("다음 섹션으로 진행하기");

    const handleChange = (event) => {
      setSelectedSection(event.target.value);
      setIsSelectOpen(false);
    };

    const toggleSelect = () => {
      setIsSelectOpen(!isSelectOpen);
    };

    return (
      <SelectContainer>
        <label htmlFor="sectionSelect">답변 후</label>
        <StyledSelect
          id="sectionSelect"
          value={selectedSection}
          onChange={handleChange}
          onClick={toggleSelect}
          isOpen={isSelectOpen}
        >
          <option value="다음 섹션으로 진행하기" disabled>
            다음 섹션으로 진행하기
          </option>
          <option value="섹션 1으로 이동">섹션 1으로 이동</option>
          <option value="섹션 2으로 이동">섹션 2으로 이동</option>
          <option value="섹션 3으로 이동">섹션 3으로 이동</option>
          <option value="섹션 4으로 이동">섹션 4으로 이동</option>
        </StyledSelect>
      </SelectContainer>
    );
  };

  const AddQuestion = () => {
    return (
      <AddButtonsContainer>
        <AddButton>
          <img src="/surveyCreateAddIcon.png" className="icon" />
          질문 추가
        </AddButton>
        <AddDivider />
        <AddButton>
          <img src="/surveyCreateAddIcon.png" className="icon" />
          섹션 추가
        </AddButton>
      </AddButtonsContainer>
    );
  };

  const Card = ({ type }) => {
    switch (type) {
      case "title":
        return (
          <Wrapper>
            <LabelWrapper>
              <Label $isTitle={true}>표지</Label>
              <MenuContainer $isTitle={true}>
                <Menu>
                  <img src={pageIcon} />
                  질문 갯수
                </Menu>
                <Menu>
                  <img src={timeIcon} />
                  소요 시간
                </Menu>
              </MenuContainer>
            </LabelWrapper>
            <CardContainer $isTitle={true}>
              <ContentContainer>
                <Title>
                  <Input
                    type="text"
                    placeholder="설문지 제목을 입력해주세요."
                  />
                </Title>
                <Content>
                  <Textarea
                    type="text"
                    placeholder="설문지 제작자에 대한 간단한 소개를 입력해주세요."
                  />
                </Content>
                <Content>
                  <Textarea
                    type="text"
                    placeholder="설문지에 대한 간단한 소개를 입력해주세요."
                  />
                </Content>
              </ContentContainer>
              <CharacterContainer id="character">
                <img src="/logo1.png" alt="캐릭터 로고1" />
                <CharacterContent>캐릭터 변경이 가능해요.</CharacterContent>
              </CharacterContainer>
            </CardContainer>
          </Wrapper>
        );
      case "section":
        return (
          <Wrapper>
            <LabelWrapper>
              <Label>섹션 1</Label>
              <MenuContainer>
                <Menu>
                  <img src={duplicateIcon} />
                  섹션 복제
                </Menu>
                <Menu>
                  <img src={deleteIcon} />
                  섹션 삭제
                </Menu>
              </MenuContainer>
            </LabelWrapper>
            <CardContainer>
              <Title>
                <Input type="text" placeholder="섹션 내용을 입력해 주세요." />
              </Title>
              <Content>
                <Input type="text" placeholder="섹션 내용을 입력해 주세요." />
              </Content>
            </CardContainer>
          </Wrapper>
        );
      case "select":
        return (
          <QuestionWrapper>
            <Wrapper>
              <LabelWrapper>
                <Select>
                  <option value="객관식" selected>
                    객관식
                  </option>
                  <option value="주관식">주관식</option>
                </Select>
              </LabelWrapper>
              <CardContainer $isContent={true}>
                <QuestionContainer className="backWhite">
                  <QContainer className="backWhite">
                    <QuestionTitle className="backWhite">
                      <QuestionNumber>1.</QuestionNumber>
                      <Input
                        type="text"
                        placeholder="질문 1의 내용이 들어갈 자리입니다."
                      />
                    </QuestionTitle>
                    <QuestionDescription className="backWhite">
                      <Input
                        type="text"
                        placeholder="질문 1의 설명이 들어갈 자리입니다. (선택)"
                      />
                    </QuestionDescription>
                  </QContainer>
                  <ButtonContainer className="backWhite">
                    <Button className="required">필수응답</Button>
                    <Button className="plural">복수응답</Button>
                  </ButtonContainer>
                </QuestionContainer>
                <Content>
                  <Img src="/surveyCreateRound.png" />
                  <Input type="text" placeholder="항목 1의 자리입니다." />
                </Content>
                <Content>
                  <Img src="/surveyCreateRound.png" />
                  <Input type="text" placeholder="항목 2의 자리입니다." />
                </Content>
                <Button className="addBtn">기타추가</Button>
                <Button className="addBtn">선택지 추가</Button>
              </CardContainer>
            </Wrapper>
            <AddContainer>
              <MoveSection />
              <AddQuestion />
            </AddContainer>
          </QuestionWrapper>
        );
      case "text":
        return (
          <QuestionWrapper>
            <Wrapper>
              <LabelWrapper>
                <Select>
                  <option value="객관식">객관식</option>
                  <option value="주관식" selected>
                    주관식
                  </option>
                </Select>
              </LabelWrapper>
              <CardContainer $isContent={true}>
                <QuestionContainer className="backWhite">
                  <QContainer className="backWhite">
                    <QuestionTitle className="backWhite">
                      <QuestionNumber>2.</QuestionNumber>
                      <Input
                        type="text"
                        placeholder="질문 2의 내용이 들어갈 자리입니다."
                      />
                    </QuestionTitle>
                    <QuestionDescription className="backWhite">
                      <Input
                        type="text"
                        placeholder="질문 2의 설명이 들어갈 자리입니다. (선택)"
                      />
                    </QuestionDescription>
                  </QContainer>
                  <ButtonContainer className="backWhite">
                    <Button className="required">필수응답</Button>
                  </ButtonContainer>
                </QuestionContainer>
                <ShortTextarea
                  cacheMeasurements
                  placeholder="질문 2번의 답변이 들어갈 자리입니다."
                />
              </CardContainer>
            </Wrapper>
            <AddContainer>
              <MoveSection />
              <AddQuestion />
            </AddContainer>
          </QuestionWrapper>
        );

      default:
        break;
    }
  };

  return (
    <Container>
      <Card type={"title"} />
      <Card type={"section"} />
      <Card type={"select"} />
      <Card type={"text"} />
    </Container>
  );
};

export default CreatePage;
