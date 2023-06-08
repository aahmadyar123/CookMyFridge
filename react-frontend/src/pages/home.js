import React from 'react';
import styled from 'styled-components';
import "../css/home.css";
import HomeWidgets from '../components/Home/home_widgets';
import Cooking from "../images/cooking.jpg";

const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  text-align: center;
  color: white;
  font-weight: bold;
  font-style: italic;
  padding-top: 0px;
`;

const Middle = styled.div`
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
`;

const Gradient = styled.section`
background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(${Cooking});
    background-size: cover;
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 300px;
    position: absolute;
`;

const Base = styled.section`
    background-image: url(${Cooking});
    background-size: cover;;
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 300px;
    position: relative;
    transition: 0.4s 180s;
    &:hover {
        opacity: 0;
        transition-delay: 0s;
        ${Gradient} {
          opacity: 1;
        }
      }

    &:focus {
        opacity: 1;
    }
`;

const Home = () => {
    return (
    <>
        <Gradient>        
            <Middle>
                <Title fontSize = "4">Cook My Fridge</Title>
            </Middle>
        </Gradient>
        <Base>
        </Base>
        {/* <BottomSearchbar id="Search"/> */}
        <HomeWidgets> </HomeWidgets>
    </>
        
    );
};

export default Home;