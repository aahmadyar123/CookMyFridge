import React from 'react';
import styled from 'styled-components';

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
    max-width: 308.56px;
    max-height: 331.84px;
    padding: 30px;
`;

export const BlackBox = styled.div`
    width: 308.56px;
    height: 288.45px;
    border-radius: 15.09px;
    background-color: #121212;
`;

export default function RecipeWidgets() {
    return (
    <>
        <WidgetBox>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
            <WidgetContainer>
                <BlackBox />
            </WidgetContainer>
        </WidgetBox>
    </>
    );
}


