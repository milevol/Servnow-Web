import { useState, useEffect } from 'react';
import SurveyPrev from '../../components/surveypage/MySurveyPrev';
import styled, { css } from 'styled-components';
import Navbar from '../../components/Navbar';
import NewSurveyButton from '../../components/surveypage/NewSurveyButton';
import Arrow from '../../components/surveypage/SurveyArrow';
import axios from 'axios';

export const MyPageContainer = styled.div`
    height : 100%;
    width : 100%;
    background-color : #F2F5FF;
    display : grid;
    contents-align : center;
`;

export const MyPageTotalContainer = styled.div`
    height : 100%;
    min-height: 100vh;
    width : 85%;
    padding-left: 15%;
    margin-bottom: 60px;
`;

export const SurveyOnerContainer = styled.div`
    height : 57px;
    width : 78px;
    margin-top : 116px;
    text-align : left;
    font-size : 48px;
    font-weight : 800;
    display: flex;
    align-items: center;
`;

export const TortalSurveyContainer = styled.div`
    display : flex;
    flex-wrap : wrap;
    padding-top : 5%;
    align-self : center;
    gap: 50px;
`;

export const SurveyBox = styled.div`
    width : 40%;
    position: relative;
    aspect-ratio: 552/272;
`;

export const NewSurveyBox = styled.div`
    width : 100%;
    height : 100%;
    background-color : white;
    display : grid;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    justify-items: center;
    border-radius : 10px;
`;

export const CreateNewSurvey = styled.div`
    padding-top : 30px;
    color : #061522;
    font-size : 22px;
    font-weight : 600;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 44px;
  padding-top: 11px;
  padding-bottom: 9px;
`;

const DropdownButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  font-family: 'PRETENDARD';
  width : 120px;
  height : 37px;
  border-radius: 8px;
  padding: 10px 12px 10px 15px;
  font-size: 14px;
  font-weight : 600;
  color: #212529;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  ${props => (props.isOpen ? 'border-radius' : '10px 10px 0px 0px')};
`;

const DropdownMenu = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f8f9fa;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 0px 0px 10px 10px;
`;

const DropdownItem = styled.div`
  color: #061522;
  padding: 12px 16px;
  font-size: 14px;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
    color : #3E77FF;
  }
`;

const MyAnsweredPage = () => {
    const result = [
        {
            surveyId: 1,
            title: '추석날 아침메뉴 추천',
            description: 'Description for movie 1',
            expiredAt: '2024-09-13T19:23:10.111Z',
            finished: 'no',
            characterType: "TYPE_FOUR"
        },
        {
            surveyId: 2,
            title: '추석 점심메뉴를 추천해주세요...',
            description: 'Description for movie 2',
            expiredAt: '2024-09-15T16:53:10.111Z',
            finished: 'no',
            characterType: "TYPE_ELEVEN"
        },
        {
            surveyId: 3,
            title: '대학생 맛집 게시판 필요조사',
            description: 'Description for movie 3',
            expiredAt: '2024-06-02T12:00:00.000Z',
            finished: 'yes',
            characterType: "TYPE_SEVEN"
        }
    ];

    const [sortOrder, setSortOrder] = useState('latest');
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState("최신 순");

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (sortType) => {
        setSortOrder(sortType);
        setIsOpen(false);
        setOrder(orders.find(order => order.value === sortType).label);
    };

    const orders = [
        {value: 'latest', label : "최신 순"},
        {value: 'oldest', label : "오래된 순"},
        {value: 'participants', label : "참여자 순"}
    ]
    
    const getToken = () => {
        return (
          sessionStorage.getItem("accessToken") ||
          localStorage.getItem("accessToken")
        );
      };

    const [surveys, setSurveys] = useState([]);

    const getSurveyData = async (sortOrder) => {
        try {
            const token = getToken();
            const response = await axios.get(`/api/v1/users/me/survey?sort=${sortOrder}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // response.data.survey가 배열인지 확인하고, 그렇지 않으면 빈 배열로 초기화
            if (Array.isArray(response.data.data)) {
                setSurveys(response.data.data);
            } else {
                console.error("Unexpected data format:", response.data);
                setSurveys([]); // 잘못된 형식이 오면 빈 배열로 초기화
            }
        } catch (err) {
            console.error("Error fetching survey data", err);
            setSurveys([]);  // 오류가 발생하면 빈 배열로 초기화
        }
    };

    useEffect(() => {
        getSurveyData('newest');  // 초기 로딩 시 최신 순으로 데이터를 가져옴
    }, []);

    return (
        <MyPageContainer>
            <Navbar />
            <MyPageTotalContainer>
                <SurveyOnerContainer>
                    MY
                    <DropdownContainer>
                        <DropdownButton onClick={toggleDropdown}>
                            {order}
                            <Arrow isOpen={isOpen} />
                        </DropdownButton>
                        <DropdownMenu isOpen={isOpen}>
                            <DropdownItem onClick={() => handleSelect('participants')}>참여자 순</DropdownItem>
                            <DropdownItem onClick={() => handleSelect('oldest')}>오래된 순</DropdownItem>
                            <DropdownItem onClick={() => handleSelect('latest')}>최신 순</DropdownItem>
                        </DropdownMenu>
                    </DropdownContainer>
                </SurveyOnerContainer>
                <TortalSurveyContainer>
                    {result.map((survey) => (
                        <SurveyPrev key={survey.surveyId} survey={survey} link="answer"/>
                    ))}
                    {surveys.map((survey) => (
                        <SurveyPrev key={survey.surveyId} survey={survey} link="answer"/>
                    ))}
                </TortalSurveyContainer>
            </MyPageTotalContainer>
        </MyPageContainer>
    );
};

export default MyAnsweredPage;
