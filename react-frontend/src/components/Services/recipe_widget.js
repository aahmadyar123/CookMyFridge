import React from 'react';
import styled from 'styled-components';
import ReactStars from 'react-stars'
import Rating from "@mui/material/Rating";

export const WidgetBox = styled.div`
    padding-top: 20px;
    position: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: auto;
    width: 75%;
    height: 100%;
`;


export const WidgetContainer = styled.div`
    width: 308.56px;
    height: 331.84px;
    margin-top: 40px;
    margin-bottom: 5px;
    text-align: center;
`;

export const BlackBox = styled.div`
    width: 308.56px;
    height: 288.45px;
    border-radius: 15.09px;
    display: column;
    justify-content: center;
    align-items: center;
    background-color: #121212;
    color: #FFFFFF;
`;

export const TextBox = styled.div`
    border-radius: 15.09px;
    display: column;
    color: #FFFFF;
`;



export default function RecipeWidgets() {
    return (
    <>
        <WidgetBox>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">
                <WidgetContainer>
                    <BlackBox>
                        <img src={require('../../images/sample.png')} id="Sample" alt="sample"/>
                        <TextBox id="Text">Spicy Seafood Noodles</TextBox>
                        <Rating name="read-only" value={5} size="large" sx={{fontSize: "3rem"}} readOnly />
                    </BlackBox>
                </WidgetContainer>
            </a>
            
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">
                <WidgetContainer>
                    <BlackBox>
                        <img src={require('../../images/sample.png')} id="Sample" alt="sample"/>
                        <TextBox id="Text">Spicy Seafood Noodles</TextBox>
                        <Rating name="read-only" value={5} size="large" sx={{fontSize: "3rem"}} readOnly />
                    </BlackBox>
                </WidgetContainer>
            </a>

            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">
                <WidgetContainer>
                    <BlackBox>
                        <img src={require('../../images/sample.png')} id="Sample" alt="sample"/>
                        <TextBox id="Text">Spicy Seafood Noodles</TextBox>
                        <Rating name="read-only" value={5} size="large" sx={{fontSize: "3rem"}} readOnly />
                    </BlackBox>
                </WidgetContainer>
            </a>

            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">
                <WidgetContainer>
                    <BlackBox>
                        <img src={require('../../images/sample.png')} id="Sample" alt="sample"/>
                        <TextBox id="Text">Spicy Seafood Noodles</TextBox>
                        <Rating name="read-only" value={5} size="large" sx={{fontSize: "3rem"}} readOnly />
                    </BlackBox>
                </WidgetContainer>
            </a>

            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">
                <WidgetContainer>
                    <BlackBox>
                        <img src={require('../../images/sample.png')} id="Sample" alt="sample"/>
                        <TextBox id="Text">Spicy Seafood Noodles</TextBox>
                        <Rating name="read-only" value={5} size="large" sx={{fontSize: "3rem"}} readOnly />
                    </BlackBox>
                </WidgetContainer>
            </a>

            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">
                <WidgetContainer>
                    <BlackBox>
                        <img src={require('../../images/sample.png')} id="Sample" alt="sample"/>
                        <TextBox id="Text">Spicy Seafood Noodles</TextBox>
                        <Rating name="read-only" value={5} size="large" sx={{fontSize: "3rem"}} readOnly />
                    </BlackBox>
                </WidgetContainer>
            </a>
        </WidgetBox>
    </>
    );
}


