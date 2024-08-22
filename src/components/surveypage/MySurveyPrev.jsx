import { useState, useEffect } from "react";
import styled from "styled-components";

export const SurveyBox = styled.div`
    width : 40%;
    position: relative;
    aspect-ratio: 552/272;
`;

export const SurveyContainer = styled.div`
    position: relative;
    height : 100%;
    width : 100%;
    background-color : white;
    border-radius : 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SurveyStatusButton = styled.div`
    position: absolute;
    margin-top: 9px;
    margin-left: 8px;
    height : 9%;
    width : 11%;
    padding : 15px 27px 14.8px;
    background-color: white;
    font-family: "PRETENDARD";
    color: ${props => props.finished === 'yes' ? '#5D6670' : '#4C76FE'};100%
    font-weight: bold;
    font-size : 21px;
    border-radius: 12px;
    display: grid;
    align-items : center;
    border : 0.5px solid rgba(0, 0, 0, 0.1);
    justify-items : center;
`;

export const SurveyImageContainer = styled.div`
    width : 100%;
    height : 67%;
    display: grid;
    font-weight : bolder;
    font-size : 20px;
`;

export const CharacterBox = styled.div`
    height : 88%;
    width : 16.5%;
    margin-top : 1%;
    margin-left : 42%;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
`

export const SurveyTitleBox = styled.div`
    width : 100%;
    height : 19%;
    background-color : ${props => props.finished === 'yes' ? '#C5CCD5' : '#C6D3FF'};
    display: grid;
    align-content:center;
    font-weight : 600;
    font-size : 22px;
    border-bottom : 1px solid #5d6670;
    justify-content:center;
`;

export const SurveyDateBox = styled.div`
    width : 100%;
    height : 14%;
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

      const [finished, setFinished] = useState("no");

      useEffect(() => {
          const checkIfFinished = () => {
              const currentTime = new Date();
              const expirationTime = new Date(survey.expiredAt);
  
              if (currentTime > expirationTime) {
                  setFinished("yes");
              } else {
                  setFinished("no");
              }
          };
  
          checkIfFinished();
      }, [survey.expiredAt]);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        const ampm = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours > 12 ? hours - 12 : hours;
    
        return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${minutes}`;
    };

    return (
        <SurveyBox>
            <SurveyContainer finished={finished}>
                <SurveyStatusButton finished={finished}>
                    {finished === 'yes' ? '종료' : '진행 중'}
                </SurveyStatusButton>
                <SurveyImageContainer>
                    <CharacterBox backgroundImage={`../../public/${characterURL}.png`}/>
                </SurveyImageContainer>
                <SurveyTitleBox finished={finished}>{survey.title}</SurveyTitleBox>
                <SurveyDateBox finished={finished}>{formatDate(survey.expiredAt)}</SurveyDateBox>
            </SurveyContainer>
        </SurveyBox>
    );
}

export default SurveyPrev;
