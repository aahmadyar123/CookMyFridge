import React, { useEffect } from 'react'
import IngredientAdd from '../components/Services/ingredients/ingredients_input';
import styled from 'styled-components'
import IngredientTable from '../components/Services/ingredients/ingredient_table';
import { useIngredients } from '../components/context/ingredients_context';
import { useAuth } from '../components/context/AuthProvider';

const Container = styled.div`
  position: center;
  height: 100vh;
  width: 100%;
`;


const SaveIngredients = () => {
  const {value} = useIngredients();
  const {Auth} = useAuth();
  
  // value.getIngredients(Auth.token);
  useEffect (() => {
    value.getIngredients(Auth.token);
  }, [Auth.token])

  return (
    <Container>
        <IngredientAdd />
        <IngredientTable />
    </Container>
  );
}

export default SaveIngredients;

