import React from 'react';
import styled from 'styled-components';
import poly from "../images/calpoly.jpg";
import college from "../images/college.jpg";
import search from "../images/search.png";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-left: 12em;
  padding-right: ${props => props.paddingRight};
  gap: 5em;
  padding-top: ${props => props.paddingTop}em;
`;

const Caption = styled.caption`
  caption-side: bottom;
  padding-left: ${props => props.paddingLeft};
  text-align: center;
  display: inline-block;
  padding-right: ${props => props.paddingRight};
  font-style: italic;
`;

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  text-align: center;
  color: black;
  padding-bottom: 0.1em;
  font-weight: bold;
`;

const Body = styled.p`
  padding-top: ${props => props.paddingTop}em;
  padding-right: ${props => props.paddingRight}em;
  padding-left: ${props => props.paddingLeft}em;
  font-size: 1.25em;
  text-align: ${props => props.textAlign};
  color: black;
  padding-bottom: 0.5em;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding-top: ${props => props.paddingTop}em;
  background: #E4E3D3;
  height: 250px;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const BigWrapper = styled.section`
  padding: 0;
  background: white;
  width: 100%;
  height: ${props => props.height};
`;

const PolyImage = styled.section`
  background-image: url(${poly});
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
  width: 700px;
  height: 300px;
  border: 2px solid black;
`;

const CookingImage = styled.section`
  background-image: url(${college});
  background-size: cover;
  margin-left: 0;
  margin-right: auto;
  width: 500px;
  height: 250px;
  border: 2px solid black;
`;

const Search = styled.section`
  background-image: url(${search});
  background-size: cover;
  margin-left: auto;
  margin-right: 0;
  width: 600px;
  height: 275px;
  border: 2px solid black;
`;

const About = () => {
  return (
    <>  
    <BigWrapper
    height = "400px">
          <Wrapper paddingTop = "5">
            <PolyImage>
            </PolyImage>
          </Wrapper>
    </BigWrapper>

      {/* <Body>
        Aaron Ahmadyar
        Killian Brait
        Luis D. Garcia
        Junseo Lee
        Wesley Luu
      </Body> */}

      <Title fontSize = "2.5"> 
      Welcome to CookMyFridge!
      </Title>

      <Body 
      textAlign = "center" 
      paddingLeft = "20"
      paddingRight = "20"
      paddingTop = "0.5"> 
      We are a passionate team of computer engineers and a computer scientist dedicated to making a positive impact on people's lives and the environment.
      </Body>

      <Grid 
      paddingTop = "1"
      paddingRight = "12em">
      <CookingImage>
      </CookingImage>   
      <Body 
        textAlign = "center" 
        paddingLeft = "0"
        paddingRight = "0"
        paddingTop = "2.5"> 
        At CookMyFridge, we understand the struggle of staring at a nearly empty fridge and wondering what to cook with the limited ingredients available. That's why we developed our automated recipe website that takes the guesswork out of meal planning. Our platform generates customized recipes based on the ingredients users already have in their fridges, allowing them to make delicious meals without the need for additional grocery shopping.
      </Body>

      </Grid>      
      <Caption
      paddingLeft = "223px"
      paddingRight = "887px">
        Our mission is to reduce food waste and provide personalized recipe solutions for all individuals.
      </Caption>

      <Grid 
      paddingTop = "1"
      paddingRight = "140px">
      <Body 
        textAlign = "center" 
        paddingLeft = "0"
        paddingRight = "0"
        paddingTop = "2.5"> 
      We believe that everyone should have access to tasty, nutritious meals that cater to their dietary needs. That's why we've integrated user dietary restrictions into our recipe generation process. Whether you're vegetarian, vegan, gluten-free, or have any specific dietary requirements, CookMyFridge considers your preferences and restrictions to provide you with recipes that align with your needs.
      </Body>
      <Search> </Search>
      </Grid>
      <Caption
      paddingLeft = "850px"
      paddingRight = "185px">
        Our recipe search engine helps anyone find recipes that suit their ingredients, dietary restrictions, and cooking skills.
      </Caption>

      <Body 
      textAlign = "center" 
      paddingLeft = "20"
      paddingRight = "20"
      paddingTop = "2"> 
      By utilizing technology and leveraging our expertise in computer engineering and computer science, we aim to empower individuals to make the most of the ingredients they already have, thereby reducing food waste and promoting sustainability. We envision a future where cooking becomes effortless and enjoyable, while also contributing to a more environmentally conscious society.
      </Body>

      <BigWrapper height = "100px"></BigWrapper>

      <Title fontSize = "2.5"> 
      Meet the team!
      </Title>


    </>
  );
};

export default About;