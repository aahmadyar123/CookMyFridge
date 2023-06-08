import React from 'react'
import styled from 'styled-components'

export const WidgetBox = styled.div`
    padding-top: 3em;;
    position: relative;
    display: grid;
    grid-template-area:
    "widget widget widget";

    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-evenly;
    gap: 2em;
    padding-left: 12em;
    padding-right: 12em;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const ToastImg = styled.div`
    background-image: url(${"https://i.pinimg.com/originals/b5/64/ef/b564efd57ef4a8542a4e4520f9a201cd.jpg"});
    background-size: 140%;
    background-position: 40%;
    border: 1px solid black;
    position: relative;
    display: grid;
    justify-content: center;
    width: 310px;
    height: 365px;
    margin: auto;
    border-radius: 20px;
`;

export const SoupImg = styled.div`
    background-image: url(${"https://soyummy.club/wp-content/uploads/2019/09/martha-stewart-potato-soup-lovely-9-carrot-soup-recipes-that-anybunny-will-love-of-martha-stewart-potato-soup.jpg"});
    background-size: 140%;
    background-position: 65%;
    border: 1px solid black;
    position: relative;
    display: grid;
    justify-content: center;
    width: 310px;
    height: 365px;
    margin: auto;
    border-radius: 20px;
`;

export const BrownieImg = styled.div`
    background-image: url(${"https://i.pinimg.com/originals/87/6e/19/876e19fa02ed05a1ca42045c8e3e372e.jpg"});
    background-size: 140%;
    background-position: center;
    border: 2px solid black;
    position: relative;
    display: grid;
    justify-content: center;
    width: 310px;
    height: 365px;
    margin: auto;
    border-radius: 20px;
`;

export const Button = styled.button`
    position: relative;
    z-index: 10;
    top: -210px;
    width: 150px;
    height: 60px;
    margin: auto;  
    border-radius: 20px;
    background: #353839;
    color: #fff;
    outline: none;
    border: 1px solid black;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    top: 0;
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

const BigWrapper = styled.section`
  padding: 0;
  background: white;
  width: 100%;
  height: ${props => props.height};
`;

export default function HomeWidgets() {
    return (
    <>
        <WidgetBox>
            <ToastImg>
                <StyledLink href="/services/recipes">
                    <Button id="Button"> My Favorites </Button>
                </StyledLink>
            </ToastImg>
            <SoupImg>
                <StyledLink href="/services/recipes">
                    <Button id="Button"> Find Recipes </Button>
                </StyledLink>
            </SoupImg>
            <BrownieImg>
                <StyledLink href="/ContactUs">
                    <Button id="Button"> Contact Us </Button>
                </StyledLink>
            </BrownieImg>
        </WidgetBox>

        <BigWrapper height="50px"></BigWrapper>
    </>
    );
}