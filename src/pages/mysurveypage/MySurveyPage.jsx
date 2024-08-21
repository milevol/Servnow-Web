import { useState } from 'react';
import SurveyPrev from '../../components/surveypage/MySurveyPrev';
import styled, { css } from 'styled-components';
import Navbar from '../../components/Navbar';
import NewSurveyButton from '../../components/surveypage/NewSurveyButton';

export const MyPageContainer = styled.div`
    height : auto;
    width : 100vw;
    margin-top : 60px;
    background-color : #F2F5FF;
    display : grid;
    contents-align : center;
`;

export const MyPageTotalContainer = styled.div`
    height : 100%;
    width : 100%;
    margin-left : 143px;
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
    height : 100vh;
    padding-top : 44px;
    align-self : center;
    justify-content: flex-start;
    align-content: flex-start;
`;

export const SurveyBox = styled.div`
    width : 552px;
    height : 272px;
`;

export const NewSurveyBox = styled.div`
    width : 552px;
    height : 272px;
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
  background-color: #fff;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 0px 0px 10px 10px;
`;

const DropdownItem = styled.div`
  color: #061522;
  padding: 12px 16px;
  font-size: 14px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
    color : #3E77FF;
  }
`;

const Arrow = styled.span`
  margin-left: 10px;
  font-size : 12px;
  transform: rotate(90deg);
  ${props => props.isOpen && css`
    transform: rotate(270deg);
  `}
  transition: transform 0.3s;
`;

const MySurveyPage = () => {

    const result = [
        {
            id: 1,
            title: '취업을 앞둔 대학생 인식 설문조사',
            description: 'Description for movie 1',
            date: '2024.06.21. 오후 19:23',
            finished: 'no'
        },
        {
            id: 2,
            title: '도서관에서의 가상현실(VR) 콘텐츠 이용자 및...',
            description: 'Description for movie 2',
            date: '2024.06.19. 오후 16:53',
            finished: 'no'
        },
        {
            id: 3,
            title: '대학생 설문 서비스 플랫폼 관련 인식조사',
            description: 'Description for movie 3',
            date: '2024.06.02. 오후 12:00',
            finished: 'yes'
        }
    ];

    const [sortOrder, setSortOrder] = useState('최신순');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (sortType) => {
        setSortOrder(sortType);
        setIsOpen(false);
    };

    return (
        <MyPageContainer>
            <Navbar />
            <MyPageTotalContainer>
                <SurveyOnerContainer>
                    MY
                    <DropdownContainer>
                        <DropdownButton onClick={toggleDropdown}>
                            {sortOrder}
                            <Arrow isOpen={isOpen}>&gt;</Arrow>
                        </DropdownButton>
                        <DropdownMenu isOpen={isOpen}>
                            <DropdownItem onClick={() => handleSelect('참여자순')}>참여자 순</DropdownItem>
                            <DropdownItem onClick={() => handleSelect('오래된순')}>오래된 순</DropdownItem>
                            <DropdownItem onClick={() => handleSelect('최신순')}>최신 순</DropdownItem>
                        </DropdownMenu>
                    </DropdownContainer>
                </SurveyOnerContainer>
                <TortalSurveyContainer>
                    {result.map((survey) => (
                        <SurveyPrev key={survey.id} survey={survey} />
                    ))}
                    <SurveyBox>
                        <NewSurveyBox>
                            <NewSurveyButton>+</NewSurveyButton>
                            <CreateNewSurvey>새로운 설문 만들기</CreateNewSurvey>
                        </NewSurveyBox>
                    </SurveyBox>
                </TortalSurveyContainer>
            </MyPageTotalContainer>
        </MyPageContainer>
    );
};

export default MySurveyPage;
