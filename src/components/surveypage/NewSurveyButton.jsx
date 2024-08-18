import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NewsurveyButton = styled.div`
    width : 80px;
    height : 80px;
    padding-top : 0px;
    padding-bottom : 0px;
    padding-left : 0px;
    padding-right : 0px;
    text-align : center;
    border-radius : 40px;
    background-color : #4C76FE;
    color : white;
    font-size : 70px;
    font-weight : bolder;
`;

const NewSurveyButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/make");
    };

    return (
        <NewsurveyButton onClick={handleClick}>+</NewsurveyButton>
    )
};

export default NewSurveyButton;