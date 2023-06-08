import React from 'react';
import styled from 'styled-components';

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

const Middle = styled.div`
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
`;

const BigWrapper = styled.section`
  padding: 0;
  background: white;
  width: 100%;
  height: ${props => props.height};
`;

const Wrapper = styled.section`
  padding-top: ${props => props.paddingTop}em;
  background: #E4E3D3;
  height: 250px;
`;

const PolyImage = styled.section`
  background-image: url(${"https://thesmartlocal.com/images/easyblog_articles/6696/b2ap3_large_image18.png"});
  background-position: center;
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
  width: 700px;
  height: 300px;
  border: 2px solid black;
`;

const Profile = styled.div`
    background-image: url(${props => props.src});
    background-size: ${props => props.scale};
    background-position: center;
    border: 1px solid black;
    border-radius: 50%;
    opacity: 1;
    display: block;
    width: 225px;
    height: 225px;
    margin-left: auto;
    margin-right: auto;
`;

const Grid = styled.div`
    display: grid;
    grid-template-area: 
    "icon icon icon"
    "text text text";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1px;
    padding-left: 8em;
    padding-right: 8em;
    gap: 2em;
    padding-top: 0;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 50%;
  transition: all 0.9s ease;
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

const ContactUs= () => {
    return (
        <>
        <BigWrapper
        height = "400px">
          <Wrapper paddingTop = "5">
            <PolyImage>
            </PolyImage>
          </Wrapper>
        </BigWrapper>

            <Title fontSize = "2.5"> Contact Us</Title>
        
            <Body
            paddingLeft = "20"
            paddingRight = "20"
            paddingTop = "1"
            textAlign = "center">
            We would love to hear from you! Feel free to reach out and connect with us to stay updated on our project and join the community.
            </Body>

            <BigWrapper height="50px"></BigWrapper>

            <Grid>
                <Profile scale= "125%" src="https://www.svgrepo.com/show/436842/phone-circle-fill.svg"></Profile>
                <Profile scale="115%" src="https://www.svgrepo.com/show/353196/mail-with-circle.svg"></Profile>

                <ProfileContainer>        
                <Profile scale= "101%" src="https://www.svgrepo.com/show/512317/github-142.svg"></Profile>
                    <Middle>
                    <a href="https://github.com/luisdavidgarcia/CookMyFridge" target="-blank"><Github>Github</Github></a>
                    </Middle>
                </ProfileContainer>

                <Body            
                paddingLeft = "2"
                paddingRight = "2"
                paddingTop = "0"
                textAlign = "center">
                    Call or text us at +1-800-123-4567!
                </Body>

                <Body            
                paddingLeft = "2"
                paddingRight = "2"
                paddingTop = "0"
                textAlign = "center">
                    Reach us through our email at CMF@gmail.com!
                </Body>

                <Body            
                paddingLeft = "2"
                paddingRight = "2"
                paddingTop = "0"
                textAlign = "center">
                    Connect with us through our Github repository!
                </Body>
            </Grid>

            <BigWrapper height="100px"></BigWrapper>

            <Body
            paddingLeft = "20"
            paddingRight = "20"
            paddingTop = "1"
            textAlign = "center">
            Follow our project to be a part of the CookMyFridge community. We look forward to connecting with you and working together towards reducing food waste and creating personalized recipes for all!
            </Body>

            <BigWrapper height="50px"></BigWrapper>

        </>


    );
}

export default ContactUs;