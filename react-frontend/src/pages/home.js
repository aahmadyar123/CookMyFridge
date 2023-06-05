import React from 'react';
import styled from 'styled-components';
import "../css/home.css";
import HomeWidgets from '../components/Home/home_widgets';
import Cooking from "../images/cooking.jpg";

const Box = styled.section`
    background-image: url(${Cooking});
    background-size: cover;
    // background-repeat: no-repeat;
    display: block;
    width: 100%;

    margin-left: auto;
    margin-right: auto;
    height: 300px;

`;

const Home = () => {
    return (
    <>
        <Box>
            {/* <img src={require('../images/bread.png')} id="Bread" alt="bread"/> */}
        </Box>
        {/* <BottomSearchbar id="Search"/> */}
        <HomeWidgets> </HomeWidgets>
    </>
        
    );
};

export default Home;