import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../../css/services.css';

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
            Shrimp and Chorizo Paella
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fgrecipes%2Fpublic%2Fpictures%2Frecipes%2F1035809%2Fpaella_big.jpg&f=1&nofb=1&ipt=f3a82793c8588fcc7157574e26b359d02fe3703cf79a4349d63e193d4988e6ae&ipo=images"
        alt="Paella dish"
      />
      <CardContent>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={7}>
            Cook Time: 30 min
          </Grid>
          <Grid item xs={4}>
            Servings: 4 
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            kcal Per Serving: 500
          </Grid>
        </Grid>
          <Typography variant="body2" >
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
      </CardContent>
    </Card>
  );
}



export default function RecipeGrid() {

  const recipes = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Dummy data for now

    const numGridRows = Math.ceil(recipes.length / 3); // Calculate the number of grid rows needed

    return (
      <Grid sx={{ flexGrow: 1, marginTop: 1 }} container spacing={4}>
        {Array.from({ length: numGridRows }, (_, rowIndex) => (
          <Grid key={rowIndex} item xs={12}>
            <Grid container justifyContent="center" spacing={7}>
              {recipes.slice(rowIndex * 3, (rowIndex + 1) * 3).map((recipe, index) => (
                <Grid key={index} item>
                  <RecipeReviewCard recipe={recipe} title={recipe.title} image={recipe.image} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>

  );
}

