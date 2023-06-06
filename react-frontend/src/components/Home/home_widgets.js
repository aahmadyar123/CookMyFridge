import React from 'react'
import styled from 'styled-components'

export const WidgetBox = styled.div`
    padding-top: 20px;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
`;

export const WidgetImg = styled.div`
    position: relative;
    display: grid;
    justify-content: center;
    max-width: 290px;
    max-height: 365px;
`;

export const Button = styled.button`
    position: relative;
    z-index: 10;
    top: -210px;
    width: 150px;
    height: 50px;
    margin: auto;  
    border-radius: 20px;
    background: #353839;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #929292;
        color: #fff;
    }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  margin: auto;  
`;

export default function HomeWidgets() {
    return (
    <>
        <WidgetBox>
            <WidgetImg>
                <img src={require('../../images/toast.png')} id="Saved_Recipe" alt="Toast" style={{ width: '310px', height: '365px' }}/>
                <StyledLink href="/SaveRecipe">
                    <Button id="Button"> My Favorites </Button>
                </StyledLink>
            </WidgetImg>
            <WidgetImg>
                <img src={require('../../images/soup.png')} id="Saved_Recipe" alt="Soup"/>
                <StyledLink href="/SaveIngredient">
                    <Button id="Button"> Find Recipes </Button>
                </StyledLink>
            </WidgetImg>
            <WidgetImg>
                <img src={require('../../images/cookie.png')} id="Saved_Recipe" alt="Cookie"/>
                <StyledLink href="/ContactUs">
                    <Button id="Button"> Contact Us </Button>
                </StyledLink>
            </WidgetImg>
        </WidgetBox>
    </>
    );
}