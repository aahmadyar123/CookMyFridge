import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
//import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../../css/services.css';
import { useIngredients } from '../context/ingredients_context';
import { Markup } from 'interweave';

function RecipeReviewCard({recipe}) {
  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" sx={{ fontSize: 20}}>
            {recipe.name} 
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
      />
      <CardContent>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={7}>
            Cook Time: {recipe.readyInMinutes} min
          </Grid>
          <Grid item xs={4}>
            Servings: {recipe.servings} 
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            kcal Per Serving: {recipe.kcal} 
          </Grid>
        </Grid>
          <Typography variant="body2" >
            <Markup content={recipe.summary} />
          </Typography>
      </CardContent>
    </Card>

    // Expand this card to show the ingredients and steps
    //recipes.steps.map((step, index) => (
    //);
  );
}



export default function RecipeGrid() {
  const {value} = useIngredients();
  console.log("VALUES: ", value.recipes);
  const recipes = value.recipes; 
  const numColumns = 3;
  // React.useEffect(()=> {
  //   recipes = value.recipes;
  // }, [value.recipes]);

  const numGridRows = Math.ceil(recipes.length / 3); // Calculate the number of grid rows needed

  return (
    <Grid sx={{ flexGrow: 1, marginTop: 1 }} container spacing={4}>
      {Array.from({ length: numGridRows }, (_, rowIndex) => (
        <Grid key={rowIndex} item xs={12}>
          <Grid container justifyContent="center" spacing={7}>
            {recipes.slice(rowIndex * numColumns, (rowIndex + 1) * numColumns).map((recipe, index) => (
              <Grid key={index} item>
                <RecipeReviewCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>

  );
}

