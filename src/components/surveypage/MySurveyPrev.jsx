import styled from "styled-components";

export const SurveyBox = styled.div`
    width : 50%;
    height : 300px;
    margin-top : 20px;
    margin-bottom : 20px;
`;

export const SurveyContainer = styled.div`
    position: relative;
    height : 300px;
    width : 600px;
    align-content : grid;
    background-color : white;
    border-radius : 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SurveyStatusButton = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    height : 50px;
    width : 100px;
    background-color: white;
    color: ${props => props.finished === 'yes' ? '#5D6670' : '#4C76FE'};
    font-weight: bold;
    font-size : 20px;
    padding: 5px 10px;
    border-radius: 10px;
    display: grid;
    align-items : center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border : 0.5px solid rgba(0, 0, 0, 0.1);
    justify-items : center;
`;

export const SurveyImageContainer = styled.div`
    width : 600px;
    height : 180px;
    display: grid;
    align-content:center;
    font-weight : bolder;
    font-size : 20px;
    justify-content:center;
`;

export const SurveyTitleBox = styled.div`
    width : 600px;
    height : 60px;
    background-color : ${props => props.finished === 'yes' ? '#C5CCD5' : '#C6D3FF'};
    display: grid;
    align-content:center;
    font-weight : bolder;
    font-size : 20px;
    border-bottom : 2px solid black;
    justify-content:center;
`;

export const SurveyDateBox = styled.div`
    width : 600px;
    height : 60px;
    font-weight : bolder;
    font-size : 20px;
    display: grid;
    align-content:center;
    background-color : ${props => props.finished === 'yes' ? '#C5CCD5' : '#C6D3FF'};
    border-bottom-left-radius : 10px;
    border-bottom-right-radius : 10px;
    justify-content:center;
`;

const SurveyPrev = ({ survey }) => {
    return (
        <SurveyBox>
            <SurveyContainer finished={survey.finished}>
                <SurveyStatusButton finished={survey.finished}>
                    {survey.finished === 'yes' ? '종료' : '진행 중'}
                </SurveyStatusButton>
                <SurveyImageContainer>나와라 캐릭터~</SurveyImageContainer>
                <SurveyTitleBox finished={survey.finished}>{survey.title}</SurveyTitleBox>
                <SurveyDateBox finished={survey.finished}>{survey.date}</SurveyDateBox>
            </SurveyContainer>
        </SurveyBox>
    );
}

export default SurveyPrev;
