import styled from "styled-components";
import AnswerCard from "../components/answer/AnswerCard";

const Container = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background-color: #f2f5ff;
`;

const AnswerPage = () => {
  return (
    <Container>
      <AnswerCard type="radio" />
      {/* <AnswerCard type="checkbox" />
      <AnswerCard type="text" /> */}
    </Container>
  );
};

export default AnswerPage;
