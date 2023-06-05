import * as React from 'react';
import RecipeGrid from "../components/Services/recipe_cards.js"
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

const MainContent = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  marginTop: '10px', // Push footer to bottom
  height: '100px', // Adjust the height to make the footer larger

}));

const RecipeMenu = () => {
  return (
     <PageContainer>
     <MainContent>
       <RecipeGrid />
     </MainContent>
     <Footer>
     </Footer>
   </PageContainer>
  ); 
}

export default RecipeMenu;
