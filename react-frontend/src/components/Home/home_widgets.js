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
  background: #000;
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

export default function HomeWidgets() {
    return (
    <>
        <WidgetBox>
            <WidgetImg>
                <img src={require('../../images/find_recipe.png')} id="Recipe" alt="Toast"/>
                <Button id="Button"> Find Recipes</Button>
            </WidgetImg>
            <WidgetImg>
                <img src={require('../../images/soup.png')} id="Recipe" alt="Soup"/>
                <Button id="Button"> Cook My Fridge </Button>
            </WidgetImg>
            <WidgetImg>
                <img src={require('../../images/cookie.png')} id="Recipe" alt="Cookie"/>
                <Button id="Button"> My Favorites </Button>
            </WidgetImg>

        </WidgetBox>
        {/* <iframe src="https://giphy.com/embed/3o7aCX8uO9HAxqByDK" width="480" height="480" class="giphy-embed"></iframe> */}
    </>
    );
}