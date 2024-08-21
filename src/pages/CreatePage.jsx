import React from "react";
import styled from "styled-components";
import pageIcon from "../assets/paper.png";
import timeIcon from "../assets/time.png";
import duplicateIcon from "../assets/duplicate.png";
import deleteIcon from "../assets/delete.png";

const CreatePage = () => {
  const Container = styled.div`
    height: 100vh;
    padding: 48px 0;
    background-color: #f2f5ff;
  `;

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    font-size: 18px;
    margin-bottom: 24px;
  `;

  const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 20%;
    text-align: center;
  `;

  const Label = styled.div`
    width: 40%;
    padding: 6% 0;
    border-radius: 8px;
    background-color: ${(props) => (props.$isTitle ? "#8EA9FF" : "#C6D3FF")};
  `;

  const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    padding: 12px 24px;
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
    width: 50%;
    padding: 24px;
    color: #5d6670;
    border-radius: 8px;
    background-color: ${(props) => (props.$isTitle ? "#8EA9FF" : "#C6D3FF")};

    div {
      border-radius: 8px;
      background-color: ${(props) => (props.$isTitle ? "#C6D3FF80" : "#8EA9FF")};
    }
  `;

  const Title = styled.div`
    width: 40%;
    margin-bottom: 24px;
    padding: 20px 16px;
    font-family: "Pretendard Bold";
    font-size: 20px;
  `;

  const Content = styled.div`
    margin-top: 12px;
    padding: 24px 16px;
    font-size: 16px;
  `;

  const SectionContainer = styled.div``;

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
              <Title>설문지 제목을 입력해주세요.</Title>
              <Content>설문지 제작자에 대한 간단한 소개를 입력해주세요.</Content>
              <Content>설문지에 대한 간단한 소개를 입력해주세요.</Content>
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
              <Title>섹션 내용을 입력해 주세요.</Title>
              <Content>섹션 내용을 입력해 주세요.</Content>
            </CardContainer>
          </Wrapper>
        );
      case "select":
        return (
          <Wrapper>
            <LabelWrapper>
              <Label>섹션 1</Label>
              <Menu></Menu>
            </LabelWrapper>
          </Wrapper>
        );
      case "text":
        return (
          <Wrapper>
            <LabelWrapper>
              <Label>섹션 1</Label>
              <Menu></Menu>
            </LabelWrapper>
          </Wrapper>
        );

      default:
        break;
    }
  };

  return (
    <Container>
      <Card type={"title"} />
      <Card type={"section"} />
    </Container>
  );
};

export default CreatePage;
