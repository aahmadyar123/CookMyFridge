import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useIngredients } from '../context/ingredients_context';
import {red, grey} from '@mui/material/colors'

import { Markup } from 'interweave';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}))

function RecipeReviewCard({recipe}) {
  const {value} = useIngredients();
  const {Auth} = useAuth();
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(recipe.favorite);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleFavorite = async (recipe_id, recipe) => {
    if (recipe.favorite === false) {
      await value.favoriteRecipe(recipe_id, Auth.token);
      recipe.favorite = true;
    } else {
      console.log("UNFAVORITE");
      recipe.favorite = false;
    }

    setFavorite(recipe.favorite);
  }


  return (
    <Card sx={{ width: 345, minHeight: 440, borderRadius: '10px', boxShadow: 3 }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontSize: 20}}>
            {recipe.name} 
          </Typography>
        }
      />
      <Link
        to={{
          pathname: `/services/recipes/${recipe.id}`,
          state: recipe ,
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={recipe.image}
        />
      </Link>
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleFavorite(recipe._id, recipe)}>
          <FavoriteIcon sx={{color: favorite ? red[500] : grey[500]}}/>
        </IconButton>
        <IconButton aria-label="share"> 
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse 
        in={expanded} timeout="auto" orientation="horizontal" unmountOnExit
      >
        <CardContent>
          <Typography paragraph>Summary:</Typography>
          <Typography paragraph>
            <Markup content={recipe.summary} />
          </Typography>
          <Typography paragraph>Steps:</Typography>
          <Typography paragraph no wrap>
          <ol style={{ padding: 0, margin: 0 }}>
            {recipe.steps.map((step, index) => (
              <li key={index} >{step}</li>
            ))}
          </ol>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}



export default function RecipeGrid() {
  const {value} = useIngredients();
  const recipes = value.recipes; 
  const numColumns = 3;
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
