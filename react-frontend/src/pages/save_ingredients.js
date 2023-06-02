import React from 'react'
import IngredientAdd from '../components/Services/ingredients/ingredients_input';
import styled from 'styled-components'
import IngredientTable from '../components/Services/ingredients/ingredient_table';
import { IngredientProvider } from '../components/context/ingredients_context';

const Container = styled.div`
    position: center;
    height: 100vh;
    width: 100%;
`;


export  default function saveIngredients() {
  return (
    <Container>
      <IngredientProvider>
        <IngredientAdd />
        <IngredientTable />
      </IngredientProvider>
    </Container>
  );
}