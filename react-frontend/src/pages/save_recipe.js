import React from 'react';
import RecipeGrid from '../components/Services/recipe_cards.js';
import { styled } from '@mui/material/styles';
import { useIngredients } from '../components/context/ingredients_context';

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

const SaveRecipe = () => {
  const { value } = useIngredients();

  return (
    <PageContainer>
      <MainContent>
        {value.favorite_list.length > 0 ? (
          <RecipeGrid recipe={value.favorite_list} />
        ) : (
          <h1>No favorite recipes found.</h1>
        )}
      </MainContent>
      <Footer></Footer>
    </PageContainer>
  );
};

export default SaveRecipe;
