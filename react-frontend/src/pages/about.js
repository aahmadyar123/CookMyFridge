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

const Team = styled.div`
  display: grid;
  grid-template-area: 
    "image image image image image"
    "name name name name name"
    "caption caption caption caption caption";

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1px 1px;
  padding-left: 8em;
  padding-right: 8em;
  gap: 2em;
  padding-top: 0;
`;

const Middle = styled.div`
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
`;

const Profile = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  border: 1px solid black;
  border-radius: 50%;
  opacity: 1;
  display: block;
  width: 225px;
  height: 225px;
  transition: .5s ease;
  backface-visibility: hidden;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 50%;
  &:hover {
    ${Middle} {
      opacity: 1;
    }
    ${Profile} {
      opacity: 0.3;
    }
  }
`;

const Github = styled.text`
  background-color: #2b3137;
  color: #fafbfc;
  font-size: 16px;
  padding: 16px 32px;
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

      <Title fontSize = "2.5"> 
      Welcome to CookMyFridge
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

      <BigWrapper height = "50px"></BigWrapper>

      <Title fontSize = "2.5"> 
      Meet the team!
      </Title>
      <BigWrapper height = "25px"></BigWrapper>
      <Team>

        <ProfileContainer>        
        <Profile src="https://avatars.githubusercontent.com/u/87344382?v=4" alt="luisdavidgarcia"></Profile>
        <Middle>
        <a href="https://github.com/luisdavidgarcia" target="-blank"><Github>Github</Github></a>
        </Middle>
        </ProfileContainer>

        <ProfileContainer>        
        <Profile src="https://avatars.githubusercontent.com/u/73966214?v=4" alt="junseolee"></Profile>
        <Middle>
        <a href="https://github.com/junseo-lee-git" target="-blank"><Github>Github</Github></a>
        </Middle>
        </ProfileContainer>

        <ProfileContainer>        
        <Profile src="https://avatars.githubusercontent.com/u/76977316?v=4" alt="wesleyluu"></Profile>
        <Middle>
        <a href="https://github.com/Westluu" target="-blank"><Github>Github</Github></a>
        </Middle>
        </ProfileContainer>

        <ProfileContainer>        
        <Profile src="https://avatars.githubusercontent.com/u/99124944?v=4" alt="aaronahmadyar"></Profile>
        <Middle>
        <a href="https://github.com/aahmadyar123" target="-blank"><Github>Github</Github></a>
        </Middle>
        </ProfileContainer>

        <ProfileContainer>        
        <Profile src="https://avatars.githubusercontent.com/u/23425894?v=4" alt="killianbrait"></Profile>
        <Middle>
        <a href="https://github.com/killian-brait" target="-blank"><Github>Github</Github></a>
        </Middle>
        </ProfileContainer>

        <Title fontSize="1.25">Luis Garcia</Title>
        <Title fontSize="1.25">Junseo Lee</Title>
        <Title fontSize="1.25">Wesley Luu</Title>
        <Title fontSize="1.25">Aaron Ahmadyar</Title>
        <Title fontSize="1.25">Killian Brait</Title>

        <Caption>Front-End Developer</Caption>
        <Caption>Front-End Developer</Caption>
        <Caption>Full Stack Developer</Caption>
        <Caption>Back-End Developer</Caption>
        <Caption>Back-End Developer</Caption>

      </Team>

      <BigWrapper height="100px"></BigWrapper>

    </>
  );
};

export default About;