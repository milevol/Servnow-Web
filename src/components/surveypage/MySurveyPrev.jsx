import { useState, useEffect } from "react";
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
    justify-content: start;
`;


export const CharacterBox = styled.div`
    height : 160px;
    width : 91px;
    margin-top : 17px;
    margin-left : 232px;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
`

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
    const characters = [
        {value: "TYPE_ONE", label: "character1"},
        {value: "TYPE_TWO", label: "character2"},
        {value: "TYPE_THREE", label: "character3"},
        {value: "TYPE_FOUR", label: "character4"},
        {value: "TYPE_FIVE", label: "character5"},
        {value: "TYPE_SIX", label: "character6"},
        {value: "TYPE_SEVEN", label: "character7"},
        {value: "TYPE_EIGHT", label: "character8"},
        {value: "TYPE_NINE", label: "character9"},
        {value: "TYPE_TEN", label: "character10"},
        {value: "TYPE_ELEVEN", label: "character11"},
    ]

    const [characterURL, setCharacterURL] = useState("")
    useEffect(() => {
        const character = characters.find(character => character.value === survey.characterType);
        if (character) {
          setCharacterURL(character.label);
        }
      }, [survey.characterType]);

    return (
        <SurveyBox>
            <SurveyContainer finished={survey.finished}>
                <SurveyStatusButton finished={survey.finished}>
                    {survey.finished === 'yes' ? '종료' : '진행 중'}
                </SurveyStatusButton>
                <SurveyImageContainer>
                    <CharacterBox backgroundImage={`../../src/assets/servnow_character/${characterURL}.png`}/>
                </SurveyImageContainer>
                <SurveyTitleBox finished={survey.finished}>{survey.title}</SurveyTitleBox>
                <SurveyDateBox finished={survey.finished}>{survey.expiredAt}</SurveyDateBox>
            </SurveyContainer>
        </SurveyBox>
    );
}

export default SurveyPrev;
