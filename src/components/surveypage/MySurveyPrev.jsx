import styled from "styled-components";

export const SurveyBox = styled.div`
    width : 552px;
    height : 272px;
    margin-bottom : 53px;
    margin-right : 57px;
`;

export const SurveyContainer = styled.div`
    position: relative;
    height : 272px;
    width : 552px;
    align-content : grid;
    background-color : white;
    border-radius : 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SurveyStatusButton = styled.div`
    position: absolute;
    margin-top: 9px;
    margin-left: 8px;
    height : 25px;
    width : 60px;
    padding : 15px 27px 14.8px;
    background-color: white;
    color: ${props => props.finished === 'yes' ? '#5D6670' : '#4C76FE'};
    font-weight: bold;
    font-size : 21px;
    border-radius: 12px;
    display: grid;
    align-items : center;
    border : 0.5px solid rgba(0, 0, 0, 0.1);
    justify-items : center;
`;

export const SurveyImageContainer = styled.div`
    width : 552px;
    height : 182px;
    display: grid;
    align-content:center;
    font-weight : bolder;
    font-size : 20px;
    justify-content:center;
`;

export const SurveyTitleBox = styled.div`
    width : 552px;
    height : 51px;
    background-color : ${props => props.finished === 'yes' ? '#C5CCD5' : '#C6D3FF'};
    display: grid;
    align-content:center;
    font-weight : 600;
    font-size : 22px;
    border-bottom : 1px solid #5d6670;
    justify-content:center;
`;

export const SurveyDateBox = styled.div`
    width : 552px;
    height : 38px;
    color: #5d6670;
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
