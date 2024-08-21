import styled, { css } from 'styled-components';

const Arrow = styled.button`
  padding : 0px;
  margin-right: 0px;
  margin-top: 5px;
  width: 12px;
  height: 20px;
  background-color: #f8f9fa;
  background-image: url('../../src/assets/arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  transform: rotate(270deg);
  cursor: pointer;

  ${props => props.isOpen && css`
    transform-origin: 6px 10px;
    transform: rotate(90deg);
    margin-right: 5px;
    margin-top : 0px;
    margin-bottom : 5px;
  `}
  
  transition: transform 0.3s;
`;

export default Arrow;
