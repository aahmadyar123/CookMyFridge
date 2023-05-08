import React from 'react';
import styled from 'styled-components';
import "../css/home.css";
import BottomSearchbar from '../components/bottomSearch';

const Box = styled.div`
    display: block;
    position: center;
    height: 10%;
    width: 100%;
`;

const Home = () => {
    return (
    <>
        <Box>
            <img src={require('../images/bread.png')} id="Bread" alt="bread"/>
        </Box>
        <BottomSearchbar id="Search"/>
    </>
        
    );
};

export default Home;